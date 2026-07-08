import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { FarmerController } from "../controllers/FarmerController";

export const farmerRouter = Router();

// Public routes
farmerRouter.get("/api/farmers", FarmerController.list);

// Protected routes (require authentication)
// NOTE: "/me" must be registered BEFORE "/:id", otherwise Express matches "me" as an :id param.
farmerRouter.get("/api/farmers/me", requireAuth, FarmerController.getMyProfile);
farmerRouter.post("/api/farmers", requireAuth, FarmerController.create);

// Public parameterized route (after "/me")
farmerRouter.get("/api/farmers/:id", FarmerController.getById);
farmerRouter.patch("/api/farmers/:id", requireAuth, FarmerController.updateById);
farmerRouter.delete("/api/farmers/:id", requireAuth, FarmerController.deleteById);
