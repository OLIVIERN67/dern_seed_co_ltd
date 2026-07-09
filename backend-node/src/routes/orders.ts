import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { OrderController } from "../controllers/OrderController.js";


export const orderRouter = Router();

orderRouter.post("/api/orders", requireAuth, OrderController.create);
orderRouter.get("/api/orders", requireAuth, OrderController.list);
orderRouter.get("/api/orders/:id", requireAuth, OrderController.getById);
orderRouter.patch("/api/orders/:id", requireAuth, OrderController.updateById);
orderRouter.delete("/api/orders/:id", requireAuth, OrderController.deleteById);


