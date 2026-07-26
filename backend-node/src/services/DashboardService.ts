import { db } from "../db";

export class DashboardService {
  /** Full stats for the Admin Dashboard overview. */
  static async getAdminStats() {
    const [
      totalUsers,
      admins,
      employees,
      customers,
      farmers,
      products,
      seeds,
      orders,
      unreadMessages,
      unreadInquiries,
      pendingTestimonials,
    ] = await Promise.all([
      db.users.countAll(),
      db.users.countByRole("admin"),
      db.users.countByRole("employee"),
      db.users.countByRole("user"),
      db.farmers.countAll(),
      db.products.countAll(),
      db.seeds.countAll(),
      db.orders.countAll(),
      db.contactMessages.countUnread(),
      db.productInquiries.countUnread(),
      db.testimonials.countPendingApproval(),
    ]);

    return {
      users: { total: totalUsers, admins, employees, customers },
      farmers,
      products,
      seeds,
      orders,
      unreadMessages,
      unreadInquiries,
      pendingTestimonials,
    };
  }

  /** Lightweight stats for the Employee Dashboard overview (no user-account data). */
  static async getStaffStats() {
    const [farmers, orders, products, seeds] = await Promise.all([
      db.farmers.countAll(),
      db.orders.countAll(),
      db.products.countAll(),
      db.seeds.countAll(),
    ]);
    return { farmers, orders, products, seeds };
  }
}
