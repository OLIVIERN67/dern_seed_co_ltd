import bcrypt from "bcryptjs";
import { db } from "../db";
import { SessionManager } from "./SessionManager.js";

export class AuthService {
  static async register(name: string, email: string, password: string, phone?: string, address?: string) {
    const existing = await db.users.findByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await db.users.create(name, email, passwordHash);

    // Get the user to include role in session
    const user = await db.users.findById(userId);
    if (!user) {
      throw new Error("Failed to create user");
    }

    // Automatically store customer profile in customers table
    try {
      await db.customers.create(userId, name, email, phone ?? null, address ?? null);
    } catch (err) {
      console.error("[AuthService.register] Warning: Could not create customer record:", err);
    }

    // Also sync to farmers table for backwards compatibility
    try {
      const existingFarmer = await db.farmers.findByUserId(userId);
      if (!existingFarmer) {
        await db.farmers.create(userId, name, phone ?? null, email, null, address ?? null, null, null, new Date());
      }
    } catch (err) {
      console.error("[AuthService.register] Warning: Could not create farmer record:", err);
    }

    // Create a server-side session
    const { token } = await SessionManager.createSession(
      Number(user.id),
      user.email,
      user.name,
      user.role
    );

    return {
      userId,
      token,
      user: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async login(email: string, password: string) {
    console.log("[AuthService.login] email:", email);
    const user = await db.users.findByEmail(email);
    if (!user || !user.password_hash) {
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error("Invalid credentials");

    // Ensure customer entry exists for logged in user
    try {
      const cust = await db.customers.findByUserId(Number(user.id));
      if (!cust) {
        await db.customers.create(Number(user.id), user.name, user.email, null, null);
      }
    } catch (err) {
      // ignore
    }

    // Create a server-side session
    const { token } = await SessionManager.createSession(
      Number(user.id),
      user.email,
      user.name,
      user.role
    );

    return {
      user: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  /**
   * Logout - revoke the session server-side
   */
  static async logout(token: string): Promise<boolean> {
    const revoked = await SessionManager.revokeSession(token);
    if (revoked) {
      console.log("[AuthService.logout] Session revoked successfully");
    }
    return revoked;
  }
}
