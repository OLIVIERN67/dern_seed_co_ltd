# DERN SEED — Backend Audit, Fixes & RBAC Dashboards

This document summarizes everything that was reviewed, fixed, and added.

## Critical bugs found and fixed

1. **Contact form & product inquiry form were completely broken.**
   `contactService.ts` / `productInquiryService.ts` called `requireEnv("COMPANY_INBOX_EMAIL")`
   and SMTP variables that were never defined anywhere in `.env`/`.env.example`. This threw
   an error on *every* submission, before the message was even saved.
   **Fix:** data is now saved to the database first; email notification is best-effort and
   never blocks or fails the request. `emailService.ts` now no-ops (with a console warning)
   instead of throwing when SMTP isn't configured. Added the missing env vars to `.env`
   and `.env.example` with safe defaults.

2. **Three database tables were missing entirely.** `contact_messages`, `product_inquiries`,
   and `blog_documents` were queried by repository code but never created by `schema.sql`,
   meaning those features would throw SQL errors ("table doesn't exist") at runtime.
   **Fix:** added all three `CREATE TABLE` statements to `schema.sql`.

3. **Major authorization holes.** `requireAdmin` middleware existed but was applied almost
   nowhere. Any logged-in customer could create/update/delete products, seeds, employees,
   farmers, and testimonials. Worse, `GET /api/farmers` and `GET /api/employees` (with phone
   numbers, emails, and — for employees — salaries) were **completely public, no login
   required at all**.
   **Fix:** introduced `requireStaff` (admin or employee) alongside the existing `requireAdmin`,
   and locked down every route appropriately:
   - Products/Seeds: public read, admin-only write
   - Employees: admin-only (read and write)
   - Farmers/Customers: staff-only (read and write)
   - Testimonials: anyone logged in can submit, admin-only to moderate/delete

4. **No admin API for user management existed at all.** There was no way to list, create,
   edit, deactivate, or delete user accounts, or assign roles.
   **Fix:** built out `GET/POST/PATCH/DELETE /api/users` (admin-only), with safety checks so
   an admin can never demote or delete their own account.

5. **Creating an "employee" record never actually granted dashboard access.** The `employees`
   table is separate from `users.role`, and nothing kept them in sync — so RBAC couldn't work
   even though the schema supported an `employee` role.
   **Fix:** `EmployeeService` now automatically promotes a linked user's account to `employee`
   on creation, reverts it to `user` on deactivation/removal, and never touches admin accounts.

6. **Orders, contact messages, and product inquiries had no staff-facing view.** Customers
   could only ever see their own orders; there was no way for staff to view all orders or
   read submitted contact/inquiry messages.
   **Fix:** added role-aware scoping (`OrderService`) so admins/employees see and manage every
   order while customers remain scoped to their own, plus new staff-only endpoints to view and
   mark-read contact messages and product inquiries.

7. **Session middleware made redundant DB calls.** Refactored `authSessionMiddleware` to
   attach the user's role once per request; `requireAdmin`/`requireStaff` now read from
   `req.user.role` directly instead of re-querying the database.

## New: Role-Based Dashboards (frontend)

- **`AuthContext`** — tracks the logged-in user/role app-wide; login/logout/refresh.
- **`ProtectedRoute`** — redirects unauthenticated users to `/login`, and non-matching roles
  away from dashboard routes.
- **Login now redirects by role**: admins → `/dashboard/admin`, employees →
  `/dashboard/employee`, everyone else → home.
- **Nav bar** now shows the logged-in user's name, a Dashboard link (staff only), and Logout,
  instead of always showing Login/Sign Up (desktop + mobile).

### Admin Dashboard (`/dashboard/admin`)
Full system access: Overview stats, Users (create/edit/role/activate-deactivate/delete),
Employees (CRUD), Customers (CRUD), Products (CRUD), Seeds (CRUD), Orders (view all, update
status, delete), Testimonials (approve/delete), Messages & Inquiries (view, mark read).

### Employee Dashboard (`/dashboard/employee`)
Restricted to daily operations: Overview stats, Customers (CRUD), Orders (view all, update
status), My Profile — no access to user management, employee records, or system settings.

## Verification performed

- `backend-node`: `tsc --noEmit` — clean, no errors.
- root (`client`): `tsc --noEmit` — clean, no errors (only a pre-existing harmless
  `baseUrl` deprecation notice, not an error).
- Manually cross-checked every new frontend form's field names against the corresponding
  backend Zod validation schemas.
- Could not run a live end-to-end test against MariaDB or a full `vite build` in this
  sandbox (no database server and no network access to fetch a missing native rollup binary).
  **Please run `npm install` fresh in `client/` root and `backend-node/` on your machine,
  then `npm run dev` in both, before deploying** — this rebuilds native deps for your platform.

## A note on creating employees

Adding a row in the Employees tab creates a staff *record* (name, position, department, etc.).
For that person to actually be able to log into the Employee Dashboard, they also need a user
account with the `employee` role — either:
- Create their user account first via the Users tab with role `employee`, then link it by
  passing that `user_id` when creating the employee record, **or**
- Create the employee record, then edit the corresponding user in the Users tab and set their
  role to `employee`.

This two-step design was kept deliberately (rather than silently generating a login/password)
so admins retain full control over credentials.

## Frontend Enhancements (Leadership Section)

- **Professional Portraits Added**: Replaced generic icons in the "Staff Administration" section with high-quality portraits for the Managing Director, COO, and CFO.
- **Enhanced UI Design**: Increased portrait size to `w-32 h-32`, added professional circular cropping (`rounded-full`), subtle borders, and shadow effects for a modern, clean aesthetic.
- **Responsive Alignment**: Ensured images are properly sized and aligned for both desktop and mobile views using Tailwind's responsive grid and flex utilities.
- **Fallback Handling**: Maintained generic icon fallbacks to ensure the UI remains functional if images are missing or fail to load.
