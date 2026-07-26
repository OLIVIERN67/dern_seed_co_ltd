import type { Request, Response, NextFunction } from "express";
import { SessionManager, type SessionData } from "../services/SessionManager.js";

/**
 * Extend Express Request type to include session data
 */
declare global {
  namespace Express {
    interface Request {
      sessionData?: SessionData;
      user?: {
        id: number;
        name: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Session validation middleware
 * Reads the Authorization: Bearer <token> header, validates the session,
 * attaches the decoded session data and user info to req.sessionData and req.user
 *
 * Usage: app.use(sessionMiddleware) or app.get('/protected', sessionMiddleware, handler)
 */
export async function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // No token provided - continue without authentication
    // Let requireAuth and requireAdmin middlewares handle the rejection
    return next();
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix

  if (!token) {
    return next();
  }

  try {
    // Validate the session token against the database
    const sessionData = await SessionManager.validateSession(token);

    if (!sessionData) {
      // Token invalid or expired — this is handled by requireAuth middleware
      return next();
    }

    // Attach session data to request
    req.sessionData = sessionData;

    // Also attach user info for backward compatibility with existing code
    req.user = {
      id: sessionData.userId,
      name: sessionData.name,
      email: sessionData.email,
      role: sessionData.role,
    };

    console.log(
      `[sessionMiddleware] Session authenticated for user ${sessionData.userId} (${sessionData.email})`
    );

    next();
  } catch (error) {
    console.error("[sessionMiddleware] Error validating session:", error);
    // Continue without authentication - let requireAuth handle it
    next();
  }
}

/**
 * Require authentication using sessions
 * This middleware validates the session and attaches user info to req.user
 * If no valid session exists, returns 401 Unauthorized
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // sessionMiddleware should have already run and populated req.user
  if (!req.user) {
    console.log("[requireAuth] No authenticated user in request");
    return res.status(401).json({
      error: "Unauthorized: Authentication required. Please log in.",
    });
  }

  console.log(
    `[requireAuth] Access granted to user ${req.user.id} (${req.user.email})`
  );
  next();
}

/**
 * Require admin role
 * Validates session and checks if user has admin role
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    console.log("[requireAdmin] No authenticated user in request");
    return res.status(401).json({
      error: "Unauthorized: Authentication required. Please log in.",
    });
  }

  if (req.user.role !== "admin") {
    console.log(
      `[requireAdmin] Access denied for user ${req.user.id} with role ${req.user.role}`
    );
    return res.status(403).json({
      error: "Forbidden: Admin access required.",
    });
  }

  console.log(
    `[requireAdmin] Admin access granted to user ${req.user.id} (${req.user.email})`
  );
  next();
}

/**
 * Require staff role (admin or employee)
 * Validates session and checks if user has staff access
 */
export function requireStaff(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    console.log("[requireStaff] No authenticated user in request");
    return res.status(401).json({
      error: "Unauthorized: Authentication required. Please log in.",
    });
  }

  const isStaff = req.user.role === "admin" || req.user.role === "employee";

  if (!isStaff) {
    console.log(
      `[requireStaff] Access denied for user ${req.user.id} with role ${req.user.role}`
    );
    return res.status(403).json({
      error: "Forbidden: Staff access required.",
    });
  }

  console.log(
    `[requireStaff] Staff access granted to user ${req.user.id} (${req.user.email})`
  );
  next();
}
