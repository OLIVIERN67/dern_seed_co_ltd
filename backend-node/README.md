# DERN SEED Backend API

A modern, secure Node.js/Express backend API for the DERN SEED agricultural platform. This backend provides authentication, user management, and order management services with MySQL database integration.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend Architecture](#backend-architecture)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Authentication Flow](#authentication-flow)
- [Error Handling](#error-handling)
- [Security Measures](#security-measures)
- [Logging and Debugging](#logging-and-debugging)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

The DERN SEED backend API is a RESTful service built with Node.js, Express, TypeScript, and MySQL. It provides:

- User registration and authentication with secure session management
- Order management for seed purchases
- Role-based access control
- Rate limiting and security headers
- CORS support for frontend integration

## Backend Architecture

### Folder Structure

```
backend-node/
├── src/
│   ├── config/
│   │   └── env.ts              # Environment variable management
│   ├── controllers/
│   │   ├── AuthController.ts   # Authentication endpoints
│   │   ├── OrderController.ts  # Order management endpoints
│   │   └── UserController.ts   # User profile endpoints
│   ├── db/
│   │   ├── index.ts            # Database connection and pool
│   │   ├── schema.sql          # Database schema
│   │   └── repositories/
│   │       ├── userRepository.ts
│   │       ├── sessionRepository.ts
│   │       └── orderRepository.ts
│   ├── middleware/
│   │   ├── authSessionMiddleware.ts  # Session validation
│   │   ├── errorHandler.ts           # Global error handler
│   │   ├── notFoundHandler.ts        # 404 handler
│   │   └── requireAuth.ts            # Authentication guard
│   ├── routes/
│   │   ├── auth.ts             # Authentication routes
│   │   ├── orders.ts           # Order routes
│   │   ├── users.ts            # User routes
│   │   └── index.ts            # Route aggregation
│   ├── services/
│   │   ├── AuthService.ts      # Authentication business logic
│   │   ├── OrderService.ts     # Order business logic
│   │   └── UserService.ts      # User business logic
│   ├── server.ts               # Express app configuration
│   └── index.ts                # Application entry point
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                  # This file
```

### Architecture Pattern

The backend follows a layered architecture:

1. **Routes Layer**: Defines API endpoints and HTTP methods
2. **Controllers Layer**: Handles HTTP requests/responses and validation
3. **Services Layer**: Contains business logic
4. **Repositories Layer**: Handles database operations
5. **Middleware Layer**: Cross-cutting concerns (auth, errors, logging)

## Technologies Used

- **Runtime**: Node.js 18+
- **Framework**: Express 4.21.2
- **Language**: TypeScript 5.6.3
- **Database**: MySQL with mysql2 driver
- **Authentication**: bcryptjs for password hashing
- **Validation**: Zod 4.1.12
- **Security**: Helmet, express-rate-limit, CORS
- **Session Management**: HTTP-only cookies with secure tokens
- **Development**: tsx for TypeScript execution

## Installation and Setup

### Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository** (if not already cloned)
   ```bash
   git clone <repository-url>
   cd dern_seed_co_ltd/backend-node
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Create and configure the database** (see Database Configuration section)

5. **Build the project**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
APP_ENV=development
APP_URL=http://localhost:8000
PORT=8000

# CORS Configuration (comma-separated origins)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# MySQL Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=derneseedcoltd
DB_USER=root
DB_PASS=
DB_CHARSET=utf8mb4

# Security
SESSION_SECRET=change-me-to-a-long-random-secret-min-32-chars
SESSION_TTL=2592000
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_NAME=dern_session
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `APP_ENV` | Application environment | development | No |
| `APP_URL` | Base URL of the application | http://localhost:8000 | No |
| `PORT` | Server port | 8000 | No |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | * | No |
| `DB_HOST` | MySQL host | 127.0.0.1 | Yes |
| `DB_PORT` | MySQL port | 3306 | No |
| `DB_NAME` | Database name | derneseedcoltd | Yes |
| `DB_USER` | MySQL username | root | Yes |
| `DB_PASS` | MySQL password | (empty) | No |
| `DB_CHARSET` | Database charset | utf8mb4 | No |
| `SESSION_SECRET` | Secret for session signing | - | Yes |
| `SESSION_TTL` | Session time-to-live in seconds | 2592000 (30 days) | No |
| `SESSION_COOKIE_SECURE` | Use secure cookies (HTTPS) | false | No |
| `SESSION_COOKIE_NAME` | Name of session cookie | dern_session | No |

## Database Configuration

### Database Name

The backend uses the MySQL database named **derneseedcoltd**.

### Creating the Database

1. **Connect to MySQL**
   ```bash
   mysql -u root -p
   ```

2. **Create the database**
   ```sql
   CREATE DATABASE IF NOT EXISTS derneseedcoltd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Exit MySQL**
   ```sql
   EXIT;
   ```

### Initializing the Schema

Run the schema SQL file to create all required tables:

```bash
mysql -u root -p derneseedcoltd < src/db/schema.sql
```

Or manually execute the SQL commands from `src/db/schema.sql` in your MySQL client.

### Database Schema

The database consists of seven main tables:

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'farmer', 'employee') DEFAULT 'user',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Sessions Table
```sql
CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_token VARCHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP NULL,
  revoked_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  quantity INT NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  status ENUM('pending', 'paid', 'fulfilled', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(12, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  unit VARCHAR(50) DEFAULT 'kg',
  image_url VARCHAR(500),
  is_available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Seeds Table
```sql
CREATE TABLE seeds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  variety VARCHAR(100),
  description TEXT,
  crop_type VARCHAR(100),
  germination_rate DECIMAL(5, 2),
  planting_season VARCHAR(50),
  harvest_period VARCHAR(50),
  price_per_kg DECIMAL(12, 2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  origin VARCHAR(100),
  certification VARCHAR(100),
  image_url VARCHAR(500),
  is_available TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Farmers Table
```sql
CREATE TABLE farmers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  farm_name VARCHAR(200),
  farm_location VARCHAR(255),
  farm_size DECIMAL(10, 2),
  crops_grown TEXT,
  registration_date DATE,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

#### Employees Table
```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  position VARCHAR(100),
  department VARCHAR(100),
  hire_date DATE,
  salary DECIMAL(12, 2),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## Running the Server

### Development Mode

Run the server with hot-reloading using tsx:

```bash
npm run dev
```

The server will start on `http://localhost:8000` (or the PORT specified in .env).

### Production Mode

Build the TypeScript code and run the compiled JavaScript:

```bash
npm run build
npm start
```

### Verifying the Server

Check if the server is running by accessing:
- Health check: The server should respond to requests on configured ports
- Check console output for startup messages

## API Documentation

### Base URL

All API endpoints are prefixed with `/api`:

```
http://localhost:8000/api
```

### Authentication Endpoints

#### POST /api/auth/register

Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validation Rules:**
- `name`: 2-120 characters, letters, spaces, hyphens, apostrophes only
- `email`: Valid email address, max 255 characters
- `password`: 8-200 characters, must include uppercase, lowercase, number, and special character

**Response (201 Created):**
```json
{
  "ok": true,
  "user_id": 1
}
```

**Response (409 Conflict):**
```json
{
  "error": "Email already registered"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Password must include at least one uppercase letter"
}
```

#### POST /api/auth/login

Authenticate a user and create a session.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

**Cookies:** Sets `dern_session` HTTP-only cookie with session token.

#### POST /api/auth/logout

End the current user session.

**Request:** No body required. Requires valid session cookie.

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Cookies:** Clears the `dern_session` cookie.

### User Endpoints

All user endpoints require authentication (valid session cookie).

#### GET /api/users/me

Get the current user's profile.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_active": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

#### PATCH /api/users/me

Update the current user's profile.

**Request:**
```json
{
  "name": "John Updated"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

### Order Endpoints

All order endpoints require authentication (valid session cookie).

#### POST /api/orders

Create a new order.

**Request:**
```json
{
  "product_name": "Certified Potato Seeds",
  "quantity": 100,
  "total_amount": 50000.00
}
```

**Validation Rules:**
- `product_name`: 2-200 characters
- `quantity`: Integer, 1-1,000,000
- `total_amount`: Decimal, 0-100,000,000

**Response (201 Created):**
```json
{
  "ok": true,
  "id": 1
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

#### GET /api/orders

Get all orders for the current user.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": 1,
      "product_name": "Certified Potato Seeds",
      "quantity": 100,
      "total_amount": 50000.00,
      "status": "pending",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/orders/:id

Get a specific order by ID.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "order": {
    "id": 1,
    "product_name": "Certified Potato Seeds",
    "quantity": 100,
    "total_amount": 50000.00,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Order not found"
}
```

#### PATCH /api/orders/:id

Update an existing order.

**Request:**
```json
{
  "status": "paid",
  "quantity": 150
}
```

**Allowed Fields:** `product_name`, `quantity`, `total_amount`, `status`

**Status Values:** `pending`, `paid`, `fulfilled`, `cancelled`

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Response (404 Not Found):**
```json
{
  "error": "Order not found"
}
```

#### DELETE /api/orders/:id

Delete an order.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "ok": true
}
```

### Product Endpoints

#### GET /api/products

Get all available products.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Certified Potato Seeds",
      "description": "High-quality potato seeds",
      "category": "seeds",
      "price": 500.00,
      "stock_quantity": 1000,
      "unit": "kg",
      "image_url": "https://example.com/image.jpg",
      "is_available": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/products/:id

Get a specific product by ID.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "product": {
    "id": 1,
    "name": "Certified Potato Seeds",
    "description": "High-quality potato seeds",
    "category": "seeds",
    "price": 500.00,
    "stock_quantity": 1000,
    "unit": "kg",
    "image_url": "https://example.com/image.jpg",
    "is_available": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

#### GET /api/products/category/:category

Get products by category.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Certified Potato Seeds",
      "category": "seeds",
      "price": 500.00,
      "stock_quantity": 1000
    }
  ]
}
```

#### POST /api/products

Create a new product.

**Request:** Requires authentication.
```json
{
  "name": "Certified Potato Seeds",
  "description": "High-quality potato seeds",
  "category": "seeds",
  "price": 500.00,
  "stock_quantity": 1000,
  "unit": "kg",
  "image_url": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "ok": true,
  "id": 1
}
```

#### PATCH /api/products/:id

Update a product.

**Request:** Requires authentication.
```json
{
  "price": 550.00,
  "stock_quantity": 900
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### DELETE /api/products/:id

Delete a product.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "ok": true
}
```

### Seed Endpoints

#### GET /api/seeds

Get all available seeds.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "seeds": [
    {
      "id": 1,
      "name": "Maize Hybrid",
      "variety": "Hybrid 123",
      "description": "High-yield maize seeds",
      "crop_type": "maize",
      "germination_rate": 95.00,
      "planting_season": "Spring",
      "harvest_period": "90-100 days",
      "price_per_kg": 300.00,
      "stock_quantity": 500,
      "origin": "Rwanda",
      "certification": "ISO 9001",
      "image_url": "https://example.com/image.jpg",
      "is_available": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/seeds/:id

Get a specific seed by ID.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "seed": {
    "id": 1,
    "name": "Maize Hybrid",
    "variety": "Hybrid 123",
    "crop_type": "maize",
    "price_per_kg": 300.00,
    "stock_quantity": 500
  }
}
```

#### GET /api/seeds/crop/:crop_type

Get seeds by crop type.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "seeds": [
    {
      "id": 1,
      "name": "Maize Hybrid",
      "crop_type": "maize",
      "price_per_kg": 300.00
    }
  ]
}
```

#### POST /api/seeds

Create a new seed.

**Request:** Requires authentication.
```json
{
  "name": "Maize Hybrid",
  "variety": "Hybrid 123",
  "description": "High-yield maize seeds",
  "crop_type": "maize",
  "germination_rate": 95.00,
  "planting_season": "Spring",
  "harvest_period": "90-100 days",
  "price_per_kg": 300.00,
  "stock_quantity": 500,
  "origin": "Rwanda",
  "certification": "ISO 9001",
  "image_url": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "ok": true,
  "id": 1
}
```

#### PATCH /api/seeds/:id

Update a seed.

**Request:** Requires authentication.
```json
{
  "price_per_kg": 350.00,
  "stock_quantity": 400
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### DELETE /api/seeds/:id

Delete a seed.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "ok": true
}
```

### Farmer Endpoints

#### GET /api/farmers

Get all farmers.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "farmers": [
    {
      "id": 1,
      "user_id": 5,
      "name": "John Farmer",
      "phone": "+250788123456",
      "email": "john@example.com",
      "farm_name": "Green Valley Farm",
      "farm_location": "Musanze, Rwanda",
      "farm_size": 5.5,
      "crops_grown": "Maize, Potatoes, Beans",
      "registration_date": "2024-01-01",
      "is_active": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/farmers/:id

Get a specific farmer by ID.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "farmer": {
    "id": 1,
    "name": "John Farmer",
    "farm_name": "Green Valley Farm",
    "farm_location": "Musanze, Rwanda"
  }
}
```

#### GET /api/farmers/me

Get the current user's farmer profile.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "farmer": {
    "id": 1,
    "user_id": 5,
    "name": "John Farmer",
    "farm_name": "Green Valley Farm"
  }
}
```

#### POST /api/farmers

Create a new farmer profile.

**Request:** Requires authentication.
```json
{
  "user_id": 5,
  "name": "John Farmer",
  "phone": "+250788123456",
  "email": "john@example.com",
  "farm_name": "Green Valley Farm",
  "farm_location": "Musanze, Rwanda",
  "farm_size": 5.5,
  "crops_grown": "Maize, Potatoes, Beans",
  "registration_date": "2024-01-01"
}
```

**Response (201 Created):**
```json
{
  "ok": true,
  "id": 1
}
```

#### PATCH /api/farmers/:id

Update a farmer profile.

**Request:** Requires authentication.
```json
{
  "farm_size": 6.0,
  "crops_grown": "Maize, Potatoes, Beans, Wheat"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### DELETE /api/farmers/:id

Delete a farmer profile.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "ok": true
}
```

### Employee Endpoints

#### GET /api/employees

Get all employees.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "employees": [
    {
      "id": 1,
      "user_id": 10,
      "name": "Jane Employee",
      "phone": "+250787654321",
      "email": "jane@example.com",
      "position": "Agronomist",
      "department": "Research",
      "hire_date": "2024-01-01",
      "salary": 500000.00,
      "is_active": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/employees/:id

Get a specific employee by ID.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "employee": {
    "id": 1,
    "name": "Jane Employee",
    "position": "Agronomist",
    "department": "Research"
  }
}
```

