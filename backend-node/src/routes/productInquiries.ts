import { Router } from "express";
import { ProductInquiryController } from "../controllers/ProductInquiryController.js";


export const productInquiryRouter = Router();

// Public endpoints
productInquiryRouter.post("/api/product-inquiries", ProductInquiryController.submit);

