import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import crypto from "crypto";

import { db } from "../db";
import { requireEnv, getEnv } from "../config/env";

function sessionCookieSecure(): boolean {
  const v = getEnv("SESSION_COOKIE_SECURE", "false");
  return String(v).toLowerCase() === "true";
}

function sessionTTLSeconds(): number {
  const v = Number(getEnv("SESSION_TTL", "2592000"));
  return Number.isFinite(v) ? v : 2592000;
}

function sessionCookieName(): string {
  return getEnv("SESSION_COOKIE_NAME", "dern_session")!;
}

function makeToken(): string {
  // token stored in cookie; DB stores hash for safety (similar idea).
  // But current PHP uses token directly as sha256 hexdig (64 chars). We'll do same:
  // token = sha256(hex(randomBytes))
  return crypto.createHash("sha256").update(crypto.randomBytes(32)).digest("hex");
}

function tokenHashForDb(token: string) {
  // PHP stores the token itself (hash hex). We'll store the same string.
  return token;
}

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existing = await db.users.findByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await db.users.create(name, email, passwordHash);

    const sessionToken = makeToken();
    const expiresAt = new Date(Date.now() + sessionTTLSeconds() * 1000);

    await db.sessions.createSession(userId, tokenHashForDb(sessionToken), expiresAt);

    return {
      userId,
      sessionToken,
      expiresAtTs: Math.floor(expiresAt.getTime() / 1000),
      cookieName: sessionCookieName(),
      cookieSecure: sessionCookieSecure(),
    };
  }

  static async login(email: string, password: string) {
    const user = await db.users.findByEmail(email);
    if (!user || !user.password_hash) {
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error("Invalid credentials");

    const sessionToken = makeToken();
    const expiresAt = new Date(Date.now() + sessionTTLSeconds() * 1000);

    await db.sessions.createSession(Number(user.id), tokenHashForDb(sessionToken), expiresAt);

    return {
      user: {
        id: Number(user.id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      sessionToken,
      expiresAtTs: Math.floor(expiresAt.getTime() / 1000),
      cookieName: sessionCookieName(),
      cookieSecure: sessionCookieSecure(),
    };
  }

  static async logout(sessionToken: string) {
    await db.sessions.revokeSession(tokenHashForDb(sessionToken));
  }
}

