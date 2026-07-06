import type { Pool } from "mysql2/promise";

export function createEmployeeRepository(pool: Pool) {
  return {
    async create(userId: number | null, name: string, phone: string | null, email: string | null, position: string | null, department: string | null, hireDate: Date | null, salary: number | null) {
      const [result]: any = await pool.execute(
        `INSERT INTO employees (user_id, name, phone, email, position, department, hire_date, salary) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, phone, email, position, department, hireDate, salary]
      );
      return Number(result.insertId);
    },

    async findAll() {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, position, department, hire_date, salary, is_active, created_at, updated_at
         FROM employees
         WHERE is_active = 1
         ORDER BY name`
      );
      return rows as any[];
    },

    async findById(id: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, position, department, hire_date, salary, is_active, created_at, updated_at
         FROM employees
         WHERE id = ?
         LIMIT 1`,
        [id]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async findByUserId(userId: number) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, position, department, hire_date, salary, is_active, created_at, updated_at
         FROM employees
         WHERE user_id = ? AND is_active = 1
         LIMIT 1`,
        [userId]
      );
      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      return row ?? null;
    },

    async updateById(id: number, fields: Partial<{name: string; phone: string; email: string; position: string; department: string; hire_date: Date; salary: number; is_active: number}>) {
      const allowed = new Set(["name", "phone", "email", "position", "department", "hire_date", "salary", "is_active"]);
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
        `UPDATE employees SET ${sets.join(", ")} WHERE id = ?`,
        params
      );
    },

    async deleteById(id: number) {
      await pool.execute(`DELETE FROM employees WHERE id = ?`, [id]);
    },

    async findByDepartment(department: string) {
      const [rows] = await pool.execute(
        `SELECT id, user_id, name, phone, email, position, department, hire_date, salary, is_active, created_at, updated_at
         FROM employees
         WHERE department = ? AND is_active = 1
         ORDER BY name`,
        [department]
      );
      return rows as any[];
    },
  };
}
