const mysql = require("mysql2/promise");

(async () => {
  try {
    console.log("Testing connection with explicit empty string password...");
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "", // Explicit empty string
      database: "derneseedcoltd",
    });
    console.log("✓ Connection successful!");
    
    const [rows] = await c.execute("SELECT COUNT(*) AS count FROM users");
    console.log("✓ Users count:", rows[0].count);
    
    await c.end();
  } catch (e) {
    console.error("✗ Connection failed:", e.message);
  }
})();
