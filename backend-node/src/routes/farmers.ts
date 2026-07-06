import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { FarmerController } from "../controllers/FarmerController";

export const farmerRouter = Router();

// Public routes
farmerRouter.get("/api/farmers", FarmerController.list);
farmerRouter.get("/api/farmers/:id", FarmerController.getById);

// Protected routes (require authentication)
farmerRouter.post("/api/farmers", requireAuth, FarmerController.create);
farmerRouter.get("/api/farmers/me", requireAuth, FarmerController.getMyProfile);
farmerRouter.patch("/api/farmers/:id", requireAuth, FarmerController.updateById);
farmerRouter.delete("/api/farmers/:id", requireAuth, FarmerController.deleteById);
