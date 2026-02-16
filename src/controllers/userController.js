import User from "../models/User.js";
import { signToken } from "../utils/auth.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser);
        res.status(201).json({ message: "User created successfully", token, user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Use generic message to prevent user enumeration
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const isPasswordValid = await user.isCorrectPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const token = signToken(user);
        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editUserEvents = async (req, res) => {
    try {
        const { eventsInvolved } = req.body;
        console.log("request body:", req.body);
        console.log("eventsInvolved:", eventsInvolved);
        console.log("user ID from token:", req.user._id);
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { eventsInvolved },
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "User events updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};