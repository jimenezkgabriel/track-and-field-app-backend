import { Schema, model } from "mongoose";

const longJumpSchema = new Schema(
    {
        record: {
            type: Number,
            required: true,
            min: [0, 'Jump distance must be a non-negative number']
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
longJumpSchema.index({ user: 1, createdAt: 1 });

const LongJump = model("LongJump", longJumpSchema);
export default LongJump;