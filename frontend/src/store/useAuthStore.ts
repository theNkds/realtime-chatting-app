import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

// const BASE_URL: string = import.meta.env.MODE === "development" ? "http://localhost:5001/" : "/";
// const BASE_URL: string = "https://realtime-chatting-app-yqaf.vercel.app/";
// Définition du type utilisateur (à adapter selon ton backend)
export interface AuthUser {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
    createdAt?: string;
    updatedAt?: string;
  // ajoute les autres champs si nécessaires
}

// Type pour signup
export interface SignupData {
    fullName: string;
    email: string;
    password: string;
}

// Type pour login
export interface LoginData {
    email: string;
    password: string;
}

// Type pour updateProfile
export interface UpdateProfileData {
    profilePic: string | ArrayBuffer | null;
}

// Définition de l’état et des actions du store
interface AuthState {
    authUser: AuthUser | null;
    isSigninUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[],
    socket: Socket | null,
    
    checkAuth: () => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: FormData) => Promise<void>;
    connectSocket(): unknown;
    disconnectSocket(): unknown;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get<AuthUser>("/auth/check");
            set({ authUser: response.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth : ", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data: SignupData) => {
        set({ isSigninUp: true });
        try {
            const response = await axiosInstance.post<AuthUser>("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigninUp: false });
        }
    },

    login: async (data: LoginData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("Legged in successfully");
            get().connectSocket();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "login failed");
        } finally {
            set({ isLoggingIn : false });
        }
    },
    
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (formData: FormData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Update failed");
            console.log("Error updating profile: ", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(
            // BASE_URL, 
            // "https://realtime-chatting-app-yqaf.vercel.app/", 
            "https://realtime-chatting-app-hcn1.onrender.com", 
            {
                query: {
                    userId: authUser._id,
                },
                withCredentials: true,
                transports: ["websocket"], // évite les problèmes de polling
            }
        );
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds: string[]) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect();
    }

}));
