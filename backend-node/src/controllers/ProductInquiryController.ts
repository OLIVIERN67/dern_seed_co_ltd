import type { Request, Response } from "express";
import { submitProductInquiry } from "../services/productInquiryService";

export class ProductInquiryController {
  static async submit(req: Request, res: Response) {
    try {
      const result = await submitProductInquiry(req.body);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(e?.status ?? 400).json({ error: e?.message ?? "Failed to submit inquiry" });
    }
  }
}

