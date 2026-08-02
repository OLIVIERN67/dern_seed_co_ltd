import type { Pool } from "mysql2/promise";

export interface OrderRecord {
  id: number;
  user_id: number;
  customer_name?: string;
  customer_email?: string;
  product_id?: number | null;
  product_name: string;
  quantity: number;
  unit?: string;
  unit_price?: number;
  total_amount: number;
  shipping_address?: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export function createOrderRepository(pool: Pool) {
  return {
    async create(
      userId: number,
      productName: string,
      quantity: number,
      totalAmount: number,
      productId?: number | null,
      unit?: string,
      unitPrice?: number,
      shippingAddress?: string | null
    ) {
      const [result]: any = await pool.execute(
        `INSERT INTO orders (user_id, product_id, product_name, quantity, unit, unit_price, total_amount, shipping_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          productId ?? null,
          productName,
          quantity,
          unit ?? 'kg',
          unitPrice ?? 0,
          totalAmount,
          shippingAddress ?? null,
        ]
      );
      return Number(result.insertId);
    },

    async listByUserId(userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, product_id, product_name, quantity, unit, unit_price, total_amount, shipping_address, status, created_at, updated_at
         FROM orders
         WHERE user_id = ?
         ORDER BY id DESC`,
        [userId]
      );
      return rows as OrderRecord[];
    },

    async findByIdAndUserId(id: number, userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, product_id, product_name, quantity, unit, unit_price, total_amount, shipping_address, status, created_at, updated_at
         FROM orders
         WHERE id = ? AND user_id = ?
         LIMIT 1`,
        [id, userId]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as OrderRecord) ?? null;
    },

    async updateByIdAndUserId(
      id: number,
      userId: number,
      fields: Partial<{
        product_name: string;
        quantity: number;
        unit: string;
        unit_price: number;
        total_amount: number;
        shipping_address: string;
        status: string;
      }>
    ) {
      const allowed = new Set([
        "product_name",
        "quantity",
        "unit",
        "unit_price",
        "total_amount",
        "shipping_address",
        "status",
      ]);
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
        `UPDATE orders SET ${sets.join(", ")} WHERE id = ? AND user_id = ?`,
        params
      );
    },

    async deleteByIdAndUserId(id: number, userId: number) {
      await pool.execute(`DELETE FROM orders WHERE id = ? AND user_id = ?`, [id, userId]);
    },

    // ---- Staff-wide access (admin/employee dashboards) ----

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT o.id, o.user_id, o.product_id, u.name AS customer_name, u.email AS customer_email,
                o.product_name, o.quantity, o.unit, o.unit_price, o.total_amount, o.shipping_address, o.status, o.created_at, o.updated_at
         FROM orders o
         LEFT JOIN users u ON u.id = o.user_id
         ORDER BY o.id DESC`
      );
      return rows as OrderRecord[];
    },

    async findByIdAny(id: number) {
      const [rows] = await pool.execute(
        `SELECT o.id, o.user_id, o.product_id, u.name AS customer_name, u.email AS customer_email,
                o.product_name, o.quantity, o.unit, o.unit_price, o.total_amount, o.shipping_address, o.status, o.created_at, o.updated_at
         FROM orders o
         LEFT JOIN users u ON u.id = o.user_id
         WHERE o.id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as OrderRecord) ?? null;
    },

    async updateByIdAny(
      id: number,
      fields: Partial<{
        product_name: string;
        quantity: number;
        unit: string;
        unit_price: number;
        total_amount: number;
        shipping_address: string;
        status: string;
      }>
    ) {
      const allowed = new Set([
        "product_name",
        "quantity",
        "unit",
        "unit_price",
        "total_amount",
        "shipping_address",
        "status",
      ]);
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
      await pool.execute(`UPDATE orders SET ${sets.join(", ")} WHERE id = ?`, params);
    },

    async deleteByIdAny(id: number) {
      await pool.execute(`DELETE FROM orders WHERE id = ?`, [id]);
    },

    async countAll() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM orders`);
      return Number(rows[0]?.count ?? 0);
    },
  };
}
