import type { Request, Response, NextFunction } from "express";

import { requireAuth } from "./requireAuth";

/**
 * Minimal admin guard.
 *
 * NOTE: The current backend session middleware only attaches { id } to req.
 * For admin checks we must query the user/role.
 */
import { db } from "../db";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // Ensure session exists
  requireAuth(req, res, () => {
    if (!req.user) return;

    db.users
      .findById(req.user.id)
      .then((u) => {
        if (!u || u.role !== "admin") {
          res.status(403).json({ error: "Forbidden" });
          return;
        }
        next();
      })
      .catch(() => {
        res.status(500).json({ error: "Failed to authorize" });
      });
  });
}

