import bcrypt from "bcryptjs";
import { db } from "../db";
import { SessionManager } from "./SessionManager.js";

export class AuthService {
  static async register(name: string, email: string, password: string) {
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

    // Create a server-side session
    const { token, session } = await SessionManager.createSession(
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
    console.log("[AuthService.login] user found:", !!user);
    console.log(
      "[AuthService.login] user data:",
      user
        ? JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            hasHash: !!user.password_hash,
          })
        : "null"
    );
    if (!user || !user.password_hash) {
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    console.log("[AuthService.login] bcrypt compare:", ok);
    if (!ok) throw new Error("Invalid credentials");

    // Create a server-side session
    const { token, session } = await SessionManager.createSession(
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
