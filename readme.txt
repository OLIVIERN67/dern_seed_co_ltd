=====================================================================
 DERN SEED CO LTD - FULL-STACK WEB APPLICATION
 readme.txt - Setup, Database Structure, and Run Instructions
=====================================================================

PROJECT STRUCTURE
-----------------
  client/          -> React 19 + TypeScript + Vite + Tailwind frontend
  backend-node/    -> Node.js + Express + TypeScript + MariaDB backend
  server/          -> Optional static file server for the built frontend
  dist/            -> Production build of the frontend
  .github/         -> CI/CD workflow (full-stack deployment)
  DEPLOYMENT.md    -> Full production deployment guide
  TODO.md          -> Completed and deferred tasks

REQUIREMENTS
------------
  - Node.js 20+ (npm or pnpm)
  - MariaDB (default properties, port 3306)

=====================================================================
 1. DATABASE CREATION (MariaDB)
=====================================================================

Step 1 - Create the database and a dedicated user:

  sudo mariadb
    CREATE DATABASE IF NOT EXISTS derneseedcoltd
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER IF NOT EXISTS 'dernseed'@'localhost' IDENTIFIED BY 'dernseed123';
    GRANT ALL PRIVILEGES ON derneseedcoltd.* TO 'dernseed'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;

Step 2 - Load the schema (creates all tables + default admin + sample
testimonials; the script is idempotent and safe to re-run):

  mysql -u dernseed -pdernseed123 derneseedcoltd < backend-node/src/db/schema.sql

DATABASE STRUCTURE (tables created by schema.sql)
-------------------------------------------------
  users         : id (PK, AUTO_INCREMENT), name, email (UNIQUE),
                  password_hash (bcrypt), role ('admin'|'user'),
                  is_active, created_at, updated_at
  sessions      : id (PK), user_id (FK -> users.id), token_hash (UNIQUE),
                  expires_at, created_at
  products      : id (PK), name, category, description, price,
                  stock_quantity, image_url, is_active,
                  created_at, updated_at
  seeds         : id (PK), name, variety, crop_type, germination_rate,
                  price_per_kg, stock_kg, description, is_certified,
                  created_at, updated_at
  farmers       : id (PK), user_id (FK -> users.id), farm_name, district,
                  sector, farm_size_hectares, phone, created_at, updated_at
  employees     : id (PK), user_id (FK -> users.id), position, department,
                  hire_date, salary, phone, created_at, updated_at
  orders        : id (PK), user_id (FK -> users.id), status, total_amount,
                  shipping_address, phone, notes, created_at, updated_at
  testimonials  : id (PK), name, role, rating (1-5), message, initials,
                  is_approved, created_at, updated_at

DEFAULT ADMINISTRATOR ACCOUNT
-----------------------------
  Email    : admin@dernseed.com
  Password : Admin123!
  (!) Change this password immediately after the first login
      in a production environment.

=====================================================================
 2. RUNNING THE APPLICATION (development)
=====================================================================

Terminal 1 - Backend (port 8000):
  cd backend-node
  npm install
  npm run dev

Terminal 2 - Frontend (port 3000, /api is auto-proxied to :8000):
  npm install
  npm run dev

Open http://localhost:3000 and log in with the default admin account.

=====================================================================
 3. PRODUCTION BUILD
=====================================================================

Frontend:  npm run build          -> output in dist/
Backend :  cd backend-node && npm run build   -> output in backend-node/dist/
Start   :  cd backend-node && npm start       (or PM2, see DEPLOYMENT.md)

ENVIRONMENT VARIABLES
---------------------
  Frontend: copy .env.example to .env
    VITE_API_BASE_URL      - backend URL in production (empty = same origin)
    VITE_GA_MEASUREMENT_ID - Google Analytics 4 ID (optional)
    VITE_WHATSAPP_NUMBER   - WhatsApp number, digits only

  Backend: copy backend-node/.env.example to backend-node/.env
    DB_HOST / DB_PORT / DB_NAME / DB_USER / DB_PASS - database connection
    SESSION_SECRET  - long random secret (openssl rand -hex 32)
    CORS_ORIGIN     - allowed frontend origin(s)
    See backend-node/.env.example for the complete list.

=====================================================================
 4. KEY API ENDPOINTS
=====================================================================
  GET  /api/health              - health check
  POST /api/auth/register       - create an account
  POST /api/auth/login          - log in (sets httpOnly session cookie)
  POST /api/auth/logout         - log out
  GET  /api/users/me            - current authenticated user
  GET  /api/testimonials        - approved testimonials (public)
  ...  /api/products, /api/seeds, /api/orders, /api/farmers,
       /api/employees           - full CRUD (authentication required
                                  for write operations)

For complete deployment instructions (Nginx, PM2, CI/CD secrets),
see DEPLOYMENT.md.
=====================================================================
