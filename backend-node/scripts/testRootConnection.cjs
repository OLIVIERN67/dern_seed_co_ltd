const mysql = require("mysql2/promise");

(async () => {
  try {
    console.log("Testing root connection with empty password...");
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
    });
    console.log("✓ Root connection successful!");
    
    await c.end();
  } catch (e) {
    console.error("✗ Root connection failed:", e.message);
  }
})();
