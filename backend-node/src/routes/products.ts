import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { ProductController } from "../controllers/ProductController";

export const productRouter = Router();

// Public routes
productRouter.get("/api/products", ProductController.list);
productRouter.get("/api/products/:id", ProductController.getById);
productRouter.get("/api/products/category/:category", ProductController.getByCategory);

// Protected routes (require authentication)
productRouter.post("/api/products", requireAuth, ProductController.create);
productRouter.patch("/api/products/:id", requireAuth, ProductController.updateById);
productRouter.delete("/api/products/:id", requireAuth, ProductController.deleteById);
