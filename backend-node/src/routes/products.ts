import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { ProductController } from "../controllers/ProductController.js";

export const productRouter = Router();

// Public routes (product catalog)
productRouter.get("/api/products", ProductController.list);
productRouter.get("/api/products/:id", ProductController.getById);
productRouter.get("/api/products/category/:category", ProductController.getByCategory);

// Admin-only: catalog/pricing/stock management
productRouter.post("/api/products", requireAdmin, ProductController.create);
productRouter.patch("/api/products/:id", requireAdmin, ProductController.updateById);
productRouter.delete("/api/products/:id", requireAdmin, ProductController.deleteById);
