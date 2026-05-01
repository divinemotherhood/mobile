import { create } from "zustand";

type AuthState = {
    user: any | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (data: any) => void;
    logout: () => void;
    firebaseUser: any | null;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    firebaseUser: null,

    setAuth: (data) => {
        const { accessToken, user, firebaseUser } = data;

        set({
            user,
            accessToken,
            isAuthenticated: true,
            firebaseUser,
        });
    },

    logout: () => {
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            firebaseUser: null,
        });
    },
}));