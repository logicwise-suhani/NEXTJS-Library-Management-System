import axios from "axios";

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
        const backendMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error.message || "Something went wrong";

        return Promise.reject({
            message: backendMessage,
            status: error?.response?.status,
            data: error?.response?.data,
        });
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