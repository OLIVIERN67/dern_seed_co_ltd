import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { OrderService } from "../services/OrderService.js";

/** Convert a ZodError into a single human-readable message. */
function formatZodError(err: ZodError): string {
  return err.issues.map((issue) => {
    const field = issue.path.join(".");
    return field ? `${field}: ${issue.message}` : issue.message;
  }).join("; ");
}

const CreateOrderSchema = z.object({
  product_name: z.string().min(2).max(200),
  quantity: z.number().int().min(1).max(1_000_000),
  total_amount: z.number().min(0).max(100_000_000),
});

const UpdateOrderSchema = z.object({
  product_name: z.string().min(2).max(200).optional(),
  quantity: z.number().int().min(1).max(1_000_000).optional(),
  total_amount: z.number().min(0).max(100_000_000).optional(),
  status: z.enum(["pending", "paid", "fulfilled", "cancelled"]).optional(),
});

export class OrderController {
  static async create(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const body = req.body ?? {};
      const parsed = CreateOrderSchema.parse(body);
      const id = await OrderService.create(userId, parsed.product_name, parsed.quantity, parsed.total_amount);
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: formatZodError(e) });
        return;
      }
      res.status(400).json({ error: e?.message ?? "Failed to create order" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const items = await OrderService.list(userId, req.user!.role);
      res.json({ orders: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch orders" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = Number(req.params.id);
      const order = await OrderService.getById(userId, req.user!.role, id);
      res.json({ order });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch order" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = Number(req.params.id);

      const parsed = UpdateOrderSchema.parse(req.body ?? {});

      const fields: any = {};
      if (parsed.product_name !== undefined) fields.product_name = parsed.product_name;
      if (parsed.quantity !== undefined) fields.quantity = parsed.quantity;
      if (parsed.total_amount !== undefined) fields.total_amount = parsed.total_amount;
      if (parsed.status !== undefined) fields.status = parsed.status;

      await OrderService.updateById(userId, req.user!.role, id, fields);
      res.json({ ok: true });
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: formatZodError(e) });
        return;
      }
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update order" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const id = Number(req.params.id);
      await OrderService.deleteById(userId, req.user!.role, id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to delete order" });
    }
  }
}
