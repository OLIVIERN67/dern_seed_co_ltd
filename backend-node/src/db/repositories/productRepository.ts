import type { Pool } from "mysql2/promise";

export function createProductRepository(pool: Pool) {
  return {
    async create(name: string, description: string | null, category: string | null, price: number, stockQuantity: number, unit: string, imageUrl: string | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO products (name, description, category, price, stock_quantity, unit, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, category, price, stockQuantity, unit, imageUrl]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, name, description, category, price, stock_quantity, unit, image_url, is_available, created_at, updated_at
         FROM products
         WHERE is_available = 1
         ORDER BY name`
      );
      return rows as any[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, description, category, price, stock_quantity, unit, image_url, is_available, created_at, updated_at
         FROM products
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateById(id: number, fields: Partial<{name: string; description: string; category: string; price: number; stock_quantity: number; unit: string; image_url: string; is_available: number}>) {
      const allowed = new Set(["name", "description", "category", "price", "stock_quantity", "unit", "image_url", "is_available"]);
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

      await pool.execute(
        `UPDATE products SET ${sets.join(", ")} WHERE id = ?`,
        params
      );
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM products WHERE id = ?`, [id]);
    },

    async findByCategory(category: string) {
      const [rows] = await pool.execute(
        `SELECT id, name, description, category, price, stock_quantity, unit, image_url, is_available, created_at, updated_at
         FROM products
         WHERE category = ? AND is_available = 1
         ORDER BY name`,
        [category]
      );
      return rows as any[];
    },
  };
}
