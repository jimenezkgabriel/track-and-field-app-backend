import express from 'express';
import { createUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send({ message: "User route is working" });
});

userRouter.post('/register', (req, res) => {
    createUser(req, res);
});

export default userRouter;
