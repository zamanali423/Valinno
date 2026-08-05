/**
 * Velinno — shared premium email templates (server-only).
 *
 * Used by BOTH the contact Server Action (app/actions/sendContactEmail.ts) and
 * the API route handler (app/api/contact/route.ts) so the delivery markup
 * never drifts between the two delivery paths.
 *
 * Layout is table-based with all styling inline for maximum email-client
 * compatibility (Outlook, Gmail, Apple Mail), and every user-supplied value is
 * HTML-escaped before it enters the markup (injection-safe).
 */

export interface EmailContent {
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  subject: string;
  message: string;
}

/** Velinno dark design-system palette, mapped to inline email colours. */
const EMAIL_PALETTE = {
  bg: "#05070e", // --background
  card: "#0a101e",
  panel: "#0d1526",
  border: "#1c2740",
  text: "#e7ecf5", // --foreground
  muted: "#9aa7bd",
  dim: "#6b7a95",
  accent: "#4f7cff", // electric
} as const;

/** HTML-escape user content before it enters the template (injection-safe). */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape + preserve line breaks in the message body. */
function toSafeHtml(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

export function buildContactEmailHtml(content: EmailContent): string {
  const { name, email, phone, projectType, subject, message } = content;

  /** Two-row table: uppercase label + value card. */
  const field = (label: string, value: string) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      <tr>
        <td style="font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${EMAIL_PALETTE.muted};padding-bottom:7px;">${escapeHtml(label)}</td>
      </tr>
      <tr>
        <td style="background-color:${EMAIL_PALETTE.panel};border:1px solid ${EMAIL_PALETTE.border};border-radius:10px;padding:12px 15px;color:${EMAIL_PALETTE.text};font-size:14px;line-height:1.65;word-break:break-word;">${value}</td>
      </tr>
    </table>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>New inquiry — ${escapeHtml(name)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${EMAIL_PALETTE.bg};">
    <!-- Full-width dark canvas -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${EMAIL_PALETTE.bg};">
      <tr>
        <td align="center" style="padding:36px 16px;">

          <!-- Card -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${EMAIL_PALETTE.card};border:1px solid ${EMAIL_PALETTE.border};border-radius:16px;">

            <!-- Header -->
            <tr>
              <td style="padding:26px 30px;border-bottom:1px solid ${EMAIL_PALETTE.border};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:19px;font-weight:700;letter-spacing:0.5px;color:#ffffff;">VELINNO</td>
                    <td align="right" style="font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:${EMAIL_PALETTE.accent};border:1px solid rgba(79,124,255,0.45);border-radius:999px;padding:7px 13px;white-space:nowrap;">New Inquiry</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-size:12px;color:${EMAIL_PALETTE.muted};padding-top:4px;">Full-Stack Software Solutions</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Accent -->
            <tr>
              <td style="height:3px;font-size:0;line-height:0;background:linear-gradient(90deg,${EMAIL_PALETTE.accent},#8b5cf6,#c05bff);">&nbsp;</td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <div style="font-size:20px;line-height:1.4;font-weight:600;color:${EMAIL_PALETTE.text};margin-bottom:6px;">New project inquiry from ${escapeHtml(name)}</div>
                <div style="font-size:13px;color:${EMAIL_PALETTE.muted};margin-bottom:28px;">${escapeHtml(subject)}</div>

                ${field("Name", escapeHtml(name))}
                ${field("Email", `<a href="mailto:${escapeHtml(email)}" style="color:${EMAIL_PALETTE.accent};text-decoration:none;">${escapeHtml(email)}</a>`)}
                ${phone ? field("Phone", escapeHtml(phone)) : ""}
                ${projectType ? field("Project Type", escapeHtml(projectType)) : ""}
                ${field("Message", toSafeHtml(message))}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 30px;border-top:1px solid ${EMAIL_PALETTE.border};">
                <div style="font-size:12px;line-height:1.8;color:${EMAIL_PALETTE.dim};">
                  This inquiry was submitted through the velinno.com contact form.<br />
                  Reply directly to this email to reach ${escapeHtml(name)}.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildContactEmailText(content: EmailContent): string {
  const { name, email, phone, projectType, subject, message } = content;

  return [
    "NEW CONTACT FORM SUBMISSION",
    "---------------------------",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    projectType ? `Project type: ${projectType}` : "",
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    "---------------------------",
    "Submitted via velinno.com contact form.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
