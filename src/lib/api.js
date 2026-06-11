import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 && typeof window !== "undefined") {
            const token = localStorage.getItem("token");

            if (token) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                toast.error("Session expired. Please login again.");

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
                return Promise.reject("Session expired");
            }
        }

        let message = "Something went wrong";

        if (error.response) {
            switch (status) {
                case 400:
                    message = error.response.data?.message || "Bad Request";
                    break;
                case 401:
                    message = error.response.data?.message || "Unauthorized";
                    break;
                case 403:
                    message = error.response.data?.message || "Forbidden";
                    break;
                case 404:
                    message = error.response.data?.message || "Resource Not Found";
                    break;
                case 500:
                    message = error.response.data?.message || "Internal Server Error";
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        } else if (error.request) {
            message = "Network error. Please check your internet connection.";
        }

        return Promise.reject(message);
    }
);

export async function login(form) {
    const res = await apiClient.post("/auth/sign-in", form);

    return {
        token: res.data.data.accessToken,
        role: res.data.data.role,
        name: res.data.data.name,
        email: res.data.data.email,
    };
}