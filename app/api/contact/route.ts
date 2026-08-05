import { NextResponse } from "next/server";
import type { SendMailOptions } from "nodemailer";
import { getMailer, getSmtpCredentials } from "@/lib/mailer";
import { buildContactEmailHtml, buildContactEmailText } from "@/lib/email-template";
import type { EmailContent } from "@/lib/email-template";

/** Nodemailer needs the Node.js runtime — never deploy this route to Edge. */
export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
  projectType?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 120;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

/** Server-side validation — returns a map of field → error message. */
function validate(payload: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > MAX_NAME) {
    errors.name = `Name must be ${MAX_NAME} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "A valid email address is required.";
  }

  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length > MAX_SUBJECT) {
    errors.subject = `Subject must be ${MAX_SUBJECT} characters or fewer.`;
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < MIN_MESSAGE) {
    errors.message = `Message must be at least ${MIN_MESSAGE} characters.`;
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Message must be ${MAX_MESSAGE} characters or fewer.`;
  }

  return errors;
}

/**
 * POST /api/contact
 *
 * Securely relays a contact-form submission to the SMTP server via Nodemailer.
 * SMTP credentials are read strictly from server-side environment variables in
 * lib/mailer.ts — they never reach the client or the edge.
 *
 * Responses:
 *  - 200 { success: true, message }       delivered
 *  - 400 { success: false, message, fields? }  malformed or invalid request
 *  - 500 { success: false, message }      delivery failure (raw error logged server-side)
 */
export async function POST(request: Request): Promise<NextResponse> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Content-Type must be application/json." },
      { status: 400 },
    );
  }

  // Parse the JSON body safely — a malformed payload is a client error, not a crash.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  // JSON can be any value (null, arrays, strings) — only objects are valid here.
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return NextResponse.json(
      { success: false, message: "Request body must be a JSON object." },
      { status: 400 },
    );
  }
  const payload = raw as ContactPayload;

  const fieldErrors = validate(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Validation failed.", fields: fieldErrors },
      { status: 400 },
    );
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim().toLowerCase();
  const subject = (payload.subject ?? "").trim();
  const message = (payload.message ?? "").trim();
  const phone = payload.phone?.trim() || null;
  const projectType = payload.projectType?.trim() || null;

  try {
    const { from, receiverEmail } = getSmtpCredentials();
    const mailer = getMailer();

    const content: EmailContent = { name, email, phone, projectType, subject, message };
    const mail: SendMailOptions = {
      from,
      to: receiverEmail,
      replyTo: email,
      subject: `New inquiry — ${subject} (${name})`.slice(0, 200),
      text: buildContactEmailText(content),
      html: buildContactEmailHtml(content),
    };

    await mailer.sendMail(mail);

    console.info(`[api/contact] Email delivered to ${receiverEmail} from ${email}`);
    return NextResponse.json(
      { success: true, message: "Inquiry received — we'll get back to you within one business day." },
      { status: 200 },
    );
  } catch (error) {
    // Log the raw error server-side; never echo internals back to the client.
    console.error("[api/contact] Email delivery failed:", error);
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
