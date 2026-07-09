import { Router } from "express";

import { authRouter } from "./auth.js";
import { userRouter } from "./users.js";
import { orderRouter } from "./orders.js";
import { productRouter } from "./products.js";
import { seedRouter } from "./seeds.js";
import { farmerRouter } from "./farmers.js";
import { employeeRouter } from "./employees.js";
import { testimonialRouter } from "./testimonials.js";
import { contactRouter } from "./contact.js";
import { productInquiryRouter } from "./productInquiries.js";
import { blogDocumentsRouter } from "./blogDocuments.js";



export const routes = Router();

// Health check (useful for deployment monitoring / load balancers)
routes.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "dern-seed-backend", timestamp: new Date().toISOString() });
});

routes.use(authRouter);
routes.use(userRouter);
routes.use(orderRouter);
routes.use(productRouter);
routes.use(contactRouter);
routes.use(productInquiryRouter);
routes.use(blogDocumentsRouter);

routes.use(seedRouter);
routes.use(farmerRouter);
routes.use(employeeRouter);
routes.use(testimonialRouter);
