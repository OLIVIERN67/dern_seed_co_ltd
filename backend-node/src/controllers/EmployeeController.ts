import type { Request, Response } from "express";
import { z } from "zod";
import { EmployeeService } from "../services/EmployeeService";

const CreateEmployeeSchema = z.object({
  user_id: z.number().int().positive().optional().nullable(),
  name: z.string().min(2).max(120),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  position: z.string().max(100).optional().nullable(),
  department: z.string().max(100).optional().nullable(),
  hire_date: z.string().optional().nullable(),
  salary: z.number().min(0).max(100000000).optional().nullable(),
});

const UpdateEmployeeSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  phone: z.string().max(20).optional().nullable(),
  email: z.string().email().max(255).optional().nullable(),
  position: z.string().max(100).optional().nullable(),
  department: z.string().max(100).optional().nullable(),
  hire_date: z.string().optional().nullable(),
  salary: z.number().min(0).max(100000000).optional().nullable(),
  is_active: z.number().int().min(0).max(1).optional(),
});

export class EmployeeController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateEmployeeSchema.parse(req.body ?? {});
      const hireDate = parsed.hire_date ? new Date(parsed.hire_date) : new Date();
      
      const id = await EmployeeService.create(
        parsed.user_id ?? null,
        parsed.name,
        parsed.phone ?? null,
        parsed.email ?? null,
        parsed.position ?? null,
        parsed.department ?? null,
        hireDate,
        parsed.salary ?? null
      );
      res.status(201).json({ ok: true, id });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to create employee" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await EmployeeService.list();
      res.json({ employees: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch employees" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const employee = await EmployeeService.getById(id);
      res.json({ employee });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch employee" });
    }
  }

  static async getMyProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const employee = await EmployeeService.getByUserId(userId);
      res.json({ employee });
    } catch (e: any) {
      const status = e?.status ?? 500;
      res.status(status).json({ error: e?.message ?? "Failed to fetch employee profile" });
    }
  }

  static async getByDepartment(req: Request, res: Response) {
    try {
      const department = req.params.department;
      const items = await EmployeeService.getByDepartment(department);
      res.json({ employees: items });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to fetch employees by department" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = UpdateEmployeeSchema.parse(req.body ?? {});
      
      const fields: any = {};
      if (parsed.name !== undefined) fields.name = parsed.name;
      if (parsed.phone !== undefined) fields.phone = parsed.phone;
      if (parsed.email !== undefined) fields.email = parsed.email;
      if (parsed.position !== undefined) fields.position = parsed.position;
      if (parsed.department !== undefined) fields.department = parsed.department;
      if (parsed.hire_date !== undefined) fields.hire_date = parsed.hire_date ? new Date(parsed.hire_date) : null;
      if (parsed.salary !== undefined) fields.salary = parsed.salary;
      if (parsed.is_active !== undefined) fields.is_active = parsed.is_active;

      await EmployeeService.updateById(id, fields);
      res.json({ ok: true });
    } catch (e: any) {
      const status = e?.status ?? 400;
      res.status(status).json({ error: e?.message ?? "Failed to update employee" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await EmployeeService.deleteById(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e?.message ?? "Failed to delete employee" });
    }
  }
}
