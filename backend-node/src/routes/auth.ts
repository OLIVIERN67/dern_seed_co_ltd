import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { requireAuth } from "../middleware/sessionMiddleware.js";

export const authRouter = Router();

authRouter.post("/api/auth/register", AuthController.register);
authRouter.post("/api/auth/login", AuthController.login);
authRouter.post("/api/auth/logout", requireAuth, AuthController.logout);


