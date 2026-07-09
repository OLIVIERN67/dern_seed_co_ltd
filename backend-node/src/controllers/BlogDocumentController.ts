import type { Request, Response } from "express";
import { z } from "zod";
import path from "path";
import fs from "fs";

import { requireEnv } from "../config/env.js";

import { db } from "../db/index.js";


export class BlogDocumentController {
  static async list(req: Request, res: Response) {
    try {
      const type = (req.query.type as any) ?? "all";
      // dummy cast for TS compatibility (repo methods are intentionally loosely typed)

      const allowed = new Set(["all", "seasonal", "buying", "publication"]);
      const normalized = allowed.has(type) ? type : "all";

      const docs = await (db.blogDocuments as any).listByType(normalized as any);
      res.json({ ok: true, documents: docs });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to list documents" });
    }
  }

  static async download(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid document id" });

      const doc = await db.blogDocuments.findById(id);
      if (!doc) return res.status(404).json({ error: "Not found" });

      const publicDir = (requireEnv as any)("BLOG_DOCUMENTS_DIR", "uploads/blog-docs");
      const filePath = path.join(publicDir, doc.stored_filename);

      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File missing" });

      res.setHeader("Content-Type", doc.mime_type || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${doc.original_filename}"`);

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to download" });
    }
  }

  /**
   * Admin upload without multer:
   * - Expects JSON body with:
   *   { type, original_filename, stored_filename, mime_type, size_bytes }
   * - Frontend should upload via a separate mechanism OR for now we provide
   *   a lightweight endpoint to register files already stored.
   *
   * Since this repo doesn’t have an admin UI yet, the endpoint is intentionally
   * conservative. If you add an admin uploader later, we can swap to multer.
   */
  static async upload(req: Request, res: Response) {
    try {
      const Schema = z.object({
        type: z.enum(["seasonal", "buying", "publication"]),
        original_filename: z.string().min(1).max(255),
        stored_filename: z.string().min(1).max(255),
        mime_type: z.string().min(1).max(200),
        size_bytes: z.number().int().min(0),
      });

      const body = Schema.parse(req.body ?? {});

      const publicDir = (requireEnv as any)("BLOG_DOCUMENTS_DIR", "uploads/blog-docs");
      const filePath = path.join(publicDir, body.stored_filename);
      if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: "Stored file not found on server" });
      }

      const id = await (db.blogDocuments as any).create({
        type: body.type,
        original_filename: body.original_filename,
        stored_filename: body.stored_filename,
        mime_type: body.mime_type,
        size_bytes: body.size_bytes,
      });

      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      res.status(400).json({ error: e?.message ?? "Failed to upload document" });
    }
  }
}

