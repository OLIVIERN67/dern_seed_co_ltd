// Check what SESSION_TTL is set to
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

console.log('=== .env SESSION_TTL check ===');
console.log('SESSION_TTL value:', process.env.SESSION_TTL);
console.log('SESSION_COOKIE_NAME:', process.env.SESSION_COOKIE_NAME);
console.log('Type of SESSION_TTL:', typeof process.env.SESSION_TTL);

// Simulate the same logic as AuthService.sessionTTLSeconds
const v = Number(process.env.SESSION_TTL || '2592000');
console.log('Parsed number:', v);
console.log('Number.isFinite:', Number.isFinite(v));
const ttl = Number.isFinite(v) ? v : 2592000;
console.log('Final TTL seconds:', ttl);
console.log('Final TTL display:', ttl === 2592000 ? '30 days (default)' : `${ttl} seconds (${ttl/86400} days)`);

// Read raw file to see actual text
const fs = require('fs');
const raw = fs.readFileSync(envPath, 'utf8');
const lines = raw.split('\n');
console.log('\n=== Raw .env lines containing SESSION or TTL ===');
lines.forEach((line, i) => {
  if (line.toUpperCase().includes('SESSION') || line.toUpperCase().includes('TTL')) {
    console.log(`Line ${i+1}: ${line}`);
  }
});

