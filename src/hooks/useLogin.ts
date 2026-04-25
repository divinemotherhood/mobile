import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/endpoints/auth.api";
import { useAuthStore } from "../store/authStore";
import { secureStorage } from "@shared/utils/storage";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);

    return useMutation({
        mutationFn: ({ email, password }: any) =>
            loginApi(email, password),

        onSuccess: async (data) => {
            const { accessToken, refreshToken, user } = data;

            await secureStorage.setTokens(accessToken, refreshToken);

            setAuth({ accessToken, refreshToken, user });
        },
    });
};