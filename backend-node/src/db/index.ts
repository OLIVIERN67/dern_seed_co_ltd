import mysql from "mysql2/promise";
import { createUserRepository } from "./repositories/userRepository";
import { createOrderRepository } from "./repositories/orderRepository";
import { createProductRepository } from "./repositories/productRepository";
import { createSeedRepository } from "./repositories/seedRepository";
import { createFarmerRepository } from "./repositories/farmerRepository";
import { createEmployeeRepository } from "./repositories/employeeRepository";
import { createCustomerRepository } from "./repositories/customerRepository";
import { createTestimonialRepository } from "./repositories/testimonialRepository";

// New repositories for public contact/product inquiry + blog documents
import { createContactMessageRepository } from "./repositories/contactMessageRepository";
import { createProductInquiryRepository } from "./repositories/productInquiryRepository";
import { createBlogDocumentRepository } from "./repositories/blogDocumentRepository";
import { createDeliveryRepository } from "./repositories/deliveryRepository";

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

const canonicalSeeds = [
  {
    name: "Certified Irish Potato Seed",
    variety: "Kirundo",
    varieties: ["Kirundo", "Ndamira", "Gikungu", "Cyerekezo"],
    benefits: ["High germination rate", "Disease-free planting material", "Uniform tuber size", "Excellent field performance"],
    description: "Improved varieties offering high productivity, good processing quality, and excellent adaptability to Rwanda's highland farming systems.",
    crop_type: "Root Crops",
    germination_rate: 95,
    planting_season: "Season A & B",
    harvest_period: "90-120 days",
    price_per_kg: 600,
    stock_quantity: 0,
    origin: "Rwanda",
    certification: "Certified",
    image_url: "/images/crops/potato-field.jpg",
  },
  {
    name: "Certified Bean Seed",
    variety: "RWR 3194",
    varieties: ["RWR 3194", "RWV 3316", "MAC 44", "Mwirasi", "MBC23", "Kigondo", "RWV1129", "RWV2350-2B"],
    benefits: ["High-yield potential", "Good disease tolerance", "Excellent grain quality", "Suitable for seed multiplication"],
    description: "Selected for high yield potential, nutritional value, and adaptability to different agro-ecological conditions.",
    crop_type: "Legumes",
    germination_rate: 92,
    planting_season: "Season A & B",
    harvest_period: "70-90 days",
    price_per_kg: 1200,
    stock_quantity: 0,
    origin: "Rwanda",
    certification: "Certified",
    image_url: "/images/crops/bean-varieties.jpg",
  },
  {
    name: "Certified Maize Seed",
    variety: "RHMH1520",
    varieties: ["RHMH1520", "PAN661", "H628", "H629"],
    benefits: ["High germination percentage", "Vigorous plant growth", "High yield potential", "Excellent adaptability"],
    description: "Improved maize varieties that provide reliable performance and high productivity across different ecological regions.",
    crop_type: "Cereals",
    germination_rate: 94,
    planting_season: "Season A & B",
    harvest_period: "90-130 days",
    price_per_kg: 1500,
    stock_quantity: 0,
    origin: "Rwanda",
    certification: "Certified",
    image_url: "/images/crops/maize-field.jpg",
  },
  {
    name: "Certified Wheat Seed",
    variety: "Nyaruka",
    varieties: ["Nyaruka", "Gihundo", "Kibatsi", "Majyambere", "Mizero", "Reberaho"],
    benefits: ["High productivity", "Good grain quality", "Adapted to local conditions", "Reliable field performance"],
    description: "Produced under strict quality control to ensure strong crop establishment and high grain quality, adapted to Rwanda's wheat-growing areas.",
    crop_type: "Cereals",
    germination_rate: 93,
    planting_season: "Season A & B",
    harvest_period: "100-140 days",
    price_per_kg: 1100,
    stock_quantity: 0,
    origin: "Rwanda",
    certification: "Certified",
    image_url: "/images/crops/wheat-field-golden.jpg",
  },
  {
    name: "Certified Soybean Seed",
    variety: "RWASOYA 20-8",
    varieties: ["RWASOYA 20-8", "RWASOYA 20-3", "PEKA 6"],
    benefits: ["Excellent germination", "High-yield potential", "Good adaptability", "Quality grain production"],
    description: "Quality soybean seed suitable for grain production, processing industries, and sustainable crop rotation systems.",
    crop_type: "Legumes",
    germination_rate: 91,
    planting_season: "Season A & B",
    harvest_period: "85-110 days",
    price_per_kg: 1300,
    stock_quantity: 0,
    origin: "Rwanda",
    certification: "Certified",
    image_url: "/images/crops/soybean-field.jpg",
  },
];

