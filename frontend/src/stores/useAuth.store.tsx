import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib.ts";

interface AuthState {
    authUser: any;
    isCheckingAuth: boolean;
    isSigningIn: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;

    signup: (data : {name: string, email: string, password: string}) => Promise<void>;
    login: (data : {email: string, password: string}) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningIn: false,
    isSigningUp: false,
    isLoggingIn: false,


    signup: async (data : {name: string, email: string, password: string})=>{
        try {
            set({isSigningUp: true})
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
        } catch (error) {
            set({ isSigningUp: false });
            console.log("Error in signup: " + error);
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data : {email: string, password: string})=>{
        try {
            set({isLoggingIn: true})
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
        } catch (error) {
            set({ isLoggingIn: false });
            console.log("Error in login: " + error);
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: () => {
        set({ authUser: null });
    },

}));