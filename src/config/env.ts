const DEV_API_URL = "https://dev-api.divinemotherhood.studio/";
const PROD_API_URL = "https://api.divinemotherhood.studio/";

const API_URL =
    process.env.API_URL || (__DEV__ ? DEV_API_URL : PROD_API_URL);

export const ENV = {
    API_URL,
};