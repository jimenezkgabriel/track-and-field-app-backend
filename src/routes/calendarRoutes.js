import { Router } from "express";
import { getCalendarEvents, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "../controllers/calendarController.js";
import { authMiddleware } from "../utils/auth.js";

const calendarRouter = Router();
calendarRouter.use(authMiddleware);

calendarRouter.get('/', (req, res) => {
    getCalendarEvents(req, res);
});

calendarRouter.post('/create', (req, res) => {
    createCalendarEvent(req, res);
});

calendarRouter.put('/update/:id', (req, res) => {
    updateCalendarEvent(req, res);
});

calendarRouter.delete('/delete/:id', (req, res) => {
    deleteCalendarEvent(req, res);
});

export default calendarRouter;