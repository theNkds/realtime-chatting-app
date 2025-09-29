import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    // baseURL: "https://realtime-chatting-app-yqaf.vercel.app/api",
    baseURL: "https://realtime-chatting-app-hcn1.onrender.com/api",
    withCredentials: true,
});

