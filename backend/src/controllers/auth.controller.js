import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import { uploadToCloudinary } from '../middleware/auth.moddleware.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import path from 'path';
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        // verify informations 
        if (!fullName || !email || !password)
            return res.status(400).json({ message : "All fields are required" });
        // hash password
        if (password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters" });
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({ message : "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password : hashedPassword
        });

        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json(newUser);
            
        } else {
            res.status(400).json({ message : "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller : " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        generateToken(user._id, res);

        res.status(201).json(user);
    } catch (error) {
        console.log("Error in login controller : " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
} 

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller : " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const profilePic = req.file;
        const userId = req.user._id;

        // console.log(profilePic);

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // On normalise le chemin vers un format compatible (POSIX)
        const normalizedPath = path.normalize(profilePic.path).replace(/\\/g, "/");

        // console.log(normalizedPath)

        const uploadResponse = await cloudinary.uploader.upload(normalizedPath, {
            folder: "/profile_pics",
            use_filename: true,
            resource_type: "image",
        });
        if (!uploadResponse) {
            return res.status(500).json({ message: "Failed to upload profile picture" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check auth controller : " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}