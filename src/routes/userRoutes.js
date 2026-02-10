import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send({ message: "User route is working" });
});

userRouter.post('/register', (req, res) => {
    createUser(req, res);
});

userRouter.post('/login', (req, res) => {
    loginUser(req, res);
});

export default userRouter;
