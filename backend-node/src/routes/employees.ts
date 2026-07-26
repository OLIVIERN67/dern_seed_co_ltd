import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { EmployeeController } from "../controllers/EmployeeController.js";

export const employeeRouter = Router();

// Self-service: an employee viewing their own profile (used by the Employee Dashboard)
// NOTE: "/me" must be registered BEFORE "/:id", otherwise Express matches "me" as an :id param.
employeeRouter.get("/api/employees/me", requireAuth, EmployeeController.getMyProfile);

// Everything else is admin-only: employee records contain salary/PII and only
// the Admin Dashboard manages staff accounts ("No permission to create or
// manage admin accounts or modify system settings" for employees).
employeeRouter.get("/api/employees", requireAdmin, EmployeeController.list);
employeeRouter.get("/api/employees/department/:department", requireAdmin, EmployeeController.getByDepartment);
employeeRouter.post("/api/employees", requireAdmin, EmployeeController.create);
employeeRouter.get("/api/employees/:id", requireAdmin, EmployeeController.getById);
employeeRouter.patch("/api/employees/:id", requireAdmin, EmployeeController.updateById);
employeeRouter.delete("/api/employees/:id", requireAdmin, EmployeeController.deleteById);
