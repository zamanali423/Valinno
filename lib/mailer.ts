/**
 * Velinno — type-safe Nodemailer transport factory (server-only).
 *
 * Reads SMTP credentials exclusively from server-side environment variables
 * and instantiates the nodemailer transport lazily, so the app never crashes
 * at boot when variables are missing — the error only surfaces when an email
 * is actually attempted (and is caught by the caller).
 *
 * ⚠️ This module touches `process.env` and `nodemailer` (Node APIs). Never
 * import it from a Client Component or a route with `runtime = "edge"`.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { siteConfig } from "@/lib/site";

type RequiredEnvKey =
  | "SMTP_HOST"
  | "SMTP_PORT"
  | "SMTP_USER"
  | "SMTP_PASS"
  | "CONTACT_RECEIVER_EMAIL";

/** Read a required server-side env var, throwing a descriptive error when missing. */
function requireEnv(key: RequiredEnvKey): string {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(
      `[mailer] Missing required environment variable "${key}". ` +
        "Add it to .env.local before enabling email delivery.",
    );
  }
  return value.trim();
}

export interface SmtpCredentials {
  host: string;
  port: number;
  user: string;
  pass: string;
  /** Friendly `From` address shown in recipients' inboxes. */
  from: string;
  /** Inbox that receives contact-form submissions. */
  receiverEmail: string;
}

/** Collect and validate SMTP credentials from the environment. Throws on invalid input. */
export function getSmtpCredentials(): SmtpCredentials {
  const portRaw = requireEnv("SMTP_PORT");
  const port = Number(portRaw);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `[mailer] Invalid SMTP_PORT "${portRaw}" — expected an integer between 1 and 65535.`,
    );
  }

  const user = requireEnv("SMTP_USER");

  return {
    host: requireEnv("SMTP_HOST"),
    port,
    user,
    pass: requireEnv("SMTP_PASS"),
    from: `${siteConfig.name} <${user}>`,
    receiverEmail: requireEnv("CONTACT_RECEIVER_EMAIL"),
  };
}

let cachedTransport: Transporter | null = null;

/**
 * Lazily create (and memoize) the nodemailer transport.
 *
 * `secure: true` is set for port 465 (implicit TLS). Ports 587/2525 negotiate
 * STARTTLS automatically, which is the recommended setup for most providers.
 */
export function getMailer(): Transporter {
  if (cachedTransport) return cachedTransport;

  const { host, port, user, pass } = getSmtpCredentials();

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cachedTransport;
}
