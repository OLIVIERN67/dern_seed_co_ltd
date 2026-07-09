import type { Request, Response } from "express";
import { submitContact } from "../services/contactService.js";


export class ContactController {
  static async submit(req: Request, res: Response) {
    try {
      const { ok, id } = await submitContact({
        ...req.body,
        // allow language to be passed from client (optional)
        language: req.body?.language ?? null,
      });
      res.status(201).json({ ok, id });
    } catch (e: any) {
      res.status(e?.status ?? 400).json({ error: e?.message ?? "Failed to submit contact" });
    }
  }
}

