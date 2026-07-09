import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { EmployeeController } from "../controllers/EmployeeController.js";


export const employeeRouter = Router();

// Public routes
employeeRouter.get("/api/employees", EmployeeController.list);
employeeRouter.get("/api/employees/department/:department", EmployeeController.getByDepartment);

// Protected routes (require authentication)
// NOTE: "/me" must be registered BEFORE "/:id", otherwise Express matches "me" as an :id param.
employeeRouter.get("/api/employees/me", requireAuth, EmployeeController.getMyProfile);
employeeRouter.post("/api/employees", requireAuth, EmployeeController.create);

// Parameterized routes (after "/me")
employeeRouter.get("/api/employees/:id", EmployeeController.getById);
employeeRouter.patch("/api/employees/:id", requireAuth, EmployeeController.updateById);
employeeRouter.delete("/api/employees/:id", requireAuth, EmployeeController.deleteById);
