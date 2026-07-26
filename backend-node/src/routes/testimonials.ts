import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { TestimonialController } from "../controllers/TestimonialController.js";

export const testimonialRouter = Router();

// Public: approved testimonials only
testimonialRouter.get("/api/testimonials", TestimonialController.list);

// Any authenticated customer may submit a testimonial
testimonialRouter.post("/api/testimonials", requireAuth, TestimonialController.create);

// Moderation (approve/edit/remove) is admin-only
testimonialRouter.patch("/api/testimonials/:id", requireAdmin, TestimonialController.updateById);
testimonialRouter.delete("/api/testimonials/:id", requireAdmin, TestimonialController.deleteById);
