const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

const correctEnvContent = `# DERN SEED Backend — Environment Variables
# Copy this file to .env and fill in the values for your environment.

# App
APP_ENV=development
APP_URL=http://localhost:8000
PORT=8000

# CORS: comma-separated list of allowed frontend origins
# Development: http://localhost:3000 (Vite dev server)
# Production:  your deployed frontend URL, e.g. https://www.dernseed.com
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Set to true when running behind a reverse proxy (Nginx, load balancer, PaaS)
TRUST_PROXY=false

# Database (MariaDB/MySQL)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=derneseedcoltd
DB_USER=root
DB_PASS=
DB_CHARSET=utf8mb4

# Sessions
# Generate a strong secret: openssl rand -hex 32
SESSION_SECRET=bd68d948a8bc73fc5b0f946afc6e6e54b19a5dfc31145a957ee9940ee7bb7d3f
SESSION_TTL=2592000
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_NAME=dern_session

# Rate limiting (requests per 15 minutes)
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=20

# Email (optional)
COMPANY_INBOX_EMAIL=info@dernseed.com
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=no-reply@dernseed.com
`;

fs.writeFileSync(envPath, correctEnvContent);
console.log("Recreated .env file with correct formatting");
