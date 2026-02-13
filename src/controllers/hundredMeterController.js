import HundredMeter from "../models/HundredMeter.js";

export const getHundredMeterRecords = async (req, res) => {
    try {
        const hundredMeterRecords = await HundredMeter.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(hundredMeterRecords);
    } catch (error) {
        console.error("Error fetching 100 Meter records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recordHundredMeter = async (req, res) => {
    try {
        const { record, description } = req.body;
        const newHundredMeter = await HundredMeter.create({
            record,
            description,
            user: req.user._id
        });
        res.status(201).json({ message: "100 Meter record created successfully", record: newHundredMeter });
    } catch (error) {
        console.error("Error recording 100 Meter time:", error);
        res.status(500).json({ message: error.errors?.record?.message || "Internal server error" });
    }
};

export const editHundredMeter = async (req, res) => {
    try {
        const { id } = req.params;
        const { record, description } = req.body;
        
        // Find the record first to check ownership
        const foundHundredMeter = await HundredMeter.findById(id);
        if (!foundHundredMeter) {
            return res.status(404).json({ message: "100 Meter record not found" });
        }
        
        // Check if the logged-in user owns this record
        if (foundHundredMeter.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this record" });
        }
        
        const updatedRecord = await HundredMeter.findByIdAndUpdate(
            id,
            { record, description },
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "100 Meter record updated successfully", record: updatedRecord });
    } catch (error) {
        console.error("Error updating 100 Meter record:", error);
        res.status(500).json({ message: error?.errors?.record?.message || "Internal server error" });
    }
};

export const deleteHundredMeter = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the record first to check ownership
        const foundHundredMeter = await HundredMeter.findById(id);
        if (!foundHundredMeter) {
            return res.status(404).json({ message: "100 Meter record not found" });
        }
        
        // Check if the logged-in user owns this record
        if (foundHundredMeter.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record" });
        }
        
        await HundredMeter.findByIdAndDelete(id);
        res.status(200).json({ message: "100 Meter record deleted successfully" });
    } catch (error) {
        console.error("Error deleting 100 Meter record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};