import { Router } from "express";
import type { Request, Response } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireStaff } from "../middleware/requireStaff.js";
import { db } from "../db";

export const customerRouter = Router();

// 1. Get current logged-in customer profile
customerRouter.get("/api/customers/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    let customer = await db.customers.findByUserId(userId);
    if (!customer) {
      // Auto-create if not existing
      const user = await db.users.findById(userId);
      if (user) {
        const id = await db.customers.create(userId, user.name, user.email);
        customer = await db.customers.findById(id);
      }
    }
    res.json({ customer });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to fetch customer profile" });
  }
});

// 2. Update current logged-in customer profile
customerRouter.put("/api/customers/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { phone, address } = req.body ?? {};
    await db.customers.updateByUserId(userId, { phone, address });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err?.message || "Failed to update profile" });
  }
});

// 3. Get customer's sent messages (contact messages + product inquiries)
customerRouter.get("/api/customers/me/messages", requireAuth, async (req: Request, res: Response) => {
  try {
    const email = req.user!.email;

    // Contact messages
    const [contactRows]: any = await db.pool.execute(
      `SELECT id, full_name, email, phone, subject, message, created_at, 'contact' as type
       FROM contact_messages
       WHERE email = ?
       ORDER BY id DESC`,
      [email]
    );

    // Product inquiries
    const [inquiryRows]: any = await db.pool.execute(
      `SELECT id, full_name, email, phone, product_name, quantity, message, created_at, 'inquiry' as type
       FROM product_inquiries
       WHERE email = ?
       ORDER BY id DESC`,
      [email]
    );

    const combined = [...(contactRows || []), ...(inquiryRows || [])].sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    res.json({ messages: combined });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to fetch messages" });
  }
});

// 4. Staff only: List all customers
customerRouter.get("/api/customers", requireStaff, async (req: Request, res: Response) => {
  try {
    const customers = await db.customers.findAll();
    res.json({ customers });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to fetch customers" });
  }
});
