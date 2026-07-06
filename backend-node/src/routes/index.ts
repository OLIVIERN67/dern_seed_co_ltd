import { Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./users";
import { orderRouter } from "./orders";
import { productRouter } from "./products";
import { seedRouter } from "./seeds";
import { farmerRouter } from "./farmers";
import { employeeRouter } from "./employees";

export const routes = Router();

routes.use(authRouter);
routes.use(userRouter);
routes.use(orderRouter);
routes.use(productRouter);
routes.use(seedRouter);
routes.use(farmerRouter);
routes.use(employeeRouter);


