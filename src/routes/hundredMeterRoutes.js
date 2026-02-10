import { Router } from "express";
import { recordHundredMeter, getHundredMeterRecordsByUserId } from "../controllers/hundredMeterController.js";
import { authMiddleware } from "../utils/auth.js";
const hundredMeterRouter = Router();
hundredMeterRouter.use(authMiddleware);

hundredMeterRouter.get('/', (req, res) => {
    getHundredMeterRecordsByUserId(req, res);
});

hundredMeterRouter.post('/record', (req, res) => {
    recordHundredMeter(req, res);
});

export default hundredMeterRouter;