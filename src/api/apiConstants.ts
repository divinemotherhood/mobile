import Config from 'react-native-config';

export const API_BASE_URL = 'https://nonmethodical-ventriloquially-maximus.ngrok-free.dev';
export const API_TIMEOUT = 15000;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    UPDATEUSER: '/api/v1/users/update-profile',
    PREGNANCYDETAIL: '/api/v1/users/pregnancy-detail',
    REFRESH: '/auth/refresh-token',
  },
};
