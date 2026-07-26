import type { Pool } from "mysql2/promise";

export function createProductInquiryRepository(pool: Pool) {
  return {
    async create(input: {
      full_name: string;
      email: string;
      phone: string | null;
      product_name: string;
      quantity: number | null;
      message: string | null;
      language: string | null;
    }) {
      const [result]: any = await pool.execute(
        `INSERT INTO product_inquiries (
          full_name, email, phone, product_name, quantity, message, language
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          input.full_name,
          input.email,
          input.phone,
          input.product_name,
          input.quantity,
          input.message,
          input.language,
        ]
      );

      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, full_name, email, phone, product_name, quantity, message, language, is_read, created_at
         FROM product_inquiries
         ORDER BY created_at DESC
         LIMIT 500`
      );
      return rows as any[];
    },

    async markRead(id: number) {
      await pool.execute(`UPDATE product_inquiries SET is_read = 1 WHERE id = ?`, [id]);
    },

    async countUnread() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM product_inquiries WHERE is_read = 0`);
      return Number(rows[0]?.count ?? 0);
    },
  };
}

