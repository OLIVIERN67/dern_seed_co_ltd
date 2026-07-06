import type { Request, Response, NextFunction } from "express";
import { getEnv } from "../config/env";
import { db } from "../db";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export async function authSessionMiddleware(req: Request, _res: Response, next: NextFunction) {
  const cookieName = (getEnv("SESSION_COOKIE_NAME", "dern_session") ?? "dern_session") as string;
  const token = (req.cookies?.[cookieName] as string | undefined) ?? "";


  if (!token) return next();

  try {
    const userId = await db.sessions.getUserIdFromToken(token);
    if (userId) {
      req.user = { id: userId };
    }
  } catch (error) {
    // Best-effort: don't block non-auth routes.
    console.error("Session validation error:", error);
  }

  return next();
}


