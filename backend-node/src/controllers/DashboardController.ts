import type { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService.js";

export class DashboardController {
  static async adminStats(_req: Request, res: Response) {
    try {
      const stats = await DashboardService.getAdminStats();
      res.json({ stats });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to load dashboard stats" });
    }
  }

  static async staffStats(_req: Request, res: Response) {
    try {
      const stats = await DashboardService.getStaffStats();
      res.json({ stats });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to load dashboard stats" });
    }
  }
}
