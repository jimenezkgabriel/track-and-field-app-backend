import { Schema, model } from "mongoose";

const javelinTossSchema = new Schema(
    {
        record: {
            type: Number,
            required: true,
            min: [0, 'Toss distance must be a non-negative number']
        },
        description: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Index for efficient queries by user and creation date
javelinTossSchema.index({ user: 1, createdAt: 1 });

const JavelinToss = model("JavelinToss", javelinTossSchema);
export default JavelinToss;