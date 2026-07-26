import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { SeedController } from "../controllers/SeedController.js";

export const seedRouter = Router();

// Public routes (seed catalog)
seedRouter.get("/api/seeds", SeedController.list);
seedRouter.get("/api/seeds/:id", SeedController.getById);
seedRouter.get("/api/seeds/crop/:crop_type", SeedController.getByCropType);

// Admin-only: catalog/pricing/stock management
seedRouter.post("/api/seeds", requireAdmin, SeedController.create);
seedRouter.patch("/api/seeds/:id", requireAdmin, SeedController.updateById);
seedRouter.delete("/api/seeds/:id", requireAdmin, SeedController.deleteById);
