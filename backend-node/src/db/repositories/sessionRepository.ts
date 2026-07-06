import type { Pool } from "mysql2/promise";

export function createSessionRepository(pool: Pool) {
  return {
    async createSession(userId: number, tokenHash: string, expiresAt: Date) {
      const [result]: any = await pool.execute(
        `INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)`,
        [userId, tokenHash, expiresAt]
      );
      return {
        id: Number(result.insertId),
      };
    },

    async getUserIdFromToken(tokenHash: string) {
      const [rows] = await pool.execute(
        `SELECT user_id, expires_at, revoked_at
         FROM sessions
         WHERE session_token = ?
         LIMIT 1`,
        [tokenHash]
      );

      const row = Array.isArray(rows) ? (rows as any[])[0] : undefined;
      if (!row) return null;

      if (row.revoked_at) return null;
      const expiresAt = new Date(row.expires_at);
      if (expiresAt.getTime() < Date.now()) return null;

      await pool.execute(
        `UPDATE sessions SET last_seen_at = CURRENT_TIMESTAMP WHERE session_token = ?`,
        [tokenHash]
      );

      return Number(row.user_id);
    },

    async revokeSession(tokenHash: string) {
      await pool.execute(
        `UPDATE sessions SET revoked_at = CURRENT_TIMESTAMP WHERE session_token = ?`,
        [tokenHash]
      );
    },
  };
}

