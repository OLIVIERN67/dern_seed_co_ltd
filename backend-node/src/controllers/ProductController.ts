import type { Request, Response } from "express";
import { z } from "zod";
import { ProductService } from "../services/ProductService.js";


const CreateProductSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  price: z.number().min(0).max(100000000),
  stock_quantity: z.number().int().min(0).max(10000000),
  unit: z.string().max(50).default("kg"),
  image_url: z.string().max(500).url().optional().nullable(),
});

const UpdateProductSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  price: z.number().min(0).max(100000000).optional(),
  stock_quantity: z.number().int().min(0).max(10000000).optional(),
  unit: z.string().max(50).optional(),
  image_url: z.string().max(500).url().optional().nullable(),
  is_available: z.number().int().min(0).max(1).optional(),
});

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateProductSchema.parse(req.body ?? {});
      const id = await ProductService.create(
        parsed.name,
        parsed.description ?? null,
        parsed.category ?? null,
        parsed.price,
        parsed.stock_quantity,
        parsed.unit,
        parsed.image_url ?? null
      );
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create product" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await ProductService.list();
      res.json({ products: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch products" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const product = await ProductService.getById(id);
      res.json({ product });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch product" });
    }
  }

  static async getByCategory(req: Request, res: Response) {
    try {
      const category = req.params.category;
      const items = await ProductService.getByCategory(category);
      res.json({ products: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch products by category" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateProductSchema.parse(req.body ?? {});
      
      const fields: any = {};
      if (parsed.name !== undefined) fields.name = parsed.name;
      if (parsed.description !== undefined) fields.description = parsed.description;
      if (parsed.category !== undefined) fields.category = parsed.category;
      if (parsed.price !== undefined) fields.price = parsed.price;
      if (parsed.stock_quantity !== undefined) fields.stock_quantity = parsed.stock_quantity;
      if (parsed.unit !== undefined) fields.unit = parsed.unit;
      if (parsed.image_url !== undefined) fields.image_url = parsed.image_url;
      if (parsed.is_available !== undefined) fields.is_available = parsed.is_available;

      await ProductService.updateById(id, fields);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update product" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ProductService.deleteById(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to delete product" });
    }
  }
}
