import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { UserController } from "../controllers/UserController.js";

export const userRouter = Router();

// Self-service (any authenticated user)
userRouter.get("/api/users/me", requireAuth, UserController.me);
userRouter.patch("/api/users/me", requireAuth, UserController.updateMe);

// Admin-only user management (Admin Dashboard: create/edit/delete/activate/deactivate + roles)
userRouter.get("/api/users", requireAdmin, UserController.list);
userRouter.post("/api/users", requireAdmin, UserController.create);
userRouter.patch("/api/users/:id", requireAdmin, UserController.updateById);
userRouter.delete("/api/users/:id", requireAdmin, UserController.deleteById);
