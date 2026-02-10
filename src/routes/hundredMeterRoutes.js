import { Router } from "express";
import { recordHundredMeter, getHundredMeterRecordsByUserId, editHundredMeter, deleteHundredMeter } from "../controllers/hundredMeterController.js";
import { authMiddleware } from "../utils/auth.js";
const hundredMeterRouter = Router();
hundredMeterRouter.use(authMiddleware);

hundredMeterRouter.get('/', (req, res) => {
    getHundredMeterRecordsByUserId(req, res);
});

hundredMeterRouter.post('/record', (req, res) => {
    recordHundredMeter(req, res);
});

hundredMeterRouter.put('/update/:id', (req, res) => {
    editHundredMeter(req, res);
});

hundredMeterRouter.delete('/delete/:id', (req, res) => {
    deleteHundredMeter(req, res);
});

export default hundredMeterRouter;