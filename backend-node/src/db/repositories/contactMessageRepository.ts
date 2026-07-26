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

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, full_name, email, phone, subject, message, language, is_read, created_at
         FROM contact_messages
         ORDER BY created_at DESC
         LIMIT 500`
      );
      return rows as any[];
    },

    async markRead(id: number) {
      await pool.execute(`UPDATE contact_messages SET is_read = 1 WHERE id = ?`, [id]);
    },

    async countUnread() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM contact_messages WHERE is_read = 0`);
      return Number(rows[0]?.count ?? 0);
    },
  };
}

