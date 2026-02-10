import JavelinToss from "../models/JavelinToss.js";

export const getJavelinTossRecords = async (req, res) => {
    try {
        console.log("This is req.user:", req.user);
        const records = await JavelinToss.find({ user: req.user._id }).sort({ createdAt: -1 });
        console.log("Fetched Javelin Toss records:", records);
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching Javelin Toss records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const recordJavelinToss = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { tossDistance, description } = req.body;
        const newJavelinToss = new JavelinToss({
            tossDistance: tossDistance,
            description: description,
            user: req.user._id
        });
        await newJavelinToss.save();
        res.status(201).json({ message: "Javelin Toss record created successfully", record: newJavelinToss });
    } catch (error) {
        console.error("Error recording Javelin Toss distance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editJavelinToss = async (req, res) => {
    try {
        const { id } = req.params;
        const { tossDistance, description } = req.body;
        // Find the record first to check ownership
        const record = await Javel
        inToss.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Javelin Toss record not found" });
        }
        // Check if the logged-in user owns this record
        if (record.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this record" });
        }
        record.tossDistance = tossDistance;
        record.description = description;
        await record.save();
        res.status(200).json({ message: "Javelin Toss record updated successfully", record });
    } catch (error) {
        console.error("Error editing Javelin Toss record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteJavelinToss = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record first to check ownership
        const record = await JavelinToss.findById(id);
        if (!record) {
            return res.status(404).json({ message: "Javelin Toss record not found" });
        }
        // Check if the logged-in user owns this record
        if (record.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record" });
        }
        await JavelinToss.findByIdAndDelete(id);
        res.status(200).json({ message: "Javelin Toss record deleted successfully" });
    } catch (error) {
        console.error("Error deleting Javelin Toss record:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};