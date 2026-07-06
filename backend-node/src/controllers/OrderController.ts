import type { Request, Response } from "express";
import { z } from "zod";
import { OrderService } from "../services/OrderService";

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
    const userId = req.user!.id;
    const body = req.body ?? {};
    const parsed = CreateOrderSchema.parse(body);
    const id = await OrderService.create(userId, parsed.product_name, parsed.quantity, parsed.total_amount);
    res.status(201).json({ ok: true, id });
  }

  static async list(req: Request, res: Response) {
    const userId = req.user!.id;
    const items = await OrderService.list(userId);
    res.json({ orders: items });
  }

  static async getById(req: Request, res: Response) {
    const userId = req.user!.id;
    const id = Number(req.params.id);
    const order = await OrderService.getById(userId, id);
    res.json({ order });
  }

  static async updateById(req: Request, res: Response) {
    const userId = req.user!.id;
    const id = Number(req.params.id);

    const parsed = UpdateOrderSchema.parse(req.body ?? {});

    const fields: any = {};
    if (parsed.product_name !== undefined) fields.product_name = parsed.product_name;
    if (parsed.quantity !== undefined) fields.quantity = parsed.quantity;
    if (parsed.total_amount !== undefined) fields.total_amount = parsed.total_amount;
    if (parsed.status !== undefined) fields.status = parsed.status;

    await OrderService.updateById(userId, id, fields);
    res.json({ ok: true });
  }

  static async deleteById(req: Request, res: Response) {
    const userId = req.user!.id;
    const id = Number(req.params.id);
    await OrderService.deleteById(userId, id);
    res.json({ ok: true });
  }
}

