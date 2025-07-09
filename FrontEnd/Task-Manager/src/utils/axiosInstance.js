import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout : 10000, // 10 seconds timeout
  headers : {
    "Content-Type": "application/json",
    "Accept": "application/json",        
  }
});

//Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle specific error responses
            if (error.response.status === 401) {
                // Unauthorized access, redirect to login or show a message
                console.error("Unauthorized access - redirecting to login");
                window.location.href = "/login"; // Redirect to login page
            } else if (error.response.status === 500) {
                // Internal server error, show a generic message
                console.error("Internal server error - please try again later");
            } else if (error.code === 'ECONNABORTED') {
                // Handle timeout error
                console.error("Request timed out - please try again later");
            }
            return Promise.reject(error.response.data);
        }
    }
);

export default axiosInstance;
