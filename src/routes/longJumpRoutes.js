import { Router } from "express";
import { getLongJumpRecords, recordLongJump, editLongJump, deleteLongJump } from "../controllers/longJumpController.js";
import { authMiddleware } from "../utils/auth.js";

const longJumpRouter = Router();
longJumpRouter.use(authMiddleware);

longJumpRouter.get('/', (req, res) => {
    getLongJumpRecords(req,res);
});

longJumpRouter.post('/record', (req, res) => {
    recordLongJump(req,res);
});

longJumpRouter.put('/update/:id', (req, res) => {
    editLongJump(req,res);
});

longJumpRouter.delete('/delete/:id', (req, res) => {
    deleteLongJump(req,res);
});

export default longJumpRouter;