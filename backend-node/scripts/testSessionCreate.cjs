const mysql = require("mysql2/promise");

(async () => {
  try {
    const pool = mysql.createPool({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "derneseedcoltd",
      charset: "utf8mb4",
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });

    // Test session creation
    const crypto = require("crypto");
    const token = crypto.createHash("sha256").update(crypto.randomBytes(32)).digest("hex");
    const expiresAt = new Date(Date.now() + 2592000 * 1000);
    
    console.log("Attempting session insert...");
    const [result] = await pool.execute(
      `INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)`,
      [1, token, expiresAt]
    );
    console.log("Session created:", result.insertId);

    // Clean up test session
    await pool.execute(`DELETE FROM sessions WHERE id = ?`, [result.insertId]);
    console.log("Test session cleaned up");

    await pool.end();
  } catch (e) {
    console.error("Error:", e.message);
    console.error(e.stack);
  }
})();

