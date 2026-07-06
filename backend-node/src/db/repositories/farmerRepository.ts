import type { Pool } from "mysql2/promise";

export function createFarmerRepository(pool: Pool) {
  return {
    async create(userId: number | null, name: string, phone: string | null, email: string | null, farmName: string | null, farmLocation: string | null, farmSize: number | null, cropsGrown: string | null, registrationDate: Date | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO farmers (user_id, name, phone, email, farm_name, farm_location, farm_size, crops_grown, registration_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, phone, email, farmName, farmLocation, farmSize, cropsGrown, registrationDate]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, farm_name, farm_location, farm_size, crops_grown, registration_date, is_active, created_at, updated_at
         FROM farmers
         WHERE is_active = 1
         ORDER BY name`
      );
      return rows as any[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, farm_name, farm_location, farm_size, crops_grown, registration_date, is_active, created_at, updated_at
         FROM farmers
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async findByUserId(userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, farm_name, farm_location, farm_size, crops_grown, registration_date, is_active, created_at, updated_at
         FROM farmers
         WHERE user_id = ? AND is_active = 1
         LIMIT 1`,
        [userId]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateById(id: number, fields: Partial<{name: string; phone: string; email: string; farm_name: string; farm_location: string; farm_size: number; crops_grown: string; registration_date: Date; is_active: number}>) {
      const allowed = new Set(["name", "phone", "email", "farm_name", "farm_location", "farm_size", "crops_grown", "registration_date", "is_active"]);
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
        `UPDATE farmers SET ${sets.join(", ")} WHERE id = ?`,
        params
      );
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM farmers WHERE id = ?`, [id]);
    },
  };
}
