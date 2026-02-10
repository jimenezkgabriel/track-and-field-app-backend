import LongJump from "../models/LongJump.js";
export const getLongJumpRecords = async (req, res) => {
    try {
        console.log("This is req.user:", req.user);
        const records = await LongJump.find({ user: req.user._id }).sort({ createdAt: -1 });
        console.log("Fetched Long Jump records:", records);
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching Long Jump records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recordLongJump = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { jumpDistance, description } = req.body;
        const newLongJump = new LongJump({
            jumpDistance: jumpDistance,
            description: description,
            user: req.user._id
        });
        await newLongJump.save();
        res.status(201).json({ message: "Long Jump record created successfully", record: newLongJump });
    } catch (error) {
        console.error("Error recording Long Jump distance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editLongJump = async (req, res) => {
    try {
        const { id } = req.params;
        const { jumpDistance, description } = req.body;
        // Find the record first to check ownership
        const record = await LongJump.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Long Jump record not found" });
        }
        // Check if the logged-in user owns this record
        if (record.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this record" });
        }
        record.jumpDistance = jumpDistance;
        record.description = description;
        await record.save();
        res.status(200).json({ message: "Long Jump record updated successfully", record });
    } catch (error) {
        console.error("Error editing Long Jump record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteLongJump = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record first to check ownership
        const record = await LongJump.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Long Jump record not found" });
        }
        // Check if the logged-in user owns this record
        if (record.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record" });
        }
        await LongJump.findByIdAndDelete(id);
        res.status(200).json({ message: "Long Jump record deleted successfully" });
    } catch (error) {
        console.error("Error deleting Long Jump record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};