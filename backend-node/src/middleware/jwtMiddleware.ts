/**
 * @deprecated No longer used. Authentication now uses opaque, server-side
 * session tokens (see services/SessionManager.ts + middleware/sessionMiddleware.ts)
 * instead of JWTs. This file is kept only so that nothing breaks if some other
 * part of the codebase still imports it, and will be removed in a future cleanup.
 */
import type { Request, Response, NextFunction } from "express";
import { requireAuth as sessionRequireAuth } from "./sessionMiddleware.js";

export type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  // Delegate to the session-based guard so any lingering import keeps working.
  return sessionRequireAuth(req, res, next);
}