#### GET /api/employees/department/:department

Get employees by department.

**Request:** No body required. Public endpoint.

**Response (200 OK):**
```json
{
  "employees": [
    {
      "id": 1,
      "name": "Jane Employee",
      "position": "Agronomist",
      "department": "Research"
    }
  ]
}
```

#### GET /api/employees/me

Get the current user's employee profile.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "employee": {
    "id": 1,
    "user_id": 10,
    "name": "Jane Employee",
    "position": "Agronomist"
  }
}
```

#### POST /api/employees

Create a new employee profile.

**Request:** Requires authentication.
```json
{
  "user_id": 10,
  "name": "Jane Employee",
  "phone": "+250787654321",
  "email": "jane@example.com",
  "position": "Agronomist",
  "department": "Research",
  "hire_date": "2024-01-01",
  "salary": 500000.00
}
```

**Response (201 Created):**
```json
{
  "ok": true,
  "id": 1
}
```

#### PATCH /api/employees/:id

Update an employee profile.

**Request:** Requires authentication.
```json
{
  "salary": 550000.00,
  "position": "Senior Agronomist"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### DELETE /api/employees/:id

Delete an employee profile.

**Request:** No body required. Requires authentication.

**Response (200 OK):**
```json
{
  "ok": true
}
```

## Authentication Flow

### Registration Flow

1. User submits registration data (name, email, password)
2. Backend validates input using Zod schemas
3. Backend checks if email already exists
4. Password is hashed using bcrypt (10 rounds)
5. User record is created in database
6. Session token is generated using SHA-256 hash
7. Session record is created in database
8. HTTP-only cookie is set with session token
9. User ID is returned to client

### Login Flow

1. User submits login credentials (email, password)
2. Backend validates input using Zod schemas
3. Backend finds user by email
4. Password is compared using bcrypt
5. If valid, new session token is generated
6. Session record is created in database
7. HTTP-only cookie is set with session token
8. User data is returned to client

### Session Validation

1. Each request includes session cookie
2. Middleware extracts session token from cookie
3. Backend validates token against database
4. Checks if session is expired or revoked
5. Updates last_seen_at timestamp
6. Attaches user ID to request object
7. Request proceeds to protected routes

### Logout Flow

1. User requests logout
2. Backend extracts session token from cookie
3. Session is marked as revoked in database
4. Cookie is cleared from client
5. Success response is returned

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "error": "Error message here"
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Authentication required or failed
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate email)
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Validation Errors

