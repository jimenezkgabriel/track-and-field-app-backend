import JavelinToss from "../models/JavelinToss.js";

export const getJavelinTossRecords = async (req, res) => {
    try {
        const records = await JavelinToss.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching Javelin Toss records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recordJavelinToss = async (req, res) => {
    try {
        const { record, description } = req.body;
        const newJavelinToss = await JavelinToss.create({
            record,
            description,
            user: req.user._id
        });
        res.status(201).json({ message: "Javelin Toss record created successfully", record: newJavelinToss });
    } catch (error) {
        console.error("Error recording Javelin Toss distance:", error);
        res.status(500).json({ message: error.errors?.record?.message || "Internal server error" });
    }
};

export const editJavelinToss = async (req, res) => {
    try {
        const { id } = req.params;
        const { record, description } = req.body;
        // Find the record first to check ownership
        const foundJavelinToss = await JavelinToss.findById(id);
        if (!foundJavelinToss) {
            return res.status(404).json({ message: "Javelin Toss record not found" });
        }
        
        // Check if the logged-in user owns this record
        if (foundJavelinToss.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this record" });
        }
        
        // Update using findByIdAndUpdate with validation
        const updatedRecord = await JavelinToss.findByIdAndUpdate(
            id,
            { record, description },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ message: "Javelin Toss record updated successfully", record: updatedRecord });
    } catch (error) {
        console.error("Error editing Javelin Toss record:", error);
        res.status(500).json({ message: error.errors?.record?.message || "Internal server error" });
    }
};

export const deleteJavelinToss = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record first to check ownership
        const foundJavelinToss = await JavelinToss.findById(id);
        if (!foundJavelinToss) {
            return res.status(404).json({ message: "Javelin Toss record not found" });
        }
        // Check if the logged-in user owns this record
        if (foundJavelinToss.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record" });
        }
        await JavelinToss.findByIdAndDelete(id);
        res.status(200).json({ message: "Javelin Toss record deleted successfully" });
    } catch (error) {
        console.error("Error deleting Javelin Toss record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};