import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,

    timeout: 10000,

    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR

axiosInstance.interceptors.request.use(
    async (config) => {
        console.log(
            "REQUEST =>",
            config.method?.toUpperCase(),
            config.url,
            config.data
        );

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(
            "RESPONSE =>",
            response.data
        );

        return response;
    },

    async (error) => {
        console.log(
            "API ERROR =>",
            error?.response?.data
        );

        return Promise.reject(error);
    }
);

export default axiosInstance;