import { db } from "../db";

function isStaff(role: string | undefined) {
  return role === "admin" || role === "employee";
}

export class OrderService {
  static async create(userId: number, productName: string, quantity: number, totalAmount: number) {
    return db.orders.create(userId, productName, quantity, totalAmount);
  }

  /** Staff (admin/employee) see every order; customers see only their own. */
  static async list(userId: number, role: string | undefined) {
    if (isStaff(role)) return db.orders.findAll();
    return db.orders.listByUserId(userId);
  }

  static async getById(userId: number, role: string | undefined, id: number) {
    const o = isStaff(role) ? await db.orders.findByIdAny(id) : await db.orders.findByIdAndUserId(id, userId);
    if (!o) throw Object.assign(new Error("Order not found"), { status: 404 });
    return o;
  }

  static async updateById(userId: number, role: string | undefined, id: number, fields: any) {
    if (isStaff(role)) {
      await db.orders.updateByIdAny(id, fields);
    } else {
      await db.orders.updateByIdAndUserId(id, userId, fields);
    }
  }

  static async deleteById(userId: number, role: string | undefined, id: number) {
    if (isStaff(role)) {
      await db.orders.deleteByIdAny(id);
    } else {
      await db.orders.deleteByIdAndUserId(id, userId);
    }
  }
}
