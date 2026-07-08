import type { Request, Response } from "express";
import { z } from "zod";
import { TestimonialService } from "../services/TestimonialService";

const CreateTestimonialSchema = z.object({
  name: z.string().min(2).max(120),
  role: z.string().max(120).optional().nullable(),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(5).max(1000),
  initials: z.string().max(4).optional().nullable(),
});

const UpdateTestimonialSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  role: z.string().max(120).optional().nullable(),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(5).max(1000).optional(),
  initials: z.string().max(4).optional().nullable(),
  is_approved: z.number().int().min(0).max(1).optional(),
});

export class TestimonialController {
  static async list(_req: Request, res: Response) {
    try {
      const testimonials = await TestimonialService.list();
      res.json({ ok: true, testimonials });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to list testimonials" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateTestimonialSchema.parse(req.body ?? {});
      const id = await TestimonialService.create(
        parsed.name,
        parsed.role ?? null,
        parsed.rating,
        parsed.message,
        parsed.initials ?? null
      );
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create testimonial" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid testimonial id" });
        return;
      }
      const parsed = UpdateTestimonialSchema.parse(req.body ?? {});
      await TestimonialService.updateById(id, parsed);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update testimonial" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid testimonial id" });
        return;
      }
      await TestimonialService.deleteById(id);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to delete testimonial" });
    }
  }
}
