import { Router } from "express";
import { BlogDocumentController } from "../controllers/BlogDocumentController";
import { requireAdmin } from "../middleware/requireAdmin";

export const blogDocumentsRouter = Router();

// Public: list + download
blogDocumentsRouter.get("/api/blog-documents", BlogDocumentController.list);
blogDocumentsRouter.get(
  "/api/blog-documents/:id/download",
  BlogDocumentController.download
);

// Admin: upload
blogDocumentsRouter.post(
  "/api/blog-documents",
  requireAdmin,
  BlogDocumentController.upload
);

