import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { authSessionMiddleware } from "./middleware/authSessionMiddleware";
import { getEnv } from "./config/env";

export function createServer() {
  const app = express();

  // When deployed behind a reverse proxy (Nginx, load balancer, PaaS),
  // enable trust proxy so rate limiting and secure cookies see the real client IP/protocol.
  if (String(getEnv("TRUST_PROXY", "false")).toLowerCase() === "true") {
    app.set("trust proxy", 1);
  }

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    })
  );

  // Rate limiting (configurable via env; sensible defaults for production)
  const generalMax = Number(getEnv("RATE_LIMIT_MAX", "100"));
  const authMax = Number(getEnv("AUTH_RATE_LIMIT_MAX", "20"));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: Number.isFinite(generalMax) ? generalMax : 100,
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Stricter rate limiting for auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: Number.isFinite(authMax) ? authMax : 20,
    message: { error: "Too many authentication attempts, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/auth", authLimiter);

  // CORS configuration
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Cookie session lookup (best-effort)
  app.use(authSessionMiddleware);

  app.use(routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
