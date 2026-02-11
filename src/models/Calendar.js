import { Schema, model } from "mongoose";

const calendarSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },
        date: {
            type: Date,
            required: true
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

// Index for efficient queries by user and date
calendarSchema.index({ user: 1, date: 1 });

const Calendar = model("Calendar", calendarSchema);
export default Calendar;
