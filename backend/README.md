# PHP REST API (Modular) - MySQL + Auth

This backend exposes RESTful JSON endpoints for a frontend application.

## Requirements
- PHP 8.1+
- MySQL 8+
- PDO MySQL extension enabled

## Configuration
1. Create `backend/.env` from `backend/.env.example`
2. Create the database and import schema:
   - `mysql -u <user> -p <db_name> < db/schema.sql`

## Run locally
From repo root:
```bash
php -S localhost:8000 -t backend/public
```

Your API base will be:
- `http://localhost:8000/api/...`

## Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Protected example CRUD
- `GET /api/users/me`
- `PATCH /api/users/me`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{id}`
- `PATCH /api/orders/{id}`
- `DELETE /api/orders/{id}`

## Auth usage (cookies)
Login sets an `HttpOnly` cookie named `SESSION_COOKIE_NAME`.

If your frontend calls via `fetch/axios`, ensure you send cookies:
- `credentials: 'include'`

## Manual test (curl)
```bash
# Register
curl -i -X POST http://localhost:8000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","password":"StrongPass123!"}'

# Login (stores cookie)
curl -i -X POST http://localhost:8000/api/auth/login \
  -c cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","password":"StrongPass123!"}'

# Get my profile (auth)
curl -i http://localhost:8000/api/users/me \
  -b cookies.txt

# Create an order (auth)
curl -i -X POST http://localhost:8000/api/orders \
  -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"product_name":"Maize seeds","quantity":2,"total_amount":1500}'
```

