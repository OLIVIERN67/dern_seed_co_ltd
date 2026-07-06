import type { Request, Response } from "express";
import { z } from "zod";
import { FarmerService } from "../services/FarmerService";

const CreateFarmerSchema = z.object({
  user_id: z.number().int().positive().optional().nullable(),
  name: z.string().min(2).max(120),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  farm_name: z.string().max(200).optional().nullable(),
  farm_location: z.string().max(255).optional().nullable(),
  farm_size: z.number().min(0).max(100000).optional().nullable(),
  crops_grown: z.string().max(1000).optional().nullable(),
  registration_date: z.string().optional().nullable(),
});

const UpdateFarmerSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  farm_name: z.string().max(200).optional().nullable(),
  farm_location: z.string().max(255).optional().nullable(),
  farm_size: z.number().min(0).max(100000).optional().nullable(),
  crops_grown: z.string().max(1000).optional().nullable(),
  registration_date: z.string().optional().nullable(),
  is_active: z.number().int().min(0).max(1).optional(),
});

export class FarmerController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateFarmerSchema.parse(req.body ?? {});
      const registrationDate = parsed.registration_date ? new Date(parsed.registration_date) : new Date();
      
      const id = await FarmerService.create(
        parsed.user_id ?? null,
        parsed.name,
        parsed.phone ?? null,
        parsed.email ?? null,
        parsed.farm_name ?? null,
        parsed.farm_location ?? null,
        parsed.farm_size ?? null,
        parsed.crops_grown ?? null,
        registrationDate
      );
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create farmer" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await FarmerService.list();
      res.json({ farmers: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch farmers" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const farmer = await FarmerService.getById(id);
      res.json({ farmer });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch farmer" });
    }
  }

  static async getMyProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const farmer = await FarmerService.getByUserId(userId);
      res.json({ farmer });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch farmer profile" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateFarmerSchema.parse(req.body ?? {});
      
      const fields: any = {};
      if (parsed.name !== undefined) fields.name = parsed.name;
      if (parsed.phone !== undefined) fields.phone = parsed.phone;
      if (parsed.email !== undefined) fields.email = parsed.email;
      if (parsed.farm_name !== undefined) fields.farm_name = parsed.farm_name;
      if (parsed.farm_location !== undefined) fields.farm_location = parsed.farm_location;
      if (parsed.farm_size !== undefined) fields.farm_size = parsed.farm_size;
      if (parsed.crops_grown !== undefined) fields.crops_grown = parsed.crops_grown;
      if (parsed.registration_date !== undefined) fields.registration_date = parsed.registration_date ? new Date(parsed.registration_date) : null;
      if (parsed.is_active !== undefined) fields.is_active = parsed.is_active;

      await FarmerService.updateById(id, fields);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update farmer" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await FarmerService.deleteById(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to delete farmer" });
    }
  }
}
