import axios from "axios";
import { settings } from "../../config/config";
import { API_ENDPOINTS } from "../../enums/endpoints.enum";

const axiosInstance = axios.create({
    baseURL: settings.BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(new Error(error.message || "Something went wrong"));
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const excludeRoute = [API_ENDPOINTS.GET_INFO, API_ENDPOINTS.LOGIN, API_ENDPOINTS.REGISTRATION];

        const REDIRECT_STATUS_CODES = [401, 403, 429];
        if (
            error.response &&
            REDIRECT_STATUS_CODES.includes(error.response.status) &&
            !excludeRoute.includes(error?.config?.url)
        ) {
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

const _get = async (url, config) => {
    const response = await axiosInstance.get(url, config);
    return response;
};

const _post = async (url, data, config) => {
    const response = await axiosInstance.post(url, data, config);
    return response;
};

const _put = async (url, data, config) => {
    const response = await axiosInstance.put(url, data, config);
    return response;
};

const _delete = async (url, config) => {
    const response = await axiosInstance.delete(url, config);
    return response;
};

export {
    _get,
    _post,
    _put,
    _delete
};
