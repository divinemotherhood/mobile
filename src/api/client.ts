import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { mmkv, TOKEN_KEYS } from '../services/storage/mmkv';
import { useAuthStore } from '../store/useAuthStore';
import { API_BASE_URL, API_TIMEOUT, ENDPOINTS } from './apiConstants';

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  headers?: Record<string, string>;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    if (__DEV__) {
      console.log('[API REQUEST]', config.method, config.url);
      console.log('[API REQUEST DATA]', config.data);
    }

    const accessToken = mmkv.getString(TOKEN_KEYS.accessToken);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('[API RESPONSE]', response.config.url, response.status);
      console.log('[API RESPONSE DATA]', response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = mmkv.getString(TOKEN_KEYS.refreshToken);

      if (!refreshToken) {
        mmkv.delete(TOKEN_KEYS.accessToken);
        mmkv.delete(TOKEN_KEYS.refreshToken);
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      try {
        const tokenResponse = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
          { refresh_token: refreshToken },
        );

        const { accessToken, refreshToken: newRefreshToken } = tokenResponse.data;

        if (accessToken) {
          mmkv.set(TOKEN_KEYS.accessToken, accessToken);
        }
        if (newRefreshToken) {
          mmkv.set(TOKEN_KEYS.refreshToken, newRefreshToken);
        }

        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);

        mmkv.delete(TOKEN_KEYS.accessToken);
        mmkv.delete(TOKEN_KEYS.refreshToken);
        useAuthStore.getState().logout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
