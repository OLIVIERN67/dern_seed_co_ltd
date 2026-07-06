import mysql from "mysql2/promise";
import { createUserRepository } from "./repositories/userRepository";
import { createSessionRepository } from "./repositories/sessionRepository";
import { createOrderRepository } from "./repositories/orderRepository";
import { createProductRepository } from "./repositories/productRepository";
import { createSeedRepository } from "./repositories/seedRepository";
import { createFarmerRepository } from "./repositories/farmerRepository";
import { createEmployeeRepository } from "./repositories/employeeRepository";

import { getEnv, requireEnv } from "../config/env";

const pool = mysql.createPool({
  host: requireEnv("DB_HOST"),
  port: Number(getEnv("DB_PORT", "3306")),
  database: requireEnv("DB_NAME"),
  user: requireEnv("DB_USER"),
  password: getEnv("DB_PASS", ""),
  charset: getEnv("DB_CHARSET", "utf8mb4"),
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

export const db = {
  pool,
  users: createUserRepository(pool),
  sessions: createSessionRepository(pool),
  orders: createOrderRepository(pool),
  products: createProductRepository(pool),
  seeds: createSeedRepository(pool),
  farmers: createFarmerRepository(pool),
  employees: createEmployeeRepository(pool),
};


