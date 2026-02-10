import { Router } from "express";
import userRoutes from "./userRoutes.js";
import hundredMeterRoutes from "./hundredMeterRoutes.js";
import longJumpRoutes from "./longJumpRoutes.js";
import javelinTossRoutes from "./javelinTossRoutes.js";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/hundred-meter', hundredMeterRoutes);
routes.use('/long-jump', longJumpRoutes);
routes.use('/javelin-toss', javelinTossRoutes);

export default routes;