Validation errors return detailed messages explaining what went wrong:

```json
{
  "error": "Password must include at least one uppercase letter"
}
```

### Global Error Handler

The global error handler catches all unhandled errors and returns appropriate responses:

```typescript
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = typeof err?.status === "number" ? err.status : 500;
  const message = typeof err?.message === "string" ? err.message : "Internal Server Error";
  res.status(status).json({ error: message });
}
```

## Security Measures

### Implemented Security Features

1. **Password Security**
   - bcrypt hashing with 10 salt rounds
   - Strong password requirements (uppercase, lowercase, number, special character)
   - Minimum 8 characters

2. **Session Security**
   - HTTP-only cookies (not accessible via JavaScript)
   - Secure flag for HTTPS environments
   - Strict SameSite policy to prevent CSRF
   - SHA-256 token generation
   - Session expiration (30 days default)
   - Session revocation on logout

3. **Rate Limiting**
   - General rate limit: 100 requests per 15 minutes per IP
   - Auth rate limit: 5 requests per 15 minutes per IP
   - Prevents brute force attacks

4. **Security Headers**
   - Helmet middleware for security headers
   - Content Security Policy (CSP)
   - XSS protection
   - No sniff middleware

5. **Input Validation**
   - Zod schema validation for all inputs
   - SQL injection prevention via parameterized queries
   - XSS prevention via proper escaping

