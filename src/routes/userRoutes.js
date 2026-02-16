import express from 'express';
import { createUser, editUserEvents, loginUser } from '../controllers/userController.js';
import { authMiddleware } from '../utils/auth.js';

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

userRouter.put('/events', authMiddleware, (req, res) => {
    editUserEvents(req, res);
});

export default userRouter;
