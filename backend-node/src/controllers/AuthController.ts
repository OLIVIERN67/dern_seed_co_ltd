import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

import { z, ZodError } from "zod";

const SESSION_COOKIE_NAME = "dern_session";
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};


/** Convert a ZodError into a single human-readable message. */
function formatZodError(err: ZodError): string {
  return err.issues.map((issue) => {
    const field = issue.path.join(".");
    return field ? `${field}: ${issue.message}` : issue.message;
  }).join("; ");
}

const RegisterSchema = z.object({
  name: z.string().min(2).max(120).regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string().email().max(255),
  password: z
    .string()
    .min(8)
    .max(200)
    .refine((v) => /[A-Z]/.test(v), { message: "Password must include at least one uppercase letter" })
    .refine((v) => /[a-z]/.test(v), { message: "Password must include at least one lowercase letter" })
    .refine((v) => /\d/.test(v), { message: "Password must include at least one number" })
    .refine((v) => /[!@#$%^&*(),.?":{}|<>]/.test(v), { message: "Password must include at least one special character" }),
  phone: z.string().max(50).optional(),
  address: z.string().max(255).optional(),
});

const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(200),
});

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const parsed = RegisterSchema.parse(req.body ?? {});
      const out = await AuthService.register(parsed.name, parsed.email, parsed.password, parsed.phone, parsed.address);

      res.cookie(SESSION_COOKIE_NAME, out.token, SESSION_COOKIE_OPTIONS);

      res.status(201).json({ ok: true, user_id: out.userId, token: out.token, user: out.user });
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: formatZodError(e) });
        return;
      }
      const msg = e?.message ?? "Registration failed";
      const status = String(msg).toLowerCase().includes("already registered") ? 409 : 400;
      res.status(status).json({ error: msg });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const parsed = LoginSchema.parse(req.body ?? {});
      const out = await AuthService.login(parsed.email, parsed.password);

      res.cookie(SESSION_COOKIE_NAME, out.token, SESSION_COOKIE_OPTIONS);

      res.json({
        ok: true,
        token: out.token,
        user: {
          id: out.user.id,
          name: out.user.name,
          email: out.user.email,
          role: out.user.role,
        },
      });
    } catch (e: any) {
      console.error("[AuthController.login] ERROR:", e?.message || e);
      console.error("[AuthController.login] STACK:", e?.stack || "");
      // Use generic error message for security
      res.status(401).json({ error: "Invalid email or password" });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const token = req.cookies?.[SESSION_COOKIE_NAME] || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null);

      if (!token) {
        return res.status(401).json({ error: "No session token provided" });
      }
      const revoked = await AuthService.logout(token);

      res.clearCookie(SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS);

      if (revoked) {
        res.json({
          ok: true,
          message: "Logged out successfully",
        });
      } else {
        // Token was already invalid or expired
        res.json({
          ok: true,
          message: "Session already ended",
        });
      }
    } catch (e: any) {
      console.error("[AuthController.logout] ERROR:", e?.message || e);
      res.status(500).json({ error: "Logout failed" });
    }
  }
}