/**
 * Ensures table structure compatibility asynchronously on server start.
 */
async function ensureTablesExist() {
  try {
    // 1. Create customers table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_user_id (user_id),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Add extra columns to orders table if they don't exist
    const addCol = async (colName: string, colDef: string) => {
      try {
        await pool.execute(`ALTER TABLE orders ADD COLUMN ${colName} ${colDef}`);
      } catch (err: any) {
        // Ignore column already exists error (1060)
      }
    };

    await addCol("product_id", "INT NULL");
    await addCol("unit", "VARCHAR(50) DEFAULT 'kg'");
    await addCol("unit_price", "DECIMAL(12, 2) DEFAULT 0.00");
    await addCol("shipping_address", "VARCHAR(255) NULL");
    try {
      await pool.execute(`ALTER TABLE products MODIFY COLUMN image_url LONGTEXT NULL`);
    } catch (err) {
      // Ignore if already compatible.
    }

    // 3. Add richer seed metadata if it is missing.
    await addCol("varieties_json", "LONGTEXT NULL");
    await addCol("benefits_json", "LONGTEXT NULL");
    try {
      await pool.execute(`ALTER TABLE seeds MODIFY COLUMN image_url LONGTEXT NULL`);
    } catch (err) {
      // Ignore if the column is already compatible or cannot be altered.
    }

    for (const seed of canonicalSeeds) {
      const [existingRows]: any = await pool.execute(
        `SELECT id, varieties_json, benefits_json, image_url
         FROM seeds
         WHERE name = ?
         LIMIT 1`,
        [seed.name]
      );
      const existing = Array.isArray(existingRows) ? existingRows[0] : null;
      if (!existing) {
        await pool.execute(
          `INSERT INTO seeds
            (name, variety, varieties_json, benefits_json, description, crop_type, germination_rate, planting_season, harvest_period, price_per_kg, stock_quantity, origin, certification, image_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            seed.name,
            seed.variety,
            JSON.stringify(seed.varieties),
            JSON.stringify(seed.benefits),
            seed.description,
            seed.crop_type,
            seed.germination_rate,
            seed.planting_season,
            seed.harvest_period,
            seed.price_per_kg,
            seed.stock_quantity,
            seed.origin,
            seed.certification,
            seed.image_url,
          ]
        );
        continue;
      }

      const missingVars = !existing.varieties_json;
      const missingBenefits = !existing.benefits_json;
      const missingImage = !existing.image_url;
      if (missingVars || missingBenefits || missingImage) {
        await pool.execute(
          `UPDATE seeds
           SET varieties_json = COALESCE(varieties_json, ?),
               benefits_json = COALESCE(benefits_json, ?),
               image_url = COALESCE(image_url, ?)
           WHERE id = ?`,
          [
            JSON.stringify(seed.varieties),
            JSON.stringify(seed.benefits),
            seed.image_url,
            existing.id,
          ]
        );
      }
    }

    // 4. Modify orders status enum to include approved and rejected
    try {
      await pool.execute(`
        ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'paid', 'fulfilled', 'cancelled') DEFAULT 'pending'
      `);
    } catch (err) {
      // Ignore if cannot alter
    }

    // 5. Create deliveries table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS deliveries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        customer_id INT NOT NULL,
        customer_name VARCHAR(120) NOT NULL,
        delivery_address VARCHAR(255) NULL,
        phone_number VARCHAR(50) NULL,
        delivery_status ENUM('pending', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
        delivery_date TIMESTAMP NULL,
        delivered_by VARCHAR(120) NULL,
        tracking_number VARCHAR(100) NULL,
        notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id),
        INDEX idx_customer_id (customer_id),
        INDEX idx_delivery_status (delivery_status),
        INDEX idx_tracking_number (tracking_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (err) {
    console.error("[DB Init Warning] Failed auto schema check:", err);
  }
}

// Trigger schema check
ensureTablesExist();

/**
 * Generic parameterized query helper.
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
  customers: createCustomerRepository(pool),
  testimonials: createTestimonialRepository(pool),
  contactMessages: createContactMessageRepository(pool),
  productInquiries: createProductInquiryRepository(pool),
  blogDocuments: createBlogDocumentRepository(pool),
  deliveries: createDeliveryRepository(pool),
};
