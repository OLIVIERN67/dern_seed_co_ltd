import type { Pool } from "mysql2/promise";

export function createOrderRepository(pool: Pool) {
  return {
    async create(userId: number, productName: string, quantity: number, totalAmount: number) {
      const [result]: any = await pool.execute(
        `INSERT INTO orders (user_id, product_name, quantity, total_amount)
         VALUES (?, ?, ?, ?)`,
        [userId, productName, quantity, totalAmount]
      );
      return Number(result.insertId);
    },

    async listByUserId(userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, product_name, quantity, total_amount, status, created_at, updated_at
         FROM orders
         WHERE user_id = ?
         ORDER BY id DESC`,
        [userId]
      );
      return rows as any[];
    },

    async findByIdAndUserId(id: number, userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, product_name, quantity, total_amount, status, created_at, updated_at
         FROM orders
         WHERE id = ? AND user_id = ?
         LIMIT 1`,
        [id, userId]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateByIdAndUserId(id: number, userId: number, fields: Partial<{product_name: string; quantity: number; total_amount: number; status: string}>) {
      const allowed = new Set(["product_name", "quantity", "total_amount", "status"]);
      const sets: string[] = [];
      const params: any[] = [];

      for (const [k, v] of Object.entries(fields)) {
        if (!allowed.has(k)) continue;
        if (v === undefined) continue;
        sets.push(`${k} = ?`);
        params.push(v);
      }

      if (sets.length === 0) return;

      params.push(id, userId);

      await pool.execute(
        `UPDATE orders SET ${sets.join(", ")}
         WHERE id = ? AND user_id = ?`,
        params
      );
    },

    async deleteByIdAndUserId(id: number, userId: number) {
      await pool.execute(`DELETE FROM orders WHERE id = ? AND user_id = ?`, [id, userId]);
    },
  };
}

