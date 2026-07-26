// Check what environment variables the backend would use
const dotenv = require('dotenv');
const path = require('path');

// Load .env from backend-node directory
const envPath = path.join(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.log("Error loading .env:", result.error.message);
} else {
  console.log(".env loaded successfully");
}

console.log("\nEnvironment variables that would be used:");
console.log("DB_HOST:", process.env.DB_HOST || "NOT SET");
console.log("DB_PORT:", process.env.DB_PORT || "NOT SET");
console.log("DB_NAME:", process.env.DB_NAME || "NOT SET");
console.log("DB_USER:", process.env.DB_USER || "NOT SET");
console.log("DB_PASS:", process.env.DB_PASS ? "***SET***" : "NOT SET");
console.log("SESSION_COOKIE_NAME:", process.env.SESSION_COOKIE_NAME || "NOT SET");
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN || "NOT SET");
