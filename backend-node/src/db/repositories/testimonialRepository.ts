import type { Pool } from "mysql2/promise";

export function createTestimonialRepository(pool: Pool) {
  return {
    async create(
      name: string,
      role: string | null,
      rating: number,
      message: string,
      initials: string | null
    ) {
      const [result]: any = await pool.execute(
        `INSERT INTO testimonials (name, role, rating, message, initials)
         VALUES (?, ?, ?, ?, ?)`,
        [name, role, rating, message, initials]
      );
      return Number(result.insertId);
    },

    async findAllApproved() {
      const [rows] = await pool.execute(
        `SELECT id, name, role, rating, message, initials, created_at
         FROM testimonials
         WHERE is_approved = 1
         ORDER BY created_at DESC`
      );
      return rows as any[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, name, role, rating, message, initials, is_approved, created_at, updated_at
         FROM testimonials
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateById(
      id: number,
      fields: Partial<{
        name: string;
        role: string;
        rating: number;
        message: string;
        initials: string;
        is_approved: number;
      }>
    ) {
      const allowed = new Set(["name", "role", "rating", "message", "initials", "is_approved"]);
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
      await pool.execute(`UPDATE testimonials SET ${sets.join(", ")} WHERE id = ?`, params);
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM testimonials WHERE id = ?`, [id]);
    },
  };
}
