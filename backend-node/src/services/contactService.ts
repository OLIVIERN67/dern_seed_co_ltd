import { z } from "zod";
import { db } from "../db";
import { sendEmail } from "./emailService";
import { requireEnv } from "../config/env";

const SubmitContactSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(3).max(30).optional().nullable(),
  subject: z.string().min(2).max(200).optional().nullable(),
  message: z.string().min(5).max(5000),
  language: z.string().optional().nullable(),
});

export type SubmitContactInput = z.infer<typeof SubmitContactSchema>;

export async function submitContact(input: unknown) {
  const parsed = SubmitContactSchema.parse(input);

  const companyInbox = requireEnv("COMPANY_INBOX_EMAIL");

  const rowId = await db.contactMessages.create({
    full_name: parsed.fullName,
    email: parsed.email,
    phone: parsed.phone ?? null,
    subject: parsed.subject ?? null,
    message: parsed.message,
    language: parsed.language ?? null,
  });

  const subject = parsed.subject ?? "New Contact Message";
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h3 style="margin:0 0 10px 0;">${subject}</h3>
      <p><b>From:</b> ${parsed.fullName} (${parsed.email})</p>
      ${parsed.phone ? `<p><b>Phone:</b> ${parsed.phone}</p>` : ""}
      <p><b>Message:</b></p>
      <pre style="white-space: pre-wrap;">${parsed.message}</pre>
    </div>
  `;

  await sendEmail({
    to: companyInbox,
    subject: `DERN SEED Contact: ${subject}`,
    html,
  });

  return { ok: true, id: rowId };
}

