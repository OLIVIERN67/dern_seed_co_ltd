import { z } from "zod";
import { db } from "../db";
import { sendEmail } from "./emailService";
import { requireEnv } from "../config/env";

const SubmitInquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(3).max(30).optional().nullable(),
  productName: z.string().min(2).max(200),
  quantity: z.number().int().min(1).max(1_000_000).optional().nullable(),
  message: z.string().min(5).max(5000).optional().nullable(),
  language: z.string().optional().nullable(),
});

export type SubmitProductInquiryInput = z.infer<typeof SubmitInquirySchema>;

export async function submitProductInquiry(input: unknown) {
  const parsed = SubmitInquirySchema.parse(input);

  const companyInbox = requireEnv("COMPANY_INBOX_EMAIL");

  const id = await db.productInquiries.create({
    full_name: parsed.fullName,
    email: parsed.email,
    phone: parsed.phone ?? null,
    product_name: parsed.productName,
    quantity: parsed.quantity ?? null,
    message: parsed.message ?? null,
    language: parsed.language ?? null,
  });

  // 1) Notify company
  const notifyHtml = `
    <div style="font-family: Arial, sans-serif;">
      <h3 style="margin:0 0 10px 0;">New Product Inquiry</h3>
      <p><b>Customer:</b> ${parsed.fullName} (${parsed.email})</p>
      ${parsed.phone ? `<p><b>Phone:</b> ${parsed.phone}</p>` : ""}
      <p><b>Product:</b> ${parsed.productName}</p>
      ${parsed.quantity ? `<p><b>Quantity:</b> ${parsed.quantity}</p>` : ""}
      ${parsed.message ? `<p><b>Message:</b></p><pre style="white-space: pre-wrap;">${parsed.message}</pre>` : ""}
    </div>
  `;

  await sendEmail({
    to: companyInbox,
    subject: `DERN SEED Product Inquiry: ${parsed.productName}`,
    html: notifyHtml,
  });

  // 2) Confirmation email to customer
  const confirmHtml = `
    <div style="font-family: Arial, sans-serif;">
      <p>Dear <b>${parsed.fullName}</b>,</p>
      <p>Thank you for contacting <b>DERN SEED Company Ltd</b>. We have received your request for:</p>
      <p><b>${parsed.productName}</b></p>
      ${parsed.quantity ? `<p>Quantity: <b>${parsed.quantity}</b></p>` : ""}
      <p>Our team will get back to you shortly.</p>
      <p>Best regards,<br/>DERN SEED Team</p>
    </div>
  `;

  await sendEmail({
    to: parsed.email,
    subject: `Confirmation: We received your product inquiry (${parsed.productName})`,
    html: confirmHtml,
  });

  return { ok: true, id };
}

