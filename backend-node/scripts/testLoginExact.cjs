const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

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

    // This is exactly what userRepository.findByEmail does:
    const [rows] = await pool.execute(
      `SELECT id, name, email, password_hash, role, is_active
       FROM users
       WHERE email = ? AND is_active = 1
       LIMIT 1`,
      ["admin@dernseed.com"]
    );
    
    const r = Array.isArray(rows) ? rows[0] : undefined;
    console.log("Row found:", !!r);
    if (r) {
      console.log("User keys:", Object.keys(r));
      
      // Check the column naming
      console.log("password_hash field:", r.password_hash ? "present (length: " + r.password_hash.length + ")" : "MISSING!");
      console.log("password_hash (first 30):", r.password_hash ? r.password_hash.substring(0, 30) : "N/A");
      
      const ok = await bcrypt.compare("Admin123!", r.password_hash);
      console.log("bcrypt.compare result:", ok);
    }

    await pool.end();
  } catch (e) {
    console.error("Error:", e.message);
    console.error(e.stack);
  }
})();

