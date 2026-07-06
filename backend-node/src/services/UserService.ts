import { db } from "../db";

export class UserService {
  static async getMe(userId: number) {
    const u = await db.users.findById(userId);
    if (!u) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    return u;
  }

  static async updateMe(userId: number, name: string) {
    await db.users.updateMe(userId, name);
  }
}

