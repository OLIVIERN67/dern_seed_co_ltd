import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { TestimonialController } from "../controllers/TestimonialController";

export const testimonialRouter = Router();

// Public routes
testimonialRouter.get("/api/testimonials", TestimonialController.list);

// Protected routes (require authentication)
testimonialRouter.post("/api/testimonials", requireAuth, TestimonialController.create);
testimonialRouter.patch("/api/testimonials/:id", requireAuth, TestimonialController.updateById);
testimonialRouter.delete("/api/testimonials/:id", requireAuth, TestimonialController.deleteById);
