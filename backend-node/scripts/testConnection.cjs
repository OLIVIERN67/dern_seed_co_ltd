const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const path = require('path');

// Load .env from backend-node directory
const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

console.log("Testing connection with .env credentials:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "***" : "NOT SET");
console.log("DB_NAME:", process.env.DB_NAME);

(async () => {
  try {
    const c = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("✓ Connection successful!");
    
    const [rows] = await c.execute("SELECT 1 AS test");
    console.log("✓ Query successful:", rows[0]);
    
    await c.end();
  } catch (e) {
    console.error("✗ Connection failed:", e.message);
  }
})();
