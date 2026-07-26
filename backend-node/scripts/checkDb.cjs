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

    // Check users table
    const [users] = await c.execute("SELECT id, name, email, role, LEFT(password_hash, 30) AS pw_prefix FROM users");
    console.log("Users in database:");
    console.log(JSON.stringify(users, null, 2));

    // Check if tables exist
    const [tables] = await c.execute("SHOW TABLES");
    console.log("\nTables:");
    console.log(JSON.stringify(tables, null, 2));

    // Check sessions
    const [sessions] = await c.execute("SELECT COUNT(*) AS cnt FROM sessions");
    console.log("\nSessions count:", sessions[0].cnt);

    await c.end();
  } catch (e) {
    console.error("Error:", e.message);
  }
})();

