import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
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

  // IMPORTANT: clean output folder
  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    host: true,
    strictPort: false,
  },
});