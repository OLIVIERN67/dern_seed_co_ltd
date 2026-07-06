import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { SeedController } from "../controllers/SeedController";

export const seedRouter = Router();

// Public routes
seedRouter.get("/api/seeds", SeedController.list);
seedRouter.get("/api/seeds/:id", SeedController.getById);
seedRouter.get("/api/seeds/crop/:crop_type", SeedController.getByCropType);

// Protected routes (require authentication)
seedRouter.post("/api/seeds", requireAuth, SeedController.create);
seedRouter.patch("/api/seeds/:id", requireAuth, SeedController.updateById);
seedRouter.delete("/api/seeds/:id", requireAuth, SeedController.deleteById);
