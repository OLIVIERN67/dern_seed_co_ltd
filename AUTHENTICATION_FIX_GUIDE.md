# Authentication System Fix Guide

## Issues Identified and Fixed

### 1. Missing SESSION_SECRET Environment Variable
**Problem**: The SessionManager requires a `SESSION_SECRET` for HMAC-SHA256 token hashing, but it was not defined in the environment configuration.

**Fix**: Added `SESSION_SECRET` to `.env.example` with a development default and instructions for production.

**Action Required**: 
- Copy the updated `.env.example` to `.env` in the backend-node directory
- Set a strong random `SESSION_SECRET` for production (use: `openssl rand -base64 32`)

### 2. Old Cookie-Based Sessions in Database
**Problem**: Debug output showed old cookie-based sessions stored in the database, which were incompatible with the new token-based authentication system.

**Fix**: Created migration script `backend-node/scripts/clear_old_sessions.sql` to clear all existing sessions.

**Action Required**:
- Run the migration script against your database:
  ```bash
  mysql -u root -p derneseedcoltd < backend-node/scripts/clear_old_sessions.sql
  ```

### 3. Session Token Storage Format
**Problem**: The system now uses HMAC-SHA256 hashed tokens, but old sessions may have used raw tokens.

**Fix**: 
- SessionManager correctly hashes tokens before storage
- Database schema already supports VARCHAR(64) for hashed tokens
- Clearing old sessions ensures consistency

## Setup Instructions

### Backend Setup

1. **Configure Environment Variables**:
   ```bash
   cd backend-node
   cp .env.example .env
   ```

2. **Edit `.env` file** and ensure these values are set:
   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=derneseedcoltd
   DB_USER=root
   DB_PASS=
   SESSION_SECRET=dev-session-secret-change-in-production
   SESSION_DURATION_HOURS=24
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173
   ```

3. **Run Database Migration**:
   ```bash
   mysql -u root -p derneseedcoltd < scripts/clear_old_sessions.sql
   ```

4. **Start Backend Server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Configure Environment Variables**:
   ```bash
   cd client
   cp .env.example .env
   ```

2. **Edit `.env` file** (if needed for production):
   ```
   # For development, leave empty to use Vite proxy
   VITE_API_BASE_URL=
   
   # For production with separate backend:
   # VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Start Frontend Server**:
   ```bash
   npm run dev
   ```

## Authentication Flow

### Login Process
1. User submits email/password to `/api/auth/login`
2. Backend validates credentials and creates session
3. Backend returns `{ token, user }` in response
4. Frontend stores token in localStorage (`dern_session_token`)
5. Frontend redirects to appropriate dashboard based on role

### Authenticated Requests
1. Frontend sends token via `Authorization: Bearer <token>` header
2. `sessionMiddleware` validates token against database
3. If valid, `req.user` is populated with user data
4. Route handlers can access user info via `req.user`
5. Role-based middleware (`requireAdmin`, `requireStaff`) enforce access control

### Role-Based Access Control
- **admin**: Full access to all endpoints
- **employee**: Access to staff endpoints (dashboard, orders, farmers, products, seeds)
- **user**: Basic user access (self-profile only)
- **farmer**: Farmer-specific access

## Testing the Fix

### 1. Test Admin Login
```bash
# Default admin credentials
Email: admin@dernseed.com
Password: Admin123!
```

### 2. Test API Endpoints
After login, test these endpoints to verify authentication:

```bash
# Get current user (should work with valid token)
curl -H "Authorization: Bearer <your_token>" http://localhost:8000/api/users/me

# Get admin stats (should work for admin only)
curl -H "Authorization: Bearer <your_token>" http://localhost:8000/api/dashboard/admin-stats

# Get all users (admin only)
curl -H "Authorization: Bearer <your_token>" http://localhost:8000/api/users
```

### 3. Test Dashboard Access
- Login as admin → should redirect to `/dashboard/admin`
- Login as employee → should redirect to `/dashboard/employee`
- All dashboard tabs should load data without 401 errors

## Troubleshooting

### "Unauthorized" errors after login
- Check that `SESSION_SECRET` is set in backend `.env`
- Verify old sessions were cleared from database
- Check browser console for token storage in localStorage
- Verify Authorization header is being sent

### Database connection errors
- Verify MySQL/MariaDB is running
- Check database credentials in `.env`
- Ensure database `derneseedcoltd` exists
- Run schema.sql if needed: `mysql -u root -p < src/db/schema.sql`

### CORS errors
- Verify `CORS_ORIGIN` in backend `.env` includes your frontend URL
- For development: `http://localhost:3000,http://localhost:5173`
- Check that backend server is running on port 8000

## Security Notes

1. **Change Default Password**: The default admin password should be changed immediately after first login
2. **Production SESSION_SECRET**: Use a strong random secret in production (32+ characters)
3. **HTTPS**: Use HTTPS in production to protect tokens in transit
4. **Session Duration**: Adjust `SESSION_DURATION_HOURS` based on security requirements
5. **Database Security**: Use a dedicated database user with limited permissions in production

## Files Modified

- `backend-node/.env.example` - Added SESSION_SECRET configuration
- `backend-node/scripts/clear_old_sessions.sql` - New migration script
- `AUTHENTICATION_FIX_GUIDE.md` - This documentation file

## Next Steps

1. Apply the environment variable changes
2. Run the database migration
3. Restart both backend and frontend servers
4. Test login with admin credentials
5. Verify dashboard functionality
6. Test role-based access control with different user roles
