// dotenv must be configured first with override: true to beat any stale
// system/user environment variables that may interfere with the .env file.
// This is especially important on Windows where persistent user env vars
// (e.g. DB_PASS from a previous terminal) can leak into the process.
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env"), override: true });

// All server logic is loaded lazily so that dotenv.config() runs *before*
// any module that reads process.env (e.g. db/index.ts → config/env.ts).
const { createServer } = await import("./server.js");


const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = createServer();

app.listen(port, () => {
  console.log(`Node backend listening on http://localhost:${port}`);
});


