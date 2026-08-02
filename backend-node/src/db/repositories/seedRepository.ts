import type { Pool } from "mysql2/promise";

function parseJsonList(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
  } catch {
    // Fall through to comma-separated parsing.
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toJson(value: string[] | string | null | undefined): string | null {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) return JSON.stringify(value.filter(Boolean));
  return JSON.stringify(parseJsonList(value));
}

function mapSeedRow(row: any) {
  return {
    ...row,
    varieties: parseJsonList(row.varieties_json),
    benefits: parseJsonList(row.benefits_json),
  };
}

export function createSeedRepository(pool: Pool) {
  return {
    async create(name: string, variety: string | null, varieties: string[] | null, benefits: string[] | null, description: string | null, cropType: string | null, germinationRate: number | null, plantingSeason: string | null, harvestPeriod: string | null, pricePerKg: number, stockQuantity: number, origin: string | null, certification: string | null, imageUrl: string | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO seeds (name, variety, varieties_json, benefits_json, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, variety, toJson(varieties), toJson(benefits), description, cropType, germinationRate, plantingSeason, harvestPeriod, pricePerKg, stockQuantity, origin, certification, imageUrl]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, varieties_json, benefits_json, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE is_available = 1
         ORDER BY name`
      );
      return (rows as any[]).map(mapSeedRow);
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, varieties_json, benefits_json, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ? mapSeedRow(row) : null;
    },

    async updateById(id: number, fields: Partial<{name: string; variety: string; varieties: string[]; benefits: string[]; description: string; crop_type: string; germination_rate: number; planting_season: string; harvest_period: string; price_per_kg: number; stock_quantity: number; origin: string; certification: string; image_url: string; is_available: number}>) {
      const allowed = new Set(["name", "variety", "varieties", "benefits", "description", "crop_type", "germination_rate", "planting_season", "harvest_period", "price_per_kg", "stock_quantity", "origin", "certification", "image_url", "is_available"]);
      const sets: string[] = [];
      const params: any[] = [];

      for (const [k, v] of Object.entries(fields)) {
        if (!allowed.has(k)) continue;
        if (v === undefined) continue;
        if (k === "varieties" || k === "benefits") {
          sets.push(`${k}_json = ?`);
          params.push(toJson(v as any));
          continue;
        }
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

    async countAll() {
      const [rows]: any = await pool.execute(`SELECT COUNT(*) AS count FROM seeds WHERE is_available = 1`);
      return Number(rows[0]?.count ?? 0);
    },

    async findByCropType(cropType: string) {
      const [rows] = await pool.execute(
        `SELECT id, name, variety, varieties_json, benefits_json, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url, is_available, created_at, updated_at
         FROM seeds
         WHERE crop_type = ? AND is_available = 1
         ORDER BY name`,
        [cropType]
      );
      return (rows as any[]).map(mapSeedRow);
    },
  };
}
