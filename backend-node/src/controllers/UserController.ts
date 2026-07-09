import type { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/UserService.js";


const UpdateMeSchema = z.object({
  name: z.string().min(2).max(120),
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
}

