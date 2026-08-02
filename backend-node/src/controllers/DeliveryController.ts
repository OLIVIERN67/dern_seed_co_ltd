import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { DeliveryService } from "../services/DeliveryService.js";

function formatZodError(err: ZodError): string {
  return err.issues
    .map((issue) => {
      const field = issue.path.join(".");
      return field ? `${field}: ${issue.message}` : issue.message;
    })
    .join("; ");
}

const CreateDeliverySchema = z.object({
  order_id: z.number().int(),
  customer_id: z.number().int(),
  customer_name: z.string().min(2).max(120),
  delivery_address: z.string().max(255).optional().nullable(),
  phone_number: z.string().max(50).optional().nullable(),
  delivery_status: z.enum(["pending", "in_transit", "delivered", "cancelled"]).optional().default("pending"),
  delivery_date: z.string().optional().nullable(),
  delivered_by: z.string().max(120).optional().nullable(),
  tracking_number: z.string().max(100).optional().nullable(),
  notes: z.string().optional().nullable(),
});

const UpdateDeliverySchema = z.object({
  delivery_status: z.enum(["pending", "in_transit", "delivered", "cancelled"]).optional(),
  delivery_date: z.string().optional().nullable(),
  delivered_by: z.string().max(120).optional().nullable(),
  tracking_number: z.string().max(100).optional().nullable(),
  notes: z.string().optional().nullable(),
  delivery_address: z.string().max(255).optional().nullable(),
  phone_number: z.string().max(50).optional().nullable(),
});

export class DeliveryController {
  static async list(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const items = await DeliveryService.list(userId, req.user!.role);
      res.json({ deliveries: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch deliveries" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = Number(req.params.id);
      const delivery = await DeliveryService.getById(userId, req.user!.role, id);
      res.json({ delivery });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch delivery" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateDeliverySchema.parse(req.body ?? {});
      const id = await DeliveryService.create(parsed);
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: formatZodError(e) });
        return;
      }
      res.status(400).json({ error: e?.message ?? "Failed to create delivery" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateDeliverySchema.parse(req.body ?? {});
      await DeliveryService.updateById(id, parsed);
      res.json({ ok: true });
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: formatZodError(e) });
        return;
      }
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update delivery" });
    }
  }
}

