import type { Pool } from "mysql2/promise";

export interface DeliveryRecord {
  id: number;
  order_id: number;
  customer_id: number;
  customer_name: string;
  delivery_address: string | null;
  phone_number: string | null;
  delivery_status: "pending" | "in_transit" | "delivered" | "cancelled";
  delivery_date: string | null;
  delivered_by: string | null;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function createDeliveryRepository(pool: Pool) {
  return {
    async create(fields: {
      order_id: number;
      customer_id: number;
      customer_name: string;
      delivery_address?: string | null;
      phone_number?: string | null;
      delivery_status?: string;
      delivery_date?: string | null;
      delivered_by?: string | null;
      tracking_number?: string | null;
      notes?: string | null;
    }) {
      const [result]: any = await pool.execute(
        `INSERT INTO deliveries (order_id, customer_id, customer_name, delivery_address, phone_number, delivery_status, delivery_date, delivered_by, tracking_number, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fields.order_id,
          fields.customer_id,
          fields.customer_name,
          fields.delivery_address ?? null,
          fields.phone_number ?? null,
          fields.delivery_status ?? "pending",
          fields.delivery_date ?? null,
          fields.delivered_by ?? null,
          fields.tracking_number ?? null,
          fields.notes ?? null,
        ]
      );
      return Number(result.insertId);
    },

    async findByCustomerId(customerId: number) {
      const [rows] = await pool.execute(
        `SELECT d.*, o.product_name AS order_product_name, o.status AS order_status
         FROM deliveries d
         LEFT JOIN orders o ON o.id = d.order_id
         WHERE d.customer_id = ?
         ORDER BY d.id DESC`,
        [customerId]
      );
      return rows as (DeliveryRecord & { order_product_name: string; order_status: string })[];
    },

    async findByOrderId(orderId: number) {
      const [rows] = await pool.execute(
        `SELECT d.*, o.product_name AS order_product_name, o.status AS order_status
         FROM deliveries d
         LEFT JOIN orders o ON o.id = d.order_id
         WHERE d.order_id = ?
         ORDER BY d.id DESC`,
        [orderId]
      );
      return rows as (DeliveryRecord & { order_product_name: string; order_status: string })[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT d.*, o.product_name AS order_product_name, o.status AS order_status
         FROM deliveries d
         LEFT JOIN orders o ON o.id = d.order_id
         WHERE d.id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return (row as DeliveryRecord & { order_product_name: string; order_status: string }) ?? null;
    },

    async updateById(id: number, fields: Partial<{
      delivery_status: string;
      delivery_date: string | null;
      delivered_by: string | null;
      tracking_number: string | null;
      notes: string | null;
      delivery_address: string | null;
      phone_number: string | null;
    }>) {
      const allowed = new Set([
        "delivery_status",
        "delivery_date",
        "delivered_by",
        "tracking_number",
        "notes",
        "delivery_address",
        "phone_number",
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
      await pool.execute(`UPDATE deliveries SET ${sets.join(", ")} WHERE id = ?`, params);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT d.*, o.product_name AS order_product_name, o.status AS order_status
         FROM deliveries d
         LEFT JOIN orders o ON o.id = d.order_id
         ORDER BY d.id DESC`
      );
      return rows as (DeliveryRecord & { order_product_name: string; order_status: string })[];
    },

    async countByStatus(status: string) {
      const [rows]: any = await pool.execute(
        `SELECT COUNT(*) AS count FROM deliveries WHERE delivery_status = ?`,
        [status]
      );
      return Number(rows[0]?.count ?? 0);
    },
  };
}

