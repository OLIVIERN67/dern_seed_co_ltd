const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

console.log("Current .env DB settings:");
envContent.split('\n').forEach(line => {
  if (line.startsWith('DB_')) {
    console.log(line);
  }
});

// Update to use root credentials
envContent = envContent.replace(/DB_USER=.*/, 'DB_USER=root');
envContent = envContent.replace(/DB_PASS=.*/, 'DB_PASS=');

fs.writeFileSync(envPath, envContent);
console.log("\nUpdated .env to use root credentials");
console.log("DB_USER=root");
console.log("DB_PASS=");
