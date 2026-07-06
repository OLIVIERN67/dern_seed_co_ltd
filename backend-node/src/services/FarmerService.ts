import { db } from "../db";

export class FarmerService {
  static async create(userId: number | null, name: string, phone: string | null, email: string | null, farmName: string | null, farmLocation: string | null, farmSize: number | null, cropsGrown: string | null, registrationDate: Date | null) {
    return db.farmers.create(userId, name, phone, email, farmName, farmLocation, farmSize, cropsGrown, registrationDate);
  }

  static async list() {
    return db.farmers.findAll();
  }

  static async getById(id: number) {
    const farmer = await db.farmers.findById(id);
    if (!farmer) {
      throw Object.assign(new Error("Farmer not found"), { status: 404 });
    }
    return farmer;
  }

  static async getByUserId(userId: number) {
    const farmer = await db.farmers.findByUserId(userId);
    if (!farmer) {
      throw Object.assign(new Error("Farmer profile not found"), { status: 404 });
    }
    return farmer;
  }

  static async updateById(id: number, fields: any) {
    await db.farmers.updateById(id, fields);
  }

  static async deleteById(id: number) {
    await db.farmers.deleteById(id);
  }
}
