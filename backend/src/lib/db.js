// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config();
// export const connectDB = async (uri) => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log("MongoDB connection error: ", error);
//     }
// }

import mongoose from "mongoose";

async function connectDB(url) {
    return await mongoose
        .connect(url)
        .then(() => console.log("Database connected successfully"));
}
 
export default connectDB; 