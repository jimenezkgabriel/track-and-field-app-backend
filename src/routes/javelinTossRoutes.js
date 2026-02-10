import { Router } from "express";
import { getJavelinTossRecords, recordJavelinToss, editJavelinToss, deleteJavelinToss } from "../controllers/javelinTossController.js";
import { authMiddleware } from "../utils/auth.js";

const javelinTossRouter = Router();
javelinTossRouter.use(authMiddleware);

javelinTossRouter.get('/', (req, res) => {
    getJavelinTossRecords(req,res);
});

javelinTossRouter.post('/record', (req, res) => {
    recordJavelinToss(req,res);
});

javelinTossRouter.put('/update/:id', (req, res) => {
    editJavelinToss(req,res);
});

javelinTossRouter.delete('/delete/:id', (req, res) => {
    deleteJavelinToss(req,res);
});

export default javelinTossRouter;