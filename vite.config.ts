import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env vars (VITE_*) from .env files in the project root.
  const env = loadEnv(mode, process.cwd(), "");

  // Backend API target for the dev proxy. Override with VITE_DEV_API_TARGET.
  const apiTarget = env.VITE_DEV_API_TARGET || "http://localhost:8000";

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve("client/src"),
        "@shared": path.resolve("shared"),
        "@assets": path.resolve("attached_assets"),
      },
    },

    // React app entry folder
    root: path.resolve("client"),

    // Vite loads .env files from the project root (not client/)
    envDir: path.resolve("."),

    // IMPORTANT: clean output folder
    build: {
      outDir: path.resolve("dist"),
      emptyOutDir: true,
    },

    server: {
      port: 3000,
      host: true,
      strictPort: false,
      // Development proxy: forward /api requests to the Node backend (port 8000).
      // This lets the frontend use relative URLs (e.g. fetch('/api/auth/login'))
      // in development without CORS issues, matching production behavior where
      // a reverse proxy routes /api to the backend.
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
