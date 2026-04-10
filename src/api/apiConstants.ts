import Config from 'react-native-config';

export const API_BASE_URL = Config.API_URL//'https://dev-api.divinemotherhood.studio/';
export const API_TIMEOUT = 15000;
export const GOOGLE_WEB_CLIENT_ID = Config.GOOGLE_WEB_CLIENT_ID;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    UPDATEUSER: '/users/update-profile',
    PREGNANCYDETAIL: '/api/v1/users/pregnancy-detail',
    REFRESH: '/auth/refresh-token',
  },
};
