import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { UserController } from "../controllers/UserController";

export const userRouter = Router();

userRouter.get("/api/users/me", requireAuth, UserController.me);
userRouter.patch("/api/users/me", requireAuth, UserController.updateMe);


