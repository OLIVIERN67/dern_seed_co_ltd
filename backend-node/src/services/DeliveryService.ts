import { db } from "../db";

function isStaff(role: string | undefined) {
  return role === "admin" || role === "employee";
}

export class DeliveryService {
  /** Customer sees their own deliveries; staff see all. */
  static async list(userId: number, role: string | undefined) {
    if (isStaff(role)) {
      return db.deliveries.findAll();
    }
    return db.deliveries.findByCustomerId(userId);
  }

  static async getById(userId: number, role: string | undefined, id: number) {
    const delivery = await db.deliveries.findById(id);
    if (!delivery) {
      throw Object.assign(new Error("Delivery not found"), { status: 404 });
    }
    if (!isStaff(role) && delivery.customer_id !== userId) {
      throw Object.assign(new Error("Unauthorized to view this delivery"), { status: 403 });
    }
    return delivery;
  }

  /** Staff only: create a delivery record for an order. */
  static async create(
    fields: {
      order_id: number;
      customer_id: number;
      customer_name: string;
      delivery_address?: string | null;
      phone_number?: string | null;
      delivery_status?: string;
      delivery_date?: string | null;
      delivered_by?: string | null;
      tracking_number?: string | null;
      notes?: string | null;
    }
  ) {
    return db.deliveries.create(fields);
  }

  /** Staff only: update a delivery record. */
  static async updateById(id: number, fields: Parameters<typeof db.deliveries.updateById>[1]) {
    const existing = await db.deliveries.findById(id);
    if (!existing) {
      throw Object.assign(new Error("Delivery not found"), { status: 404 });
    }
    await db.deliveries.updateById(id, fields);
  }
}