6. **CORS Configuration**
   - Configurable allowed origins
   - Credentials support for cookies
   - Explicit allowed methods and headers

7. **Error Handling**
   - Generic error messages for authentication failures
   - No sensitive information in error responses
   - Proper HTTP status codes

### Security Best Practices

- Never store plain text passwords
- Use environment variables for sensitive configuration
- Keep dependencies updated
- Use HTTPS in production
- Implement proper logging for security events
- Regular security audits

## Logging and Debugging

### Request Logging

All HTTP requests are logged with timestamp and method:

```
2024-01-01T12:00:00.000Z - POST /api/auth/login
2024-01-01T12:00:01.000Z - GET /api/users/me
`

### Error Logging

Session validation errors are logged:

```
Session validation error: [Error details]
```

### Debugging Tips

1. **Check Environment Variables**
   ```bash
   # Verify .env file exists and is properly configured
   cat .env
   ```

2. **Database Connection**
   ```bash
   # Test MySQL connection
   mysql -h 127.0.0.1 -u root -p derneseedcoltd
   ```

3. **Enable Debug Logging**
   - Add console.log statements in controllers/services
   - Check server console output

4. **Check Compiled JavaScript**
   ```bash
   # View compiled files in dist/ directory
   ls -la dist/
   ```

## Available Scripts

