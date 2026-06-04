import axios from "axios";

export const setupInterceptors = () => {
    axios.interceptors.request.use(
        async (config) => {
            // TOKEN

            const token = null;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            console.log(
                "REQUEST =>",
                config.method?.toUpperCase(),
                config.url
            );

            return config;
        },

        (error) => {
            console.log("REQUEST ERROR =>", error);

            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            console.log(
                "RESPONSE =>",
                response.status,
                response.config.url
            );

            return response;
        },

        async (error) => {
            console.log(
                "RESPONSE ERROR =>",
                error?.response?.status
            );

            // HANDLE 401

            if (error?.response?.status === 401) {
                console.log("Unauthorized");
            }

            return Promise.reject(error);
        }
    );
};