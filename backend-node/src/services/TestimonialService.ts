import { db } from "../db";

export class TestimonialService {
  static async create(
    name: string,
    role: string | null,
    rating: number,
    message: string,
    initials: string | null
  ) {
    const computedInitials =
      initials ??
      name
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0]!.toUpperCase())
        .slice(0, 2)
        .join("");
    return db.testimonials.create(name, role, rating, message, computedInitials);
  }

  static async list() {
    return db.testimonials.findAllApproved();
  }

  static async getById(id: number) {
    const testimonial = await db.testimonials.findById(id);
    if (!testimonial) {
      throw Object.assign(new Error("Testimonial not found"), { status: 404 });
    }
    return testimonial;
  }

  static async updateById(id: number, fields: any) {
    await this.getById(id);
    await db.testimonials.updateById(id, fields);
  }

  static async deleteById(id: number) {
    await this.getById(id);
    await db.testimonials.deleteById(id);
  }
}
