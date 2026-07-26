import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { getEnv } from "../config/env.js";

export type SessionData = {
  /** The raw JWT bearer token */
  token: string;
  userId: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  lastSeenAt: Date | null;
};

/**
 * SessionManager implements stateless, secure JWT-based session management.
 *
 * Sessions are NOT stored in the database (`sessions` table is not used).
 * - Tokens are signed using HMAC-SHA256 with JWT_SECRET / SESSION_SECRET.
 * - On each request, the JWT signature and expiration are verified statelessly.
 * - The user's active status and role are verified against the `users` table.
 */
export class SessionManager {
  private static getSecret(): string {
    return (
      getEnv("JWT_SECRET") ||
      getEnv("SESSION_SECRET") ||
      "dev-only-insecure-default-session-secret-change-me"
    ) as string;
  }

  /**
   * Create a new stateless JWT session for a user after successful login/register.
   */
  static async createSession(
    userId: number,
    email: string,
    name: string,
    role: string
  ): Promise<{ token: string; session: SessionData }> {
    const secret = this.getSecret();
    const sessionDurationHours = Number(getEnv("SESSION_DURATION_HOURS", "24")) || 24;
    const expiresAt = new Date(Date.now() + sessionDurationHours * 60 * 60 * 1000);
    const createdAt = new Date();

    const payload = {
      userId,
      email,
      name,
      role,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: `${sessionDurationHours}h`,
    });

    console.log(
      `[SessionManager] Stateless JWT session created for user ${userId} (${email}), role: ${role}`
    );

    return {
      token,
      session: {
        token,
        userId,
        email,
        name,
        role,
        isActive: true,
        expiresAt,
        createdAt,
        lastSeenAt: null,
      },
    };
  }

  /**
   * Validate a bearer JWT token statelessly.
   * Returns null if token is missing, invalid signature, expired, or user is deactivated.
   */
  static async validateSession(token: string): Promise<SessionData | null> {
    if (!token) return null;

    try {
      const secret = this.getSecret();
      const decoded = jwt.verify(token, secret) as {
        userId: number;
        email: string;
        name: string;
        role: string;
        iat?: number;
        exp?: number;
      };

      if (!decoded || !decoded.userId) {
        return null;
      }

      // Verify user exists and is active in the database
      const user = await db.users.findById(decoded.userId);
      if (!user) {
        console.log(`[SessionManager] User ${decoded.userId} not found in DB`);
        return null;
      }

      if (!user.is_active) {
        console.log(`[SessionManager] User ${decoded.userId} account is deactivated`);
        return null;
      }

      const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date();
      const createdAt = decoded.iat ? new Date(decoded.iat * 1000) : new Date();

      return {
        token,
        userId: Number(user.id),
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: !!user.is_active,
        expiresAt,
        createdAt,
        lastSeenAt: null,
      };
    } catch (error: any) {
      console.log("[SessionManager] JWT validation failed:", error?.message || error);
      return null;
    }
  }

  /**
   * Revoke session (logout). Stateless JWTs expire automatically.
   */
  static async revokeSession(_token: string): Promise<boolean> {
    console.log("[SessionManager] Logout processed (stateless JWT)");
    return true;
  }

  /**
   * Revoke all user sessions. With stateless JWTs, account deactivation in DB
   * immediately prevents any active JWT from passing validateSession.
   */
  static async revokeAllUserSessions(_userId: number): Promise<number> {
    console.log(`[SessionManager] Stateless token revocation check active for user ${_userId}`);
    return 0;
  }

  /** Hard-delete expired sessions (No-op since no sessions stored in DB). */
  static async cleanupExpiredSessions(): Promise<number> {
    return 0;
  }

  /** List active sessions for a user (No-op since sessions are stateless). */
  static async getUserSessions(_userId: number): Promise<Array<Omit<SessionData, "token">>> {
    return [];
  }
}

