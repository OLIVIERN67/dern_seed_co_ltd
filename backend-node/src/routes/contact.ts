import { Router } from "express";
import { ContactController } from "../controllers/ContactController.js";


export const contactRouter = Router();

// Public endpoints
contactRouter.post("/api/contact", ContactController.submit);

