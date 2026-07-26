const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    // Connect without database first
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
    });

    // Create database
    await c.execute(
      "CREATE DATABASE IF NOT EXISTS derneseedcoltd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    console.log("Database created/confirmed");

    // Use the database
    await c.changeUser({ database: "derneseedcoltd" });

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, "..", "src", "db", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Split by semicolons and execute each statement
    const statements = schema
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      try {
        await c.execute(stmt);
      } catch (err) {
        // Ignore duplicate key errors for the admin insert
        if (
          err.errno !== 1062 &&
          !err.message.includes("Duplicate entry")
        ) {
          console.warn("Statement warning:", err.message.substring(0, 100));
        }
      }
    }

    console.log("Schema loaded successfully");
    await c.end();
    console.log("Database setup complete!");
  } catch (e) {
    console.error("Error:", e.message);
  }
})();

