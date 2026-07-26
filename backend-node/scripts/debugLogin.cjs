const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

(async () => {
  try {
    // Connect with default root credentials
    const c = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "derneseedcoltd",
    });
    console.log("Database connection successful");

    const [rows] = await c.execute(
      "SELECT id, name, email, role, password_hash, is_active FROM users WHERE email = ?",
      ["admin@dernseed.com"]
    );
    
    console.log("Found user:", rows.length > 0 ? "YES" : "NO");
    if (rows.length > 0) {
      const user = rows[0];
      console.log("User details:");
      console.log("- ID:", user.id);
      console.log("- Name:", user.name);
      console.log("- Email:", user.email);
      console.log("- Role:", user.role);
      console.log("- Active:", user.is_active);
      console.log("- Password hash:", user.password_hash);
      
      const match = bcrypt.compareSync("Admin123!", user.password_hash);
      console.log("- Password match:", match);
      
      if (!match) {
        console.log("\nTrying to re-hash the password to see if hash matches:");
        const newHash = bcrypt.hashSync("Admin123!", 10);
        console.log("- New hash:", newHash);
        console.log("- Hashes match:", newHash === user.password_hash);
      }
    }
    await c.end();
  } catch (e) {
    console.error("Error:", e.message);
  }
})();
