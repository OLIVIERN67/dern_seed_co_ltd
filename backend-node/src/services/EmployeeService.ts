import { db } from "../db";

export class EmployeeService {
  static async create(userId: number | null, name: string, phone: string | null, email: string | null, position: string | null, department: string | null, hireDate: Date | null, salary: number | null) {
    return db.employees.create(userId, name, phone, email, position, department, hireDate, salary);
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
    await db.employees.updateById(id, fields);
  }

  static async deleteById(id: number) {
    await db.employees.deleteById(id);
  }
}
