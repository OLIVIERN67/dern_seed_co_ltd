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
  };
}

