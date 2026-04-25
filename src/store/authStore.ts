import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: any | null;
    isAuthenticated: boolean;

    setAuth: (data: any) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,

    setAuth: ({ accessToken, refreshToken, user }) =>
        set({
            accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
        }),

    clearAuth: () =>
        set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
        }),
}));