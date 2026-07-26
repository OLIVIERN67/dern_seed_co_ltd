const mysql = require("mysql2/promise");

(async () => {
  try {
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "derneseedcoltd",
    });

    const [users] = await c.execute("SELECT id, email, name, role, is_active FROM users");
    console.log("All users:");
    console.log(JSON.stringify(users, null, 2));

    // Test query with AND is_active = 1
    const [activeUsers] = await c.execute("SELECT id, email FROM users WHERE email = ? AND is_active = 1", ["admin@dernseed.com"]);
    console.log("\nActive user query result:", JSON.stringify(activeUsers));

    await c.end();
  } catch (e) {
    console.error("Error:", e.message);
  }
})();
