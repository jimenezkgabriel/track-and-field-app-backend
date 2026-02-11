import Calendar from "../models/Calendar";

export const getCalendarEvents = async (req, res) => {
    try {
        const events = await Calendar.find({ user: req.user._id })
            .sort({ date: 1 })
            .lean();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createCalendarEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const newEvent = await Calendar.create({
            title,
            date,
            description,
            user: req.user._id
        });
        res.status(201).json({ message: "Calendar event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error adding calendar event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteCalendarEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Calendar.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Calendar event not found" });
        }
        if (event.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        }
        await Calendar.findByIdAndDelete(id);
        res.status(200).json({ message: "Calendar event deleted successfully" });
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateCalendarEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the event first to check ownership
        const event = await Calendar.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Calendar event not found" });
        }

        // Check if the logged-in user owns this event
        if (event.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this event" });
        }

        // Update using findByIdAndUpdate with validation
        const { title, date, description } = req.body;
        const updatedEvent = await Calendar.findByIdAndUpdate(
            id,
            { title, date, description },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Calendar event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error("Error updating calendar event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};