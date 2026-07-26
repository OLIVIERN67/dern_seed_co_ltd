import nodemailer from "nodemailer";
import { getEnv } from "../config/env";

export type SendEmailArgs = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

/** True when all SMTP settings needed to send email are present. */
export function isEmailConfigured(): boolean {
  return Boolean(
    getEnv("SMTP_HOST") && getEnv("SMTP_PORT") && getEnv("SMTP_USER") && getEnv("SMTP_PASS") && getEnv("SMTP_FROM_EMAIL")
  );
}

function createTransport() {
  const host = getEnv("SMTP_HOST")!;
  const port = Number(getEnv("SMTP_PORT"));
  const user = getEnv("SMTP_USER")!;
  const pass = getEnv("SMTP_PASS")!;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // common convention
    auth: { user, pass },
  });
}

/**
 * Sends an email if SMTP is configured; otherwise this is a safe no-op.
 * Never throws — callers should treat email as best-effort and must not
 * lose already-persisted data (e.g. a contact message) just because the
 * mail server is unreachable or misconfigured.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailArgs): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn(`Email not sent (SMTP not configured): "${subject}" -> ${to}`);
    return false;
  }

  try {
    const from = getEnv("SMTP_FROM_EMAIL")!;
    const transporter = createTransport();
    await transporter.sendMail({ from, to, subject, html, text });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
