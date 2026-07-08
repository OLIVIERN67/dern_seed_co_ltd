// Utility: generate a bcrypt hash for the default admin password.
// Usage: node scripts/genAdminHash.cjs [password]
const bcrypt = require("bcryptjs");

const password = process.argv[2] || "Admin123!";
bcrypt
  .hash(password, 10)
  .then(async (hash) => {
    const ok = await bcrypt.compare(password, hash);
    console.log(hash);
    console.error("verify:", ok);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
