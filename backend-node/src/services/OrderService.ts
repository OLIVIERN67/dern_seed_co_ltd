import { db } from "../db";

export class OrderService {
  static async create(userId: number, productName: string, quantity: number, totalAmount: number) {
    return db.orders.create(userId, productName, quantity, totalAmount);
  }

  static async list(userId: number) {
    return db.orders.listByUserId(userId);
  }

  static async getById(userId: number, id: number) {
    const o = await db.orders.findByIdAndUserId(id, userId);
    if (!o) throw Object.assign(new Error("Order not found"), { status: 404 });
    return o;
  }

  static async updateById(userId: number, id: number, fields: any) {
    await db.orders.updateByIdAndUserId(id, userId, fields);
  }

  static async deleteById(userId: number, id: number) {
    await db.orders.deleteByIdAndUserId(id, userId);
  }
}

