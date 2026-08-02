import { db } from "../db";

function isStaff(role: string | undefined) {
  return role === "admin" || role === "employee";
}

export class OrderService {
  static async create(
    userId: number,
    productName: string,
    quantity: number,
    totalAmount: number,
    productId?: number | null,
    unit?: string,
    unitPrice?: number,
    shippingAddress?: string | null
  ) {
    return db.orders.create(
      userId,
      productName,
      quantity,
      totalAmount,
      productId,
      unit,
      unitPrice,
      shippingAddress
    );
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
    const currentOrder = await db.orders.findByIdAny(id);
    if (!currentOrder) {
      throw Object.assign(new Error("Order not found"), { status: 404 });
    }

    if (!isStaff(role) && currentOrder.user_id !== userId) {
      throw Object.assign(new Error("Unauthorized to update this order"), { status: 403 });
    }

    // Handle inventory deduction if status is being updated to 'approved'
    if (fields.status) {
      const newStatusLower = String(fields.status).toLowerCase();
      const currentStatusLower = String(currentOrder.status).toLowerCase();

      if (newStatusLower === "approved" && currentStatusLower !== "approved") {
        // Find product to deduct stock
        const allProducts = await db.products.findAll();
        let targetProduct: any = null;
        if (currentOrder.product_id) {
          targetProduct = allProducts.find((p: any) => p.id === currentOrder.product_id);
        }
        if (!targetProduct) {
          targetProduct = allProducts.find(
            (p: any) => p.name.toLowerCase().trim() === currentOrder.product_name.toLowerCase().trim()
          );
        }

        if (targetProduct) {
          if (Number(targetProduct.stock_quantity) < Number(currentOrder.quantity)) {
            throw Object.assign(
              new Error(
                `Approval failed: Insufficient stock available. Available: ${targetProduct.stock_quantity} ${targetProduct.unit || "kg"}, Requested: ${currentOrder.quantity} ${currentOrder.unit || "kg"}`
              ),
              { status: 400 }
            );
          }

          // Deduct stock quantity
          const updatedStock = Number(targetProduct.stock_quantity) - Number(currentOrder.quantity);
          await db.products.updateById(targetProduct.id, {
            stock_quantity: updatedStock,
            is_available: updatedStock > 0 ? 1 : 0,
          });
        }
      } else if (currentStatusLower === "approved" && (newStatusLower === "cancelled" || newStatusLower === "rejected")) {
        // Restore stock if previously approved order is cancelled or rejected
        const allProducts = await db.products.findAll();
        let targetProduct: any = null;
        if (currentOrder.product_id) {
          targetProduct = allProducts.find((p: any) => p.id === currentOrder.product_id);
        }
        if (!targetProduct) {
          targetProduct = allProducts.find(
            (p: any) => p.name.toLowerCase().trim() === currentOrder.product_name.toLowerCase().trim()
          );
        }

        if (targetProduct) {
          const restoredStock = Number(targetProduct.stock_quantity) + Number(currentOrder.quantity);
          await db.products.updateById(targetProduct.id, {
            stock_quantity: restoredStock,
            is_available: 1,
          });
        }
      }
    }

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
