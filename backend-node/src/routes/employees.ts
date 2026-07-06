import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { EmployeeController } from "../controllers/EmployeeController";

export const employeeRouter = Router();

// Public routes
employeeRouter.get("/api/employees", EmployeeController.list);
employeeRouter.get("/api/employees/:id", EmployeeController.getById);
employeeRouter.get("/api/employees/department/:department", EmployeeController.getByDepartment);

// Protected routes (require authentication)
employeeRouter.post("/api/employees", requireAuth, EmployeeController.create);
employeeRouter.get("/api/employees/me", requireAuth, EmployeeController.getMyProfile);
employeeRouter.patch("/api/employees/:id", requireAuth, EmployeeController.updateById);
employeeRouter.delete("/api/employees/:id", requireAuth, EmployeeController.deleteById);
