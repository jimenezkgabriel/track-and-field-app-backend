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
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await user.isCorrectPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = signToken(user);
        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};