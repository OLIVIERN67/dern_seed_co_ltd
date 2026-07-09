import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { TestimonialController } from "../controllers/TestimonialController.js";


export const testimonialRouter = Router();

// Public routes
testimonialRouter.get("/api/testimonials", TestimonialController.list);

// Protected routes (require authentication)
testimonialRouter.post("/api/testimonials", requireAuth, TestimonialController.create);
testimonialRouter.patch("/api/testimonials/:id", requireAuth, TestimonialController.updateById);
testimonialRouter.delete("/api/testimonials/:id", requireAuth, TestimonialController.deleteById);
