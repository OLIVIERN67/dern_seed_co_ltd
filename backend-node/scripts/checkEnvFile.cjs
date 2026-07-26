const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

console.log("Actual .env file content:");
console.log("---");
console.log(envContent);
console.log("---");
