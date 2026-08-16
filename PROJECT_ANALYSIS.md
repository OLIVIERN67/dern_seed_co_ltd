# Technical Analysis Report: Dern Seed Co. Ltd Platform

## Executive Summary

The **Dern Seed Co. Ltd** project (`OLIVIERN67/dern_seed_co_ltd`) is a full-stack web application designed for an agricultural seed production and distribution enterprise [1]. The repository combines a modern React single-page application frontend with a robust Node.js/Express backend service backed by a relational MariaDB database [1] [2]. This report provides a detailed breakdown of the system architecture, database schema, security controls, recent modifications, and readiness for production deployment.

---

## System Architecture & Technology Stack

The application is structured into clearly separated frontend and backend directories, facilitating independent development, building, and deployment workflows [1] [2].

| Tier / Component | Technologies & Frameworks | Key Responsibilities |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Wouter, Lucide Icons | Responsive user interface, role-based dashboards, catalog browsing, shopping cart, and customer portals [1] [2]. |
| **Backend** | Node.js, Express, TypeScript, Zod, bcrypt, express-rate-limit | RESTful API endpoints, authentication, session management, business logic, and database abstraction [1] [2]. |
| **Database** | MariaDB / MySQL (`derneseedcoltd`) | Relational persistence for users, products, seeds, orders, farmers, employees, and logs [1] [2]. |
| **DevOps & CI/CD** | GitHub Actions (`deploy.yml`), PM2, Docker/Nginx guides | Automated type-checking, building, FTP frontend deployment, and SSH/PM2 backend restarts [2]. |

---

## Core Database Schema & Domain Model

The relational database schema (`backend-node/src/db/schema.sql`) defines structured tables to support authentication, ecommerce, farm management, and enterprise operations [2]:

> "The MariaDB schema ensures data integrity through foreign key constraints, unique email constraints, and comprehensive audit timestamps across all core entities [2]."

* **`users` & `sessions`**: Manages user accounts, password hashes (bcrypt), active states, and persistent token sessions. Supports role-based access control (`admin`, `employee`, `user`) [2].
* **`products` & `seeds`**: Catalogs agricultural products and specific seed varieties, tracking germination rates, certification status, stock levels, and pricing [2].
* **`orders`**: Handles customer checkout records, shipping addresses, order statuses, and totals, with role-aware scoping so staff can manage all orders while customers view only their own [2].
* **`farmers` & `employees`**: Tracks agricultural partners, farm sizes, districts, and staff personnel details (departments, salaries, hire dates), synchronizing linked user roles automatically [2].
* **`contact_messages`, `product_inquiries`, & `testimonials`**: Captures customer inquiries, feedback, and moderation queues with robust fault-tolerant persistence [2].

---

## Security, RBAC, and Recent Hardening

Recent codebase refinements addressed critical authorization gaps and operational robustness:

1. **Role-Based Access Control (RBAC)**: Middleware was upgraded from simple authentication checks to enforce strict role separation (`requireAdmin` and `requireStaff`). Sensitive endpoints (such as employee records and system users) are restricted to authorized personnel [2].
2. **Fault-Tolerant Messaging**: Contact and product inquiry submissions now prioritize database persistence, ensuring that missing SMTP or email configuration variables do not cause request failures [2].
3. **Session Management**: Session validation middleware was optimized to attach role attributes directly to requests, eliminating redundant database queries during authorization checks [2].

---

## Default Administrative Credentials

For initial setup and local evaluation, the database schema seeds a default administrator account [2]:

* **Email**: `admin@dernseed.com` [2]
* **Password**: `Admin123!` [2]

> **Security Warning**: In any production or shared environment, this default password must be changed immediately upon first login [2].

---

## Development & Deployment Readiness

The repository includes comprehensive guidance (`DEPLOYMENT.md`, `readme.txt`, and automated GitHub Actions workflows) supporting two primary deployment topologies [1] [2]:

* **Same-Origin (Recommended)**: Nginx serves the static React build (`dist/`) and proxies `/api/*` requests to the Node.js Express backend running under PM2 on port 8000 [2].
* **Separate Origins**: Frontend hosted on static file hosting with `VITE_API_BASE_URL` pointing to a dedicated backend VPS [2].

Local development can be initiated using the provided launcher script (`npm run dev` at the root), which concurrently validates and manages both development servers [2].

---

## References

1. [1] Dern Seed Co. Ltd GitHub Repository (`OLIVIERN67/dern_seed_co_ltd`). URL: `https://github.com/OLIVIERN67/dern_seed_co_ltd`
2. [2] Project Documentation and Schema files (`readme.txt`, `DEPLOYMENT.md`, `CHANGES.md`, `schema.sql`). Local working directory `/home/ubuntu/dern_seed_co_ltd/`.

---
*Analysis prepared autonomously by **Manus AI**.*
