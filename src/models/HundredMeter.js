import { Schema, model } from "mongoose";
const hundredMeterSchema = new Schema(
    {
        record: {
            type: Number,
            required: true,
            min: [0, 'Sprint time must be a non-negative number']
        },
        description: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// Index for efficient queries by user and creation date
hundredMeterSchema.index({ user: 1, createdAt: 1 });

const HundredMeter = model("HundredMeter", hundredMeterSchema);
export default HundredMeter;