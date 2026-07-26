import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireStaff } from "../middleware/requireStaff.js";
import { FarmerController } from "../controllers/FarmerController.js";

export const farmerRouter = Router();

// Self-service: a farmer viewing their own profile.
// NOTE: "/me" must be registered BEFORE "/:id", otherwise Express matches "me" as an :id param.
farmerRouter.get("/api/farmers/me", requireAuth, FarmerController.getMyProfile);

// Customer (farmer) records contain PII (phone/email/location) and are managed
// by staff only (Admin: full access; Employee: manage customers as part of
// daily operations) — not public.
farmerRouter.get("/api/farmers", requireStaff, FarmerController.list);
farmerRouter.get("/api/farmers/:id", requireStaff, FarmerController.getById);
farmerRouter.post("/api/farmers", requireStaff, FarmerController.create);
farmerRouter.patch("/api/farmers/:id", requireStaff, FarmerController.updateById);
farmerRouter.delete("/api/farmers/:id", requireStaff, FarmerController.deleteById);
