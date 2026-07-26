import { Router } from "express";
import { ProductInquiryController } from "../controllers/ProductInquiryController.js";
import { requireStaff } from "../middleware/requireStaff.js";

export const productInquiryRouter = Router();

// Public endpoint
productInquiryRouter.post("/api/product-inquiries", ProductInquiryController.submit);

// Staff-only: view submitted inquiries
productInquiryRouter.get("/api/product-inquiries", requireStaff, ProductInquiryController.list);
productInquiryRouter.patch("/api/product-inquiries/:id/read", requireStaff, ProductInquiryController.markRead);
