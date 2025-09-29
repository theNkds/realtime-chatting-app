import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token)
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded)
            return res.status(401).json({ message: "Unauthorized - Invalid Token" }); 

        const user = await User.findById(decoded.userId).select("-password");

        if(!user)
            return res.status(401).json({ message: "User Not Found" });

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware : " + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Define the file storage configuration
const fileStorage = multer.diskStorage({
    // Define the filename for the uploaded files
    filename: function (req, file, cb) {
        // Generate a unique suffix for the filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // Combine the unique suffix with the original filename
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

// Define the file filter to validate the uploaded files
const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        // If the file is an image, accept it
        cb(null, true);
    } else {
        // If the file is not an image, reject it
        console.log("Unsupported file format, please upload an image file");
        cb(
            new Error(
                "Unsupported file format, please upload an image file of format png or jpg or jpeg"
            ),
            false
        );
    }
};

// Define the function to upload the file to Cloudinary
const uploadToCloudinary = async (file) => {
    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
        folder: "/madeAEat",
        use_filename: true,
        });
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};

// Define the function to extract the public ID from the secure URL
function extractPublicId(secureUrl) {
    // Split the secure URL by '/'
    const parts = secureUrl.split("/");
    // Find the part containing the public ID
    const publicIdPart = parts[parts.length - 1];
    // Remove the file extension
    const publicId = publicIdPart.split(".")[0];
    return publicId;
}

// Define the function to delete the file from Cloudinary
const deleteFileFromCloudinary = async (secure_url) => {
    try {
        // Delete the file from Cloudinary
        const publicId = extractPublicId(secure_url);
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw error;
    }
};

// Define the multer upload configuration
const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
});

// Export the upload, uploadToCloudinary, and deleteFileFromCloudinary functions
export { upload, uploadToCloudinary, deleteFileFromCloudinary };

