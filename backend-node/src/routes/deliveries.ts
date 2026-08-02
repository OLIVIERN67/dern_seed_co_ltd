import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireStaff } from "../middleware/requireStaff.js";
import { DeliveryController } from "../controllers/DeliveryController.js";

export const deliveryRouter = Router();

// Customer: list my own deliveries; Staff: list all deliveries
deliveryRouter.get("/api/deliveries", requireAuth, DeliveryController.list);

// Customer: get one of my deliveries; Staff: get any delivery
deliveryRouter.get("/api/deliveries/:id", requireAuth, DeliveryController.getById);

// Staff only: create a delivery record
deliveryRouter.post("/api/deliveries", requireStaff, DeliveryController.create);

// Staff only: update a delivery record
deliveryRouter.patch("/api/deliveries/:id", requireStaff, DeliveryController.updateById);

