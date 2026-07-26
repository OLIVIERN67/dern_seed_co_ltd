const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

console.log("Current .env DB_PASS line:");
envContent.split('\n').forEach(line => {
  if (line.startsWith('DB_PASS')) {
    console.log(line);
  }
});

// Remove DB_PASS line entirely to use default empty string
envContent = envContent.replace(/DB_PASS=.*/, 'DB_PASS=');

fs.writeFileSync(envPath, envContent);
console.log("\nUpdated .env DB_PASS to empty string");
