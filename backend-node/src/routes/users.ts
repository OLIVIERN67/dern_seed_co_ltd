import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { UserController } from "../controllers/UserController.js";


export const userRouter = Router();

userRouter.get("/api/users/me", requireAuth, UserController.me);
userRouter.patch("/api/users/me", requireAuth, UserController.updateMe);


