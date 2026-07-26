import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireStaff } from "../middleware/requireStaff.js";
import { DashboardController } from "../controllers/DashboardController.js";

export const dashboardRouter = Router();

dashboardRouter.get("/api/dashboard/admin-stats", requireAdmin, DashboardController.adminStats);
dashboardRouter.get("/api/dashboard/staff-stats", requireStaff, DashboardController.staffStats);
