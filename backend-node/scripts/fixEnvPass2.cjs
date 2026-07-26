const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

console.log("Current DB_PASS line:");
envContent.split('\n').forEach(line => {
  if (line.startsWith('DB_PASS')) {
    console.log(line);
  }
});

// Fix the DB_PASS line - it has "OLIVIER123;" instead of being empty
envContent = envContent.replace(/DB_PASS=.*/, 'DB_PASS=');

fs.writeFileSync(envPath, envContent);
console.log("\nFixed DB_PASS to empty string");
