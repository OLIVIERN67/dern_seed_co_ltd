import { db } from "../db";

export class EmployeeService {
  static async syncFromUser(userId: number, name: string, email: string, isActive = true) {
    const existing = await db.employees.findByUserId(userId);

    if (existing) {
      await db.employees.updateById(existing.id, {
        name,
        email,
        is_active: isActive ? 1 : 0,
      });
      return existing.id;
    }

    return db.employees.create(userId, name, null, email, null, null, new Date(), null);
  }

  static async create(userId: number | null, name: string, phone: string | null, email: string | null, position: string | null, department: string | null, hireDate: Date | null, salary: number | null) {
    const id = await db.employees.create(userId, name, phone, email, position, department, hireDate, salary);

    // Grant dashboard (staff) access by promoting the linked account to the
    // "employee" role, unless it is already an admin (never demote an admin).
    if (userId) {
      const user = await db.users.findByIdAny(userId);
      if (user && user.role !== "admin" && user.role !== "employee") {
        await db.users.updateById(userId, { role: "employee" });
      }
    }

    return id;
  }

  static async list() {
    return db.employees.findAll();
  }

  static async getById(id: number) {
    const employee = await db.employees.findById(id);
    if (!employee) {
      throw Object.assign(new Error("Employee not found"), { status: 404 });
    }
    return employee;
  }

  static async getByUserId(userId: number) {
    const employee = await db.employees.findByUserId(userId);
    if (!employee) {
      throw Object.assign(new Error("Employee profile not found"), { status: 404 });
    }
    return employee;
  }

  static async getByDepartment(department: string) {
    return db.employees.findByDepartment(department);
  }

  static async updateById(id: number, fields: any) {
    const employee = await db.employees.findById(id);
    await db.employees.updateById(id, fields);

    // Keep the linked user's role in sync when an employee is
    // deactivated/reactivated from the Admin Dashboard.
    if (employee?.user_id && fields.is_active !== undefined) {
      const user = await db.users.findByIdAny(employee.user_id);
      if (user && user.role !== "admin") {
        await db.users.updateById(employee.user_id, { role: fields.is_active ? "employee" : "user" });
      }
    }
  }

  static async deleteById(id: number) {
    const employee = await db.employees.findById(id);
    await db.employees.deleteById(id);

    // Revoke staff/dashboard access when the employee record is removed.
    if (employee?.user_id) {
      const user = await db.users.findByIdAny(employee.user_id);
      if (user && user.role === "employee") {
        await db.users.updateById(employee.user_id, { role: "user" });
      }
    }
  }
}
