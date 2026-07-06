import type { Pool } from "mysql2/promise";

export function createSeedRepository(pool: Pool) {
  return {
    async create(name: string, variety: string | null, description: string | null, cropType: string | null, germinationRate: number | null, plantingSeason: string | null, harvestPeriod: string | null, pricePerKg: number, stockQuantity: number, origin: string | null, certification: string | null, imageUrl: string | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO seeds (name, variety, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, variety, description, cropType, germinationRate, plantingSeason, harvestPeriod, pricePerKg, stockQuantity, origin, certification, imageUrl]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE is_available = 1
         ORDER BY name`
      );
      return rows as any[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateById(id: number, fields: Partial<{name: string; variety: string; description: string; crop_type: string; germination_rate: number; planting_season: string; harvest_period: string; price_per_kg: number; stock_quantity: number; origin: string; certification: string; image_url: string; is_available: number}>) {
      const allowed = new Set(["name", "variety", "description", "crop_type", "germination_rate", "planting_season", "harvest_period", "price_per_kg", "stock_quantity", "origin", "certification", "image_url", "is_available"]);
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
        `UPDATE seeds SET ${sets.join(", ")} WHERE id = ?`,
        params
      );
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM seeds WHERE id = ?`, [id]);
    },

    async findByCropType(cropType: string) {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE crop_type = ? AND is_available = 1
         ORDER BY name`,
        [cropType]
      );
      return rows as any[];
    },
  };
}
