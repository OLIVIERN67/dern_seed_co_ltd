import type { Pool } from "mysql2/promise";

export function createContactMessageRepository(pool: Pool) {
  return {
    async create(input: {
      full_name: string;
      email: string;
      phone: string | null;
      subject: string | null;
      message: string;
      language: string | null;
    }) {
      const [result]: any = await pool.execute(
        `INSERT INTO contact_messages (
          full_name, email, phone, subject, message, language
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          input.full_name,
          input.email,
          input.phone,
          input.subject,
          input.message,
          input.language,
        ]
      );

      return Number(result.insertId);
    },
  };
}

