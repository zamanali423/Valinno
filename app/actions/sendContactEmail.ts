"use server";

/**
 * Velinno — contact form Server Action.
 *
 * Validates the payload, compiles a premium dark-themed HTML email and hands it
 * to the Nodemailer transport. Never throws: every failure path returns an
 * explicit, serializable result object so the client can render the right UI.
 *
 * Email markup lives in lib/email-template.ts (shared with app/api/contact/route.ts).
 */

import type { SendMailOptions } from "nodemailer";
import { getMailer, getSmtpCredentials } from "@/lib/mailer";
import { buildContactEmailHtml, buildContactEmailText } from "@/lib/email-template";
import type { EmailContent } from "@/lib/email-template";

export interface ContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  projectType?: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormInput, string>>;

export type ContactFormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 120;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;

function validateInput(input: ContactFormInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > MAX_NAME) {
    errors.name = `Name must be ${MAX_NAME} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email address doesn't look valid.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < MIN_MESSAGE) {
    errors.message = `Please tell us a little more (at least ${MIN_MESSAGE} characters).`;
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;
  }

  if (phone && phone.length > 40) {
    errors.phone = "Phone number is too long.";
  }

  return errors;
}

export async function sendContactEmail(input: ContactFormInput): Promise<ContactFormResult> {
  const fieldErrors = validateInput(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const subject = (input.subject?.trim() || "Website Contact").slice(0, MAX_SUBJECT);
  const message = input.message.trim();
  const phone = input.phone?.trim() || null;
  const projectType = input.projectType?.trim() || null;

  const content: EmailContent = { name, email, phone, projectType, subject, message };

  try {
    const { from, receiverEmail } = getSmtpCredentials();
    const mailer = getMailer();

    const mail: SendMailOptions = {
      from,
      to: receiverEmail,
      replyTo: email,
      subject: `New inquiry — ${subject} (${name})`.slice(0, 200),
      text: buildContactEmailText(content),
      html: buildContactEmailHtml(content),
    };

    await mailer.sendMail(mail);

    console.info(`[contact] Email delivered to ${receiverEmail} from ${email}`);
    return {
      ok: true,
      message: `Thanks ${name.split(" ")[0]} — your message is on its way. We'll get back to you within one business day.`,
    };
  } catch (error) {
    // Never let a delivery failure crash the request — log it server-side and
    // return a safe, generic message to the client.
    console.error("[contact] Email delivery failed:", error);
    return {
      ok: false,
      message:
        "We couldn't send your message right now. Please try again in a few minutes, or call us directly.",
    };
  }
}
