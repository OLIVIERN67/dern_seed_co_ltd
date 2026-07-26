import type { Request, Response } from "express";
import { submitContact } from "../services/contactService.js";
import { db } from "../db/index.js";


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

  static async list(_req: Request, res: Response) {
    try {
      const messages = await db.contactMessages.findAll();
      res.json({ messages });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch messages" });
    }
  }

  static async markRead(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await db.contactMessages.markRead(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to update message" });
    }
  }
}

