import { Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./users";
import { orderRouter } from "./orders";
import { productRouter } from "./products";
import { seedRouter } from "./seeds";
import { farmerRouter } from "./farmers";
import { employeeRouter } from "./employees";
import { testimonialRouter } from "./testimonials";
import { contactRouter } from "./contact";
import { productInquiryRouter } from "./productInquiries";
import { blogDocumentsRouter } from "./blogDocuments";


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
