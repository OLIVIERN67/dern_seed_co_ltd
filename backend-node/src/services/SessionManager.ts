import { nanoid } from "nanoid";
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
  private static readonly sessionDurationMinutes = Number(getEnv("SESSION_DURATION_MINUTES", "40")) || 40;

  /**
   * Create a new server-side session for a user after successful login/register.
   */
  static async createSession(
    userId: number,
    email: string,
    name: string,
    role: string
  ): Promise<{ token: string; session: SessionData }> {
    const token = nanoid(48);
    const expiresAt = new Date(Date.now() + this.sessionDurationMinutes * 60 * 1000);
    const createdAt = new Date();

    await db.query(
      `INSERT INTO sessions (user_id, session_token, expires_at, created_at, last_seen_at, revoked_at)
       VALUES (?, ?, ?, ?, ?, NULL)`,
      [userId, token, expiresAt, createdAt, createdAt]
    );

    console.log(
      `[SessionManager] Session created for user ${userId} (${email}), role: ${role}`
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
   * Validate a session token against the database.
   * Returns null if token is missing, revoked, expired, or user is deactivated.
   */
  static async validateSession(token: string): Promise<SessionData | null> {
    if (!token) return null;

    try {
      const [rows]: any = await db.pool.execute(
        `SELECT s.id AS session_id, s.user_id, s.session_token, s.expires_at, s.created_at, s.last_seen_at, s.revoked_at,
                u.email, u.name, u.role, u.is_active
         FROM sessions s
         INNER JOIN users u ON u.id = s.user_id
         WHERE s.session_token = ?
         LIMIT 1`,
        [token]
      );

      const row = Array.isArray(rows) ? rows[0] : null;
      if (!row) {
        return null;
      }

      const now = Date.now();
      const expiresAt = new Date(row.expires_at);

      if (row.revoked_at) {
        return null;
      }

      if (!row.is_active) {
        console.log(`[SessionManager] User ${row.user_id} account is deactivated`);
        return null;
      }

      if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= now) {
        await this.revokeSession(token);
        return null;
      }

      const refreshedExpiresAt = new Date(now + this.sessionDurationMinutes * 60 * 1000);
      await db.query(
        `UPDATE sessions
         SET last_seen_at = ?, expires_at = ?
         WHERE session_token = ?`,
        [new Date(now), refreshedExpiresAt, token]
      );

      return {
        token,
        userId: Number(row.user_id),
        email: row.email,
        name: row.name,
        role: row.role,
        isActive: !!row.is_active,
        expiresAt: refreshedExpiresAt,
        createdAt: new Date(row.created_at),
        lastSeenAt: new Date(now),
      };
    } catch (error: any) {
      console.log("[SessionManager] Session validation failed:", error?.message || error);
      return null;
    }
  }

  /**
   * Revoke session (logout).
   */
  static async revokeSession(token: string): Promise<boolean> {
    if (!token) return false;

    await db.query(
      `UPDATE sessions
       SET revoked_at = COALESCE(revoked_at, NOW())
       WHERE session_token = ?`,
      [token]
    );

    console.log("[SessionManager] Logout processed");
    return true;
  }

  /**
   * Revoke all user sessions.
   */
  static async revokeAllUserSessions(userId: number): Promise<number> {
    const [result]: any = await db.pool.execute(
      `UPDATE sessions
       SET revoked_at = COALESCE(revoked_at, NOW())
       WHERE user_id = ? AND revoked_at IS NULL`,
      [userId]
    );
    console.log(`[SessionManager] Revoked sessions for user ${userId}`);
    return Number(result.affectedRows ?? 0);
  }

  /** Hard-delete expired sessions. */
  static async cleanupExpiredSessions(): Promise<number> {
    const [result]: any = await db.pool.execute(
      `DELETE FROM sessions
       WHERE revoked_at IS NOT NULL OR expires_at < NOW() - INTERVAL 1 DAY`
    );
    return Number(result.affectedRows ?? 0);
  }

  /** List active sessions for a user. */
  static async getUserSessions(userId: number): Promise<Array<Omit<SessionData, "token">>> {
    const [rows]: any = await db.pool.execute(
      `SELECT s.user_id, u.email, u.name, u.role, u.is_active, s.expires_at, s.created_at, s.last_seen_at
       FROM sessions s
       INNER JOIN users u ON u.id = s.user_id
       WHERE s.user_id = ? AND s.revoked_at IS NULL AND s.expires_at > NOW()
       ORDER BY s.created_at DESC`,
      [userId]
    );

    return (Array.isArray(rows) ? rows : []).map((row: any) => ({
      userId: Number(row.user_id),
      email: row.email,
      name: row.name,
      role: row.role,
      isActive: !!row.is_active,
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
      lastSeenAt: row.last_seen_at ? new Date(row.last_seen_at) : null,
    }));
  }
}

