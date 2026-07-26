import { Router } from "express";
import { ContactController } from "../controllers/ContactController.js";
import { requireStaff } from "../middleware/requireStaff.js";

export const contactRouter = Router();

// Public endpoint
contactRouter.post("/api/contact", ContactController.submit);

// Staff-only: view submitted messages
contactRouter.get("/api/contact", requireStaff, ContactController.list);
contactRouter.patch("/api/contact/:id/read", requireStaff, ContactController.markRead);
