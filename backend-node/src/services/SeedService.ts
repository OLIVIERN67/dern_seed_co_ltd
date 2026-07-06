import { db } from "../db";

export class SeedService {
  static async create(name: string, variety: string | null, description: string | null, cropType: string | null, germinationRate: number | null, plantingSeason: string | null, harvestPeriod: string | null, pricePerKg: number, stockQuantity: number, origin: string | null, certification: string | null, imageUrl: string | null) {
    return db.seeds.create(name, variety, description, cropType, germinationRate, plantingSeason, harvestPeriod, pricePerKg, stockQuantity, origin, certification, imageUrl);
  }

  static async list() {
    return db.seeds.findAll();
  }

  static async getById(id: number) {
    const seed = await db.seeds.findById(id);
    if (!seed) {
      throw Object.assign(new Error("Seed not found"), { status: 404 });
    }
    return seed;
  }

  static async getByCropType(cropType: string) {
    return db.seeds.findByCropType(cropType);
  }

  static async updateById(id: number, fields: any) {
    await db.seeds.updateById(id, fields);
  }

  static async deleteById(id: number) {
    await db.seeds.deleteById(id);
  }
}
