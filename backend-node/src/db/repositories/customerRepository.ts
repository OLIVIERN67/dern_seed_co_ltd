import type { Pool } from "mysql2/promise";

export interface CustomerRecord {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  created_at?: string;
  updated_at?: string;
}

export function createCustomerRepository(pool: Pool) {
  return {
    async create(userId: number | null, name: string, email: string, phone?: string | null, address?: string | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO customers (user_id, name, email, phone, address) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, name, email, phone ?? null, address ?? null]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, email, phone, address, created_at, updated_at
         FROM customers
         ORDER BY id DESC`
      );
      return rows as CustomerRecord[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, email, phone, address, created_at, updated_at
         FROM customers
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as CustomerRecord) ?? null;
    },

    async findByUserId(userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, email, phone, address, created_at, updated_at
         FROM customers
         WHERE user_id = ?
         LIMIT 1`,
        [userId]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as CustomerRecord) ?? null;
    },

    async findByEmail(email: string) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, email, phone, address, created_at, updated_at
         FROM customers
         WHERE email = ?
         LIMIT 1`,
        [email]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as CustomerRecord) ?? null;
    },

    async updateById(id: number, fields: Partial<{ name: string; email: string; phone: string; address: string }>) {
      const allowed = new Set(["name", "email", "phone", "address"]);
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
      await pool.execute(`UPDATE customers SET ${sets.join(", ")} WHERE id = ?`, params);
    },

    async updateByUserId(userId: number, fields: Partial<{ name: string; email: string; phone: string; address: string }>) {
      const allowed = new Set(["name", "email", "phone", "address"]);
      const sets: string[] = [];
      const params: any[] = [];

      for (const [k, v] of Object.entries(fields)) {
        if (!allowed.has(k)) continue;
        if (v === undefined) continue;
        sets.push(`${k} = ?`);
        params.push(v);
      }

      if (sets.length === 0) return;

      params.push(userId);
      await pool.execute(`UPDATE customers SET ${sets.join(", ")} WHERE user_id = ?`, params);
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM customers WHERE id = ?`, [id]);
    },

    async countAll() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM customers`);
      return Number(rows[0]?.count ?? 0);
    },
  };
}
