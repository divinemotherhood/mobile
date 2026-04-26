import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { storage } from "@shared/utils/storage";
import { ENV } from "../config/env";

const api = axios.create({
    baseURL: ENV.API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// RESPONSE INTERCEPTOR (REFRESH TOKEN)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const { refreshToken } = useAuthStore.getState();

            try {
                const res = await axios.post(
                    "https://your-api.com/refresh",
                    { refreshToken }
                );

                const newToken = res.data.accessToken;

                useAuthStore.getState().setAuth({
                    accessToken: newToken,
                    refreshToken,
                    user: null,
                });

                await storage.set("accessToken", newToken);

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                useAuthStore.getState().clearAuth();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;