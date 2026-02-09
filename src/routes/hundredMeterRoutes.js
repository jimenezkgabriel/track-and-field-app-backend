import { Router } from "express";
const hundredMeterRouter = Router();

hundredMeterRouter.get('/', (req, res) => {
    res.send({ message: "100 Meter route is working" });
});

export default hundredMeterRouter;