const bcrypt = require("bcryptjs");
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
    const [rows] = await c.execute("SELECT id, name, email, role, password_hash FROM users WHERE email = ?", ["admin@dernseed.com"]);
    console.log("Found user:", rows.length > 0 ? "YES" : "NO");
    if (rows.length > 0) {
      const user = rows[0];
      console.log("User ID:", user.id);
      console.log("User name:", user.name);
      console.log("User role:", user.role);
      console.log("User email:", user.email);
      console.log("Password hash (first 30):", user.password_hash.substring(0, 30));
      const match = bcrypt.compareSync("Admin123!", user.password_hash);
      console.log("Password match:", match);
      
      // Also test the session creation
      const crypto = require("crypto");
      const token = crypto.createHash("sha256").update(crypto.randomBytes(32)).digest("hex");
      const expiresAt = new Date(Date.now() + 2592000 * 1000);
      console.log("Creating session for user:", user.id);
      console.log("Session token (first 20):", token.substring(0, 20));
      console.log("Expires at:", expiresAt.toISOString());
    }
    await c.end();
  } catch (e) {
    console.error("DB Error:", e.message);
  }
})();

