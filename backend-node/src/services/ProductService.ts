import { db } from "../db";

export class ProductService {
  static async create(name: string, description: string | null, category: string | null, price: number, stockQuantity: number, unit: string, imageUrl: string | null) {
    return db.products.create(name, description, category, price, stockQuantity, unit, imageUrl);
  }

  static async list() {
    return db.products.findAll();
  }

  static async getById(id: number) {
    const product = await db.products.findById(id);
    if (!product) {
      throw Object.assign(new Error("Product not found"), { status: 404 });
    }
    return product;
  }

  static async getByCategory(category: string) {
    return db.products.findByCategory(category);
  }

  static async updateById(id: number, fields: any) {
    await db.products.updateById(id, fields);
  }

  static async deleteById(id: number) {
    await db.products.deleteById(id);
  }
}
