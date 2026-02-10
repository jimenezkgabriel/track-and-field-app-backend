import {  Schema, model } from "mongoose";

const javelinTossSchema = new Schema({
    tossDistance: { type: Number, required: true, trim: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const JavelinToss = model("JavelinToss", javelinTossSchema);
export default JavelinToss;