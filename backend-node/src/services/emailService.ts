import nodemailer from "nodemailer";
import { requireEnv } from "../config/env";

export type SendEmailArgs = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

function createTransport() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // common convention
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, html, text }: SendEmailArgs) {
  const from = requireEnv("SMTP_FROM_EMAIL");
  const transporter = createTransport();

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
}

