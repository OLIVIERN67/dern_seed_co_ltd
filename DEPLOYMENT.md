# DERN SEED CO LTD — Full-Stack Deployment Guide

This document explains how to deploy the complete application: the **React frontend**, the **Node.js/Express backend**, and the **MariaDB/MySQL database**, and how to make them communicate correctly in production.

## Architecture Overview

```
                        ┌─────────────────────────────┐
  Browser ──────────────►  Frontend (static files)     │
     │                  │  dist/ — served by web host  │
     │                  └─────────────────────────────┘
     │  /api/* requests
     ▼
┌─────────────────────────────┐      ┌──────────────────────┐
│ Backend (backend-node)      │─────►│ MariaDB / MySQL      │
│ Node.js + Express, port 8000│      │ database:            │
│ PM2 process manager         │      │ derneseedcoltd       │
└─────────────────────────────┘      └──────────────────────┘
```

There are two supported production topologies:

| Topology | Frontend | Backend | `VITE_API_BASE_URL` |
|----------|----------|---------|----------------------|
| **A. Same origin (recommended)** | Served by Nginx | Proxied by Nginx under `/api` | leave **empty** |
| **B. Separate origins** | Shared hosting (FTP) | VPS/PaaS, e.g. `https://api.dernseed.com` | set to backend URL |

## 1. Environment Variables

### Frontend (`.env.production` at repo root, or CI variables)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend origin. Empty when same-origin (topology A). | `https://api.dernseed.com` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 ID (optional). | `G-XXXXXXXXXX` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number, digits only. | `250782724840` |

### Backend (`backend-node/.env` on the server — never commit real values)

See `backend-node/.env.example` for the full list. Critical production values:

```
APP_ENV=production
PORT=8000
CORS_ORIGIN=https://www.dernseed.com          # your frontend origin(s)
TRUST_PROXY=true                              # behind Nginx / load balancer
DB_HOST=127.0.0.1
DB_NAME=derneseedcoltd
DB_USER=dernseed                              # dedicated user, NOT root
DB_PASS=<strong-password>
SESSION_SECRET=<openssl rand -hex 32>
SESSION_COOKIE_SECURE=true                    # requires HTTPS
```

## 2. Database Setup (MariaDB)

```bash
sudo mariadb <<'SQL'
CREATE DATABASE IF NOT EXISTS derneseedcoltd
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'dernseed'@'localhost' IDENTIFIED BY '<strong-password>';
GRANT ALL PRIVILEGES ON derneseedcoltd.* TO 'dernseed'@'localhost';
FLUSH PRIVILEGES;
SQL

# Load schema (idempotent — safe to re-run)
mysql -u dernseed -p derneseedcoltd < backend-node/src/db/schema.sql
```

The schema creates all tables (`users`, `sessions`, `orders`, `products`, `seeds`, `farmers`, `employees`, `testimonials`) and a **default administrator**:

> **Email:** `admin@dernseed.com`  •  **Password:** `Admin123!`
>
> **Change this password immediately after the first login in production.**

## 3. Backend Deployment (VPS with PM2)

```bash
# On the server (Ubuntu example)
sudo apt install -y nodejs npm mariadb-server
sudo npm install -g pm2

cd /var/www/dernseed-backend
# copy backend-node contents here (CI does this automatically via SSH)
cp .env.example .env && nano .env      # fill in production values
npm install --omit=dev
npm run build                           # if deploying source; CI ships dist/ prebuilt
pm2 start dist/index.js --name dern-seed-backend
pm2 save && pm2 startup
```

Health check: `curl http://localhost:8000/api/health`

## 4. Frontend Deployment

```bash
# Build with production env
VITE_API_BASE_URL=https://api.dernseed.com npm run build
# Upload dist/ to your web host (the CI workflow does this via FTP)
```

## 5. Nginx Reverse Proxy (Topology A — recommended)

```nginx
server {
    listen 443 ssl;
    server_name www.dernseed.com;

    # ssl_certificate ...; ssl_certificate_key ...;

    root /var/www/dernseed-frontend;    # contents of dist/
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API -> Node backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

With this setup the frontend uses relative `/api/...` URLs, cookies work first-party, and `VITE_API_BASE_URL` stays empty.

## 6. CI/CD (GitHub Actions)

The workflow `.github/workflows/deploy.yml` runs on every push to `main`:

1. **verify** — type-checks and builds both frontend and backend; uploads artifacts.
2. **deploy-frontend** — uploads `dist/` to your FTP host.
3. **deploy-backend** — copies the backend build to your VPS over SSH, installs production dependencies, applies the database schema, and restarts the PM2 process. *Skipped automatically when SSH secrets are not configured.*

### Required GitHub configuration

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

| Secret | Purpose |
|--------|---------|
| `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` | Frontend FTP deployment |
| `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `BACKEND_DIR` | Backend SSH deployment (optional) |
| `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` | Schema migration during deploy (optional) |

**Variables** (Settings → Secrets and variables → Actions → Variables):

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | Backend origin baked into the frontend build |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 ID |
| `VITE_WHATSAPP_NUMBER` | WhatsApp contact number |

## 7. Local Development

```bash
# Terminal 1 — database (once)
sudo mariadb < backend-node/src/db/schema.sql   # after creating DB + user (see §2)

# Terminal 2 — backend on :8000
cd backend-node && npm install && npm run dev

# Terminal 3 — frontend on :3000 (proxies /api -> :8000 automatically)
npm install && npm run dev
```

Open http://localhost:3000 and log in with `admin@dernseed.com` / `Admin123!`.

## 8. Post-Deployment Checklist

- [ ] `GET /api/health` returns `{ "ok": true }`
- [ ] Login works with the default admin, then **change the admin password**
- [ ] `SESSION_COOKIE_SECURE=true` and HTTPS enabled
- [ ] `CORS_ORIGIN` matches the exact frontend origin
- [ ] `TRUST_PROXY=true` when behind Nginx/load balancer
- [ ] Analytics events visible in GA4 real-time view (if configured)
- [ ] WhatsApp button opens a chat with the correct number