### npm run dev

Start the development server with hot-reloading using tsx.

```bash
npm run dev
```

### npm run build

Compile TypeScript to JavaScript in the `dist/` directory.

```bash
npm run build
```

### npm start

Start the production server from compiled JavaScript.

```bash
npm start
```

## Deployment

### Production Setup

1. **Environment Variables**
   - Set `APP_ENV=production`
   - Set `SESSION_COOKIE_SECURE=true`
   - Use strong `SESSION_SECRET`
   - Configure proper `CORS_ORIGIN`
   - Use production database credentials

2. **Database**
   - Use production MySQL instance
   - Run schema.sql to create tables
   - Ensure proper backups

3. **Build**
   ```bash
   npm run build
   ```

4. **Start**
   ```bash
   npm start
   ```

### Deployment Platforms

The backend can be deployed to:

- **VPS/Dedicated Server**: Use PM2 for process management
- **Cloud Providers**: AWS, Google Cloud, Azure
- **PaaS**: Heroku, Railway, Render

### PM2 Configuration Example

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'dern-seed-backend',
    script: './dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
- Check DB_USER and DB_PASS in .env
- Verify MySQL is running
- Ensure user has permissions for derneseedcoltd database

#### 2. Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
npm install
```

#### 3. TypeScript Compilation Errors

**Error:** Type errors during build

**Solution:**
- Ensure TypeScript is installed: `npm install -g typescript`
- Check tsconfig.json configuration
- Run `npm run build` to see specific errors

#### 4. Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
- Change PORT in .env
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:8000 | xargs kill -9
  ```

#### 5. CORS Errors

**Error:** CORS policy error in browser

**Solution:**
- Check CORS_ORIGIN in .env
- Ensure frontend URL is included
- Verify credentials: true is set if using cookies

#### 6. Session Not Persisting

**Error:** User logged out after refresh

**Solution:**
- Check SESSION_COOKIE_SECURE setting
- Ensure sameSite is compatible with your setup
- Verify cookie domain settings
- Check browser cookie settings

#### 7. Rate Limiting Issues

**Error:** Too many requests error

**Solution:**
- Wait for rate limit window to expire
- Adjust rate limit values in server.ts
- Whitelist your IP during development

### Getting Help

If you encounter issues not covered here:

1. Check the console output for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure database schema is properly initialized
4. Check network connectivity to database
5. Review logs for any error patterns

## License

This project is proprietary software for DERN SEED Company Ltd.

## Support

For technical support, contact the development team or refer to the project documentation.
