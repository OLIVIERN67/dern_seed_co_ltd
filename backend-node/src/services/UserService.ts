import bcrypt from "bcryptjs";
import { db } from "../db";
import type { UserRole } from "../db/repositories/userRepository";
import { EmployeeService } from "./EmployeeService.js";
import { SessionManager } from "./SessionManager.js";

const VALID_ROLES: UserRole[] = ["user", "admin", "farmer", "employee"];

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

  // ---- Admin-only user management ----

  static async listUsers() {
    return db.users.findAll();
  }

  static async createUser(name: string, email: string, password: string, role: UserRole) {
    if (!VALID_ROLES.includes(role)) {
      throw Object.assign(new Error("Invalid role"), { status: 400 });
    }
    const existing = await db.users.findByEmailAny(email);
    if (existing) {
      throw Object.assign(new Error("Email already registered"), { status: 409 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const id = await db.users.createWithRole(name, email, passwordHash, role);

    if (role === "employee") {
      await EmployeeService.syncFromUser(id, name, email, true);
    }

    return id;
  }

  static async updateUser(
    requestingAdminId: number,
    targetId: number,
    fields: Partial<{ name: string; email: string; password?: string; role: UserRole; is_active: number }>
  ) {
    const target = await db.users.findByIdAny(targetId);
    if (!target) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    // Safety: an admin cannot demote or deactivate their own account, to avoid
    // ever locking every admin out of the system.
    if (requestingAdminId === targetId) {
      if (fields.role !== undefined && fields.role !== "admin") {
        throw Object.assign(new Error("You cannot change your own admin role"), { status: 400 });
      }
      if (fields.is_active !== undefined && fields.is_active === 0) {
        throw Object.assign(new Error("You cannot deactivate your own account"), { status: 400 });
      }
    }

    if (fields.role !== undefined && !VALID_ROLES.includes(fields.role)) {
      throw Object.assign(new Error("Invalid role"), { status: 400 });
    }

    if (fields.email !== undefined && fields.email !== target.email) {
      const existing = await db.users.findByEmailAny(fields.email);
      if (existing && Number(existing.id) !== targetId) {
        throw Object.assign(new Error("Email already registered"), { status: 409 });
      }
    }

    const { password, ...otherFields } = fields;

    if (Object.keys(otherFields).length > 0) {
      await db.users.updateById(targetId, otherFields);
    }

    const nextName = fields.name ?? target.name;
    const nextEmail = fields.email ?? target.email;
    const nextRole = fields.role ?? target.role;
    const nextActive = fields.is_active !== undefined ? fields.is_active === 1 : !!target.is_active;

    if (nextRole === "employee") {
      await EmployeeService.syncFromUser(targetId, nextName, nextEmail, nextActive);
    }

    if (password && password.trim().length > 0) {
      if (password.trim().length < 8) {
        throw Object.assign(new Error("Password must be at least 8 characters"), { status: 400 });
      }
      const passwordHash = await bcrypt.hash(password.trim(), 10);
      await db.users.updatePasswordHash(targetId, passwordHash);
    }

    // Keep the linked employee record in sync when an admin changes role away
    // from "employee" or deactivates the account directly from user management.
    if ((fields.role !== undefined && fields.role !== "employee") || fields.is_active === 0) {
      const employee = await db.employees.findByUserId(targetId);
      if (employee) {
        await db.employees.updateById(employee.id, { is_active: 0 });
      }
    }

    // Force re-authentication immediately when an admin deactivates the
    // account or changes its role/password, rather than waiting for the existing
    // session to expire naturally.
    if (fields.is_active === 0 || fields.role !== undefined || password) {
      await SessionManager.revokeAllUserSessions(targetId);
    }
  }

  static async deleteUser(requestingAdminId: number, targetId: number) {
    if (requestingAdminId === targetId) {
      throw Object.assign(new Error("You cannot delete your own account"), { status: 400 });
    }
    const target = await db.users.findByIdAny(targetId);
    if (!target) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    await db.users.deleteById(targetId);
    // Sessions cascade-delete via the FK constraint, but revoke explicitly
    // too in case any request is mid-flight with a cached session lookup.
    await SessionManager.revokeAllUserSessions(targetId);
  }
}
