import type { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/UserService.js";

const UpdateMeSchema = z.object({
  name: z.string().min(2).max(120),
});

const RoleEnum = z.enum(["user", "admin", "farmer", "employee"]);

const CreateUserSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(255),
  password: z.string().min(8).max(200),
  role: RoleEnum,
});

const UpdateUserSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().max(255).optional(),
  password: z.string().min(8).max(200).optional(),
  role: RoleEnum.optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

export class UserController {
  static async me(req: Request, res: Response) {
    const userId = req.user!.id;
    const u = await UserService.getMe(userId);
    res.json({ user: u });
  }

  static async updateMe(req: Request, res: Response) {
    const userId = req.user!.id;
    const parsed = UpdateMeSchema.parse(req.body ?? {});
    await UserService.updateMe(userId, parsed.name);
    res.json({ ok: true });
  }

  // ---- Admin-only user management ----

  static async list(_req: Request, res: Response) {
    try {
      const users = await UserService.listUsers();
      res.json({ users });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch users" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateUserSchema.parse(req.body ?? {});
      const id = await UserService.createUser(parsed.name, parsed.email, parsed.password, parsed.role);
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create user" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const targetId = Number(req.params.id);
      const parsed = UpdateUserSchema.parse(req.body ?? {});
      await UserService.updateUser(req.user!.id, targetId, parsed);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update user" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const targetId = Number(req.params.id);
      await UserService.deleteUser(req.user!.id, targetId);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to delete user" });
    }
  }
}
