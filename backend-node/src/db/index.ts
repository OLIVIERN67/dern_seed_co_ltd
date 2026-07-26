import mysql from "mysql2/promise";
import { createUserRepository } from "./repositories/userRepository";
import { createOrderRepository } from "./repositories/orderRepository";
import { createProductRepository } from "./repositories/productRepository";
import { createSeedRepository } from "./repositories/seedRepository";
import { createFarmerRepository } from "./repositories/farmerRepository";
import { createEmployeeRepository } from "./repositories/employeeRepository";
import { createTestimonialRepository } from "./repositories/testimonialRepository";

// New repositories for public contact/product inquiry + blog documents
import { createContactMessageRepository } from "./repositories/contactMessageRepository";
import { createProductInquiryRepository } from "./repositories/productInquiryRepository";
import { createBlogDocumentRepository } from "./repositories/blogDocumentRepository";

import { getEnv, requireEnv, getEnvAllowEmpty } from "../config/env";


const dbConfig: any = {
  host: requireEnv("DB_HOST"),
  port: Number(getEnv("DB_PORT", "3306")),
  database: requireEnv("DB_NAME"),
  user: requireEnv("DB_USER"),
  charset: getEnv("DB_CHARSET", "utf8mb4"),
  waitForConnections: true,
  connectionLimit: 10,
};

const dbPass = getEnvAllowEmpty("DB_PASS");
if (dbPass !== "") {
  dbConfig.password = dbPass;
}

const pool = mysql.createPool(dbConfig);

/**
 * Generic parameterized query helper.
 * - For SELECT statements, resolves to an array of row objects.
 * - For INSERT/UPDATE/DELETE, resolves to a ResultSetHeader-like object
 *   (with .affectedRows, .insertId, etc).
 */
async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [result] = await pool.execute(sql, params);
  return result as unknown as T;
}

export const db = {
  pool,
  query,
  users: createUserRepository(pool),
  orders: createOrderRepository(pool),
  products: createProductRepository(pool),
  seeds: createSeedRepository(pool),
  farmers: createFarmerRepository(pool),
  employees: createEmployeeRepository(pool),
  testimonials: createTestimonialRepository(pool),
  contactMessages: createContactMessageRepository(pool),
  productInquiries: createProductInquiryRepository(pool),
  blogDocuments: createBlogDocumentRepository(pool),
};



