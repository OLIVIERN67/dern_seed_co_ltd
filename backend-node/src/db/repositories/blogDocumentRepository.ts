import type { Pool } from "mysql2/promise";

export type BlogDocumentType = "seasonal" | "buying" | "publication";

export function createBlogDocumentRepository(pool: Pool) {
  return {
    async create(input: {
      type: BlogDocumentType;
      original_filename: string;
      stored_filename: string;
      mime_type: string;
      size_bytes: number;
    }) {
      const [result]: any = await pool.execute(
        `INSERT INTO blog_documents (
          type, original_filename, stored_filename, mime_type, size_bytes
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          input.type,
          input.original_filename,
          input.stored_filename,
          input.mime_type,
          input.size_bytes,
        ]
      );

      return Number(result.insertId);
    },

    async listByType(type?: BlogDocumentType | "all") {
      if (!type || type === "all") {
        const [rows] = await pool.execute(
          `SELECT id, type, original_filename, mime_type, size_bytes, created_at
           FROM blog_documents
           ORDER BY created_at DESC
           LIMIT 200`
        );
        return Array.isArray(rows) ? (rows as any[]) : [];
      }

      const [rows] = await pool.execute(
        `SELECT id, type, original_filename, mime_type, size_bytes, created_at
         FROM blog_documents
         WHERE type = ?
         ORDER BY created_at DESC
         LIMIT 200`,
        [type]
      );

      return Array.isArray(rows) ? (rows as any[]) : [];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, type, original_filename, stored_filename, mime_type, size_bytes, created_at
         FROM blog_documents
         WHERE id = ?
         LIMIT 1`,
        [id]
      );

      const r = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return r ?? null;
    },
  };
}

