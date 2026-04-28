import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { ENV } from "../config/env";

const api = axios.create({
    baseURL: ENV.API_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default api;