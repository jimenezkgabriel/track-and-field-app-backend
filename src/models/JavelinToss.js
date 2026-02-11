import { Schema, model } from "mongoose";

const javelinTossSchema = new Schema(
    {
        tossDistance: {
            type: Number,
            required: true,
            trim: true
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