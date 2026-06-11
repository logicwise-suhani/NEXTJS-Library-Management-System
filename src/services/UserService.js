import { apiClient } from "@/lib/api";

export async function CreateUsers(userData) {
    const res = await apiClient.post("/user", userData);
    return res.data;
};

export async function UpdateUsers(userId, userData) {
    const res = await apiClient.put(`/user/${userId}`,
        { updateUser: userData });
    return res.data;
};

export async function DeleteUser(userId) {
    const res = await apiClient.delete(`/user/${userId}`);
    return res.data;
};

export async function GetUsers({ page = 1, limit = 10 }) {
    console.log(`API CALL: GetUsers page=${page}`);
    const res = await apiClient.get(`/user?page=${page}&limit=${limit}`);
    return {
        users: res.data.data.users,
        pagination: res.data.data.pagination
    }
};   