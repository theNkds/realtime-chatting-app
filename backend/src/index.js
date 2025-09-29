import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://realtime-chatting-app-nine.vercel.app',
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist"))); 

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     })
// }

// Get the MongoDB URI from the environment variables.
const uri = process.env.MONGODB_URI;

// Start the server.
const startServer = async () => {
    try {
        // Connect to the MongoDB database.
        await connectDB(uri);
        // Listen on the specified port.
        // app.listen(port, () => {
        //     console.log("Server is listening on port", port);
        // });
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`); 
            // connectDB();
        });
    } catch (error) {
        console.log(error); 
    }
};

// Start the server.
startServer();

