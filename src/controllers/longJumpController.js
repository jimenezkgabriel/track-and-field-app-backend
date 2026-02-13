import LongJump from "../models/LongJump.js";

export const getLongJumpRecords = async (req, res) => {
    try {
        const records = await LongJump.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching Long Jump records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recordLongJump = async (req, res) => {
    try {
        const { record, description } = req.body;
        const newLongJump = await LongJump.create({
            record,
            description,
            user: req.user._id
        });
        res.status(201).json({ message: "Long Jump record created successfully", record: newLongJump });
    } catch (error) {
        console.error("Error recording Long Jump distance:", error);
        res.status(500).json({ message: error.errors?.record?.message || "Internal server error" });
    }
};

export const editLongJump = async (req, res) => {
    try {
        const { id } = req.params;
        const { record, description } = req.body;
        // Find the record first to check ownership
        const foundLongJump = await LongJump.findById(id);
        if (!foundLongJump) {
            return res.status(404).json({ message: "Long Jump record not found" });
        }
        
        // Check if the logged-in user owns this record
        if (foundLongJump.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this record" });
        }
        
        // Update using findByIdAndUpdate with validation
        const updatedRecord = await LongJump.findByIdAndUpdate(
            id,
            { record, description },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ message: "Long Jump record updated successfully", record: updatedRecord });
    } catch (error) {
        console.error("Error editing Long Jump record:", error);
        res.status(500).json({ message: error.errors?.record?.message || "Internal server error" });
    }
};

export const deleteLongJump = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record first to check ownership
        const foundLongJump = await LongJump.findById(id);
        if (!foundLongJump) {
            return res.status(404).json({ message: "Long Jump record not found" });
        }
        // Check if the logged-in user owns this record
        if (foundLongJump.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record" });
        }
        await LongJump.findByIdAndDelete(id);
        res.status(200).json({ message: "Long Jump record deleted successfully" });
    } catch (error) {
        console.error("Error deleting Long Jump record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};