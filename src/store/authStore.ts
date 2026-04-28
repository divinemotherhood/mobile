import { create } from "zustand";

type AuthState = {
    user: any | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (data: any) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,

    setAuth: (data) => {
        const { accessToken, user } = data;

        set({
            user,
            accessToken,
            isAuthenticated: true,
        });
    },

    logout: () => {
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
        });
    },
}));