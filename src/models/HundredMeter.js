import { Schema, model } from "mongoose";
const hundredMeterSchema = new Schema({
    sprintTime: { type: Number, required: true, trim: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const HundredMeter = model("HundredMeter", hundredMeterSchema);
export default HundredMeter;