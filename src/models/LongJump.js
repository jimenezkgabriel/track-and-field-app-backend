import { Schema, model } from "mongoose";

const longJumpSchema = new Schema({
    jumpDistance: { type: Number, required: true, trim: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const LongJump = model("LongJump", longJumpSchema);
export default LongJump;