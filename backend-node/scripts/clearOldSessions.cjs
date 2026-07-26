// Clear all sessions to start fresh
const mysql = require("mysql2/promise");

(async () => {
  const c = await mysql.createConnection({
    host: "127.0.0.1", port: 3306, user: "root", password: "", database: "derneseedcoltd"
  });
  
  const [result] = await c.execute("DELETE FROM sessions");
  console.log(`Deleted ${result.affectedRows} sessions`);
  
  await c.end();
  console.log('Done. Sessions cleared.');
})();

