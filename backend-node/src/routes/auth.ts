import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";


export const authRouter = Router();

authRouter.post("/api/auth/register", AuthController.register);
authRouter.post("/api/auth/login", AuthController.login);
authRouter.post("/api/auth/logout", AuthController.logout);


