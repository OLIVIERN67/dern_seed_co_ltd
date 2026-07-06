import type { Pool } from "mysql2/promise";

export function createUserRepository(pool: Pool) {
  return {
    async findByEmail(email: string) {
      const [rows] = await pool.execute(
        `SELECT id, name, email, password_hash, role, is_active
         FROM users
         WHERE email = ? AND is_active = 1
         LIMIT 1`,
        [email]
      );
      const r = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return r ?? null;
    },

    async create(name: string, email: string, passwordHash: string) {
      const [result]: any = await pool.execute(
        `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)` ,
        [name, email, passwordHash]
      );
      return Number(result.insertId);
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, is_active, created_at, updated_at
         FROM users
         WHERE id = ? AND is_active = 1
         LIMIT 1`,
        [id]
      );
      const r = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return r ?? null;
    },

    async updateMe(id: number, name: string) {
      await pool.execute(
        `UPDATE users SET name = ? WHERE id = ? AND is_active = 1`,
        [name, id]
      );
    },
  };
}

