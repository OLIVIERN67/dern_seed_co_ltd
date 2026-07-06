import type { Request, Response } from "express";
import { z } from "zod";
import { SeedService } from "../services/SeedService";

const CreateSeedSchema = z.object({
  name: z.string().min(2).max(200),
  variety: z.string().max(100).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  crop_type: z.string().max(100).optional().nullable(),
  germination_rate: z.number().min(0).max(100).optional().nullable(),
  planting_season: z.string().max(50).optional().nullable(),
  harvest_period: z.string().max(50).optional().nullable(),
  price_per_kg: z.number().min(0).max(100000000),
  stock_quantity: z.number().int().min(0).max(10000000),
  origin: z.string().max(100).optional().nullable(),
  certification: z.string().max(100).optional().nullable(),
  image_url: z.string().max(500).url().optional().nullable(),
});

const UpdateSeedSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  variety: z.string().max(100).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  crop_type: z.string().max(100).optional().nullable(),
  germination_rate: z.number().min(0).max(100).optional().nullable(),
  planting_season: z.string().max(50).optional().nullable(),
  harvest_period: z.string().max(50).optional().nullable(),
  price_per_kg: z.number().min(0).max(100000000).optional(),
  stock_quantity: z.number().int().min(0).max(10000000).optional(),
  origin: z.string().max(100).optional().nullable(),
  certification: z.string().max(100).optional().nullable(),
  image_url: z.string().max(500).url().optional().nullable(),
  is_available: z.number().int().min(0).max(1).optional(),
});

export class SeedController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateSeedSchema.parse(req.body ?? {});
      const id = await SeedService.create(
        parsed.name,
        parsed.variety ?? null,
        parsed.description ?? null,
        parsed.crop_type ?? null,
        parsed.germination_rate ?? null,
        parsed.planting_season ?? null,
        parsed.harvest_period ?? null,
        parsed.price_per_kg,
        parsed.stock_quantity,
        parsed.origin ?? null,
        parsed.certification ?? null,
        parsed.image_url ?? null
      );
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create seed" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await SeedService.list();
      res.json({ seeds: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch seeds" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const seed = await SeedService.getById(id);
      res.json({ seed });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch seed" });
    }
  }

  static async getByCropType(req: Request, res: Response) {
    try {
      const cropType = req.params.crop_type;
      const items = await SeedService.getByCropType(cropType);
      res.json({ seeds: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch seeds by crop type" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateSeedSchema.parse(req.body ?? {});
      
      const fields: any = {};
      if (parsed.name !== undefined) fields.name = parsed.name;
      if (parsed.variety !== undefined) fields.variety = parsed.variety;
      if (parsed.description !== undefined) fields.description = parsed.description;
      if (parsed.crop_type !== undefined) fields.crop_type = parsed.crop_type;
      if (parsed.germination_rate !== undefined) fields.germination_rate = parsed.germination_rate;
      if (parsed.planting_season !== undefined) fields.planting_season = parsed.planting_season;
      if (parsed.harvest_period !== undefined) fields.harvest_period = parsed.harvest_period;
      if (parsed.price_per_kg !== undefined) fields.price_per_kg = parsed.price_per_kg;
      if (parsed.stock_quantity !== undefined) fields.stock_quantity = parsed.stock_quantity;
      if (parsed.origin !== undefined) fields.origin = parsed.origin;
      if (parsed.certification !== undefined) fields.certification = parsed.certification;
      if (parsed.image_url !== undefined) fields.image_url = parsed.image_url;
      if (parsed.is_available !== undefined) fields.is_available = parsed.is_available;

      await SeedService.updateById(id, fields);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update seed" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await SeedService.deleteById(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to delete seed" });
    }
  }
}
