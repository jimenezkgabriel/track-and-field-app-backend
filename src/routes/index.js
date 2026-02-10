import { Router } from "express";
import userRoutes from "./userRoutes.js";
import hundredMeterRoutes from "./hundredMeterRoutes.js";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/hundred-meter', hundredMeterRoutes);
routes.use('/long-jump', longJumpRoutes);

export default routes;