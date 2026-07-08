import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Vite builds the frontend into `dist/` (see vite.config.ts `build.outDir`).
  // In production this file is bundled to `dist/index.js`, so static assets live
  // in the same directory (`__dirname`). In development they live in `../dist`.
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname)
      : path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all non-API routes.
  // API requests should be routed to the backend (backend-node) by a reverse
  // proxy such as Nginx in production. See DEPLOYMENT.md for details.
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      res.status(502).json({
        error:
          "API requests must be proxied to the backend service (backend-node). Check your reverse proxy configuration.",
      });
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
