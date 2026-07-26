const mysql = require("mysql2/promise");

(async () => {
  try {
    // Connect as root to fix the user
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
    });
    console.log("Connected as root");

    // Drop existing user if exists
    try {
      await c.execute("DROP USER IF EXISTS 'dernseed'@'localhost'");
      console.log("Dropped existing dernseed user");
    } catch (e) {
      console.log("No existing user to drop:", e.message);
    }

    // Use default root user - no need to create a separate user
    console.log("Using default root user (no password)");

    // No need to grant privileges since root already has them
    console.log("Root user already has all privileges");

    await c.execute("FLUSH PRIVILEGES");
    console.log("Flushed privileges");

    await c.end();
    console.log("\nDatabase user fixed successfully!");
  } catch (e) {
    console.error("Error:", e.message);
  }
})();
