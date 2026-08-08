import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-form-schema";
import { getSmtpCredentials, getMailer } from "@/lib/mailer";
import { saveContactSubmission } from "@/lib/supabase";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  buildAutoReplyHtml,
  buildAutoReplyText,
} from "@/lib/email-template";
import { siteConfig } from "@/lib/site";

/** Resend API + Nodemailer both need the Node.js runtime  never deploy to Edge. */
export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/* In-memory rate limiting (per process)                              */
/* ------------------------------------------------------------------ */
// Simple in-memory limiter: max MAX_REQUESTS per IP per WINDOW_MS. Suitable
// for a single Node server (the README's recommended deploy). For multi-instance
// serverless deployments, swap this for an edge-friendly store (e.g. Upstash).
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  return realIp ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS) return true;

  rateBuckets.set(ip, bucket);
  return false;
}

/* ------------------------------------------------------------------ */
/* Email delivery  Resend when configured, Nodemailer/SMTP fallback  */
/* ------------------------------------------------------------------ */

interface MailPayload {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}

/** From address: prefer RESEND_FROM, else the SMTP "from" built in lib/mailer. */
async function getFromAddress(): Promise<string> {
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) return process.env.RESEND_FROM;
  const { from } = getSmtpCredentials();
  return from;
}

/** Send one email via Resend when RESEND_API_KEY is set, else SMTP. */
async function sendEmail(payload: MailPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: await getFromAddress(),
        to: [payload.to],
        reply_to: payload.replyTo ? [payload.replyTo] : undefined,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend returned ${res.status}: ${body}`);
    }
    return;
  }

  // Nodemailer fallback
  const { from } = getSmtpCredentials();
  await getMailer().sendMail({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
}

/* ------------------------------------------------------------------ */
/* POST /api/contact                                                  */
/* ------------------------------------------------------------------ */

/**
 * Accepts a validated contact-form submission, stores it in Supabase,
 * emails the Velinno team, and sends an auto-reply to the submitter.
 *
 * Responses:
 *  - 200 { success: true, message }         accepted (or honeypot fake-success)
 *  - 400 { success: false, message, fields? }  validation / malformed JSON
 *  - 429 { success: false, message }        rate limited
 *  - 500 { success: false, message }        storage or delivery failure
 */
export async function POST(request: Request): Promise<NextResponse> {
  // --- Content-type guard -------------------------------------------------
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Content-Type must be application/json." },
      { status: 400 },
    );
  }

  // --- Safe JSON parse ----------------------------------------------------
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return NextResponse.json(
      { success: false, message: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  // --- Honeypot: silently reject bots (fake success, no email, no storage) --
  // Checked BEFORE validation so bots never learn the honeypot exists.
  const honey = (raw as Record<string, unknown>).website;
  if (typeof honey === "string" && honey.trim().length > 0) {
    return NextResponse.json(
      { success: true, message: "Inquiry received  we'll get back to you within one business day." },
      { status: 200 },
    );
  }

  // --- Server-side re-validation (never trust the client) ------------------
  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json(
      { success: false, message: "Validation failed.", fields },
      { status: 400 },
    );
  }
  const values = parsed.data;

  // --- Rate limiting (after validation so bots hammering invalid JSON are cheap)
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many submissions  please try again in a few minutes." },
      { status: 429 },
    );
  }

  // --- Storage + delivery ---------------------------------------------------
  const subject = `New inquiry  ${values.projectType} (${values.fullName})`;

  try {
    // 1. Persist to Supabase first so leads are never lost to email failures.
    const stored = await saveContactSubmission(values);
    if (!stored.ok) {
      console.warn(`[api/contact] Storage failed (continuing): ${stored.error}`);
    }

    // 2. Notification email to the team.
    const toTeam: MailPayload = {
      to: process.env.CONTACT_RECEIVER_EMAIL ?? siteConfig.email,
      replyTo: values.email,
      subject: subject.slice(0, 200),
      text: buildContactEmailText({
        name: values.fullName,
        email: values.email,
        phone: values.phone?.trim() || null,
        companyName: values.companyName?.trim() || null,
        projectType: values.projectType,
        budgetRange: values.budgetRange?.trim() || null,
        timeline: values.timeline?.trim() || null,
        subject,
        message: values.message,
      }),
      html: buildContactEmailHtml({
        name: values.fullName,
        email: values.email,
        phone: values.phone?.trim() || null,
        companyName: values.companyName?.trim() || null,
        projectType: values.projectType,
        budgetRange: values.budgetRange?.trim() || null,
        timeline: values.timeline?.trim() || null,
        subject,
        message: values.message,
      }),
    };

    // 3. Auto-reply to the submitter.
    const toSubmitter: MailPayload = {
      to: values.email,
      subject: "Thanks for reaching out to Velinno",
      text: buildAutoReplyText({ name: values.fullName, projectType: values.projectType }),
      html: buildAutoReplyHtml({ name: values.fullName, projectType: values.projectType }),
    };

    // Send both  if the notification fails but the auto-reply succeeds, the
    // submitter still got their confirmation; log and continue gracefully.
    let deliveryError: unknown = null;
    try {
      await sendEmail(toTeam);
    } catch (error) {
      deliveryError = error;
      console.error("[api/contact] Team notification email failed:", error);
    }
    try {
      await sendEmail(toSubmitter);
    } catch (error) {
      deliveryError = error;
      console.error("[api/contact] Auto-reply email failed:", error);
    }

    if (deliveryError && !stored.ok) {
      throw new Error("Both storage and email delivery failed.");
    }

    console.info(
      `[api/contact] Submission accepted from ${values.email} (stored=${stored.ok})`,
    );
    return NextResponse.json(
      { success: true, message: "Message sent  we'll get back to you within 24 hours." },
      { status: 200 },
    );
  } catch (error) {
    // Log the raw error server-side; never echo internals back to the client.
    console.error("[api/contact] Submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't send your message right now. Please try again in a few minutes, or call us directly.",
      },
      { status: 500 },
    );
  }
}
