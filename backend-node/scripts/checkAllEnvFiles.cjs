const fs = require('fs');
const path = require('path');

// Check for .env files in various locations
const locations = [
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', '..', '.env'),
  path.join(__dirname, '.env'),
];

console.log("Checking for .env files:");
locations.forEach(loc => {
  try {
    if (fs.existsSync(loc)) {
      console.log(`✓ Found: ${loc}`);
      const content = fs.readFileSync(loc, 'utf8');
      const dbPassLine = content.split('\n').find(line => line.startsWith('DB_PASS'));
      console.log(`  DB_PASS line: ${dbPassLine || 'NOT FOUND'}`);
    } else {
      console.log(`✗ Not found: ${loc}`);
    }
  } catch (e) {
    console.log(`✗ Error checking ${loc}: ${e.message}`);
  }
});
