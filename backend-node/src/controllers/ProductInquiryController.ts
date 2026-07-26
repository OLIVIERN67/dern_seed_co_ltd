import type { Request, Response } from "express";
import { submitProductInquiry } from "../services/productInquiryService";
import { db } from "../db/index.js";

export class ProductInquiryController {
  static async submit(req: Request, res: Response) {
    try {
      const result = await submitProductInquiry(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(e?.status ?? 400).json({ error: e?.message ?? "Failed to submit inquiry" });
    }
  }

  static async list(_req: Request, res: Response) {
    try {
      const inquiries = await db.productInquiries.findAll();
      res.json({ inquiries });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch inquiries" });
    }
  }

  static async markRead(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await db.productInquiries.markRead(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to update inquiry" });
    }
  }
}

