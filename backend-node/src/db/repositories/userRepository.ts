import type { Pool } from "mysql2/promise";

export type UserRole = "user" | "admin" | "farmer" | "employee";

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

    /** Looks up a user by email regardless of active status (used for admin user management / duplicate checks). */
    async findByEmailAny(email: string) {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, is_active FROM users WHERE email = ? LIMIT 1`,
        [email]
      );
      const r = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return r ?? null;
    },

    async create(name: string, email: string, passwordHash: string) {
      const [result]: any = await pool.execute(
        `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
        [name, email, passwordHash]
      );
      return Number(result.insertId);
    },

    /** Admin-initiated user creation with an explicit role. */
    async createWithRole(name: string, email: string, passwordHash: string, role: UserRole) {
      const [result]: any = await pool.execute(
        `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
        [name, email, passwordHash, role]
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

    /** Looks up a user by id regardless of active status (used for admin user management). */
    async findByIdAny(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, is_active, created_at, updated_at
         FROM users
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const r = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return r ?? null;
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, name, email, role, is_active, created_at, updated_at
         FROM users
         ORDER BY created_at DESC`
      );
      return rows as any[];
    },

    async updateMe(id: number, name: string) {
      await pool.execute(
        `UPDATE users SET name = ? WHERE id = ? AND is_active = 1`,
        [name, id]
      );
    },

    /** Admin-only: update any subset of name/email/role/is_active for a given user. */
    async updateById(
      id: number,
      fields: Partial<{ name: string; email: string; role: UserRole; is_active: number }>
    ) {
      const allowed = new Set(["name", "email", "role", "is_active"]);
      const sets: string[] = [];
      const params: any[] = [];

      for (const [k, v] of Object.entries(fields)) {
        if (!allowed.has(k)) continue;
        if (v === undefined) continue;
        sets.push(`${k} = ?`);
        params.push(v);
      }

      if (sets.length === 0) return;

      params.push(id);
      await pool.execute(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`, params);
    },

    /** Admin-only: set a user's password hash (e.g. administrative reset). */
    async updatePasswordHash(id: number, passwordHash: string) {
      await pool.execute(`UPDATE users SET password_hash = ? WHERE id = ?`, [passwordHash, id]);
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
    },

    async countAll() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM users`);
      return Number(rows[0]?.count ?? 0);
    },

    async countByRole(role: UserRole) {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM users WHERE role = ?`, [role]);
      return Number(rows[0]?.count ?? 0);
    },
  };
}
