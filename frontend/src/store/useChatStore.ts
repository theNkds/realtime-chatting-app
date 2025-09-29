import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from './useAuthStore';

// Types pour User et Message
export interface User {
    _id: string;
    fullName: string;
    profilePic?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Message {
    _id?: string;
    senderId?: string;
    receiver?: string;
    text: string;
    image: string | ArrayBuffer | null;
    createdAt?: string;
    updatedAt?: string;
}

// Type du store Zustand
interface ChatStore {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (message: Message) => Promise<void>;
    setSelectedUser: (selectedUser: User | null) => void;
    subscribeToMessages: () => void;
    unSubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [] as Message[],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get<User[]>("/messages/users");
            set({ users: response.data });
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Error while fetching users");
            console.error("Error while fetching users:", error);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    sendMessage: async (messageData: Message) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post<Message>(
            `/messages/send/${selectedUser?._id}`,
            messageData
            );

            // ✅ Toujours concaténer sur un tableau
            set({
            messages: Array.isArray(messages)
                ? [...messages, response.data]
                : [response.data],
            });
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Error while sending messages");
            console.error("Error while sending messages:", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        
        // optimized
        socket?.on("newMessage", (newMessage: Message) => {
            const isMessageSentFromSelectedUser = newMessage.senderId !== selectedUser._id;
            if (isMessageSentFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        })
    },
    
    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get<Message[]>(`/messages/${userId}`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            set({ messages: response.data.messages });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.log(response.data.messages);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(error.response?.data?.message || "Error while fetching messages");
            console.error("Error while fetching messages:", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
}));
