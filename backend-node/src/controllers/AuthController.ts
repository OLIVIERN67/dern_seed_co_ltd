import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

import { z, ZodError } from "zod";
import { getEnv } from "../config/env.js";


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
});

const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(200),
});

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const parsed = RegisterSchema.parse(req.body ?? {});
      const out = await AuthService.register(parsed.name, parsed.email, parsed.password);

      res.cookie(out.cookieName, out.sessionToken, {
        httpOnly: true,
        secure: out.cookieSecure,
        sameSite: "strict",
        expires: new Date(out.expiresAtTs * 1000),
        path: "/",
      });

      res.status(201).json({ ok: true, user_id: out.userId });
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

      res.cookie(out.cookieName, out.sessionToken, {
        httpOnly: true,
        secure: out.cookieSecure,
        sameSite: "strict",
        expires: new Date(out.expiresAtTs * 1000),
        path: "/",
      });

      res.json({
        ok: true,
        user: {
          id: out.user.id,
          name: out.user.name,
          email: out.user.email,
          role: out.user.role,
        },
      });
    } catch (e: any) {
      // Use generic error message for security
      res.status(401).json({ error: "Invalid email or password" });
    }
  }

  static async logout(req: Request, res: Response) {
    const cookieName = (getEnv("SESSION_COOKIE_NAME", "dern_session") ?? "dern_session") as string;
    const token = (req.cookies?.[cookieName] as string | undefined) ?? "";


    if (token) {
      await AuthService.logout(token);
    }

    const cookieSecure = (getEnv("SESSION_COOKIE_SECURE", "false") ?? "false") === "true";
    res.cookie(cookieName, "", {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: "strict",
      expires: new Date(Date.now() - 3600 * 1000),
      path: "/",
    });

    res.json({ ok: true });
  }
}


