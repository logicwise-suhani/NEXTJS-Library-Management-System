import { apiClient } from "@/lib/api";
import { getAuthHeaders } from "@/lib/authHeaders";

export async function CreateUsers(userData) {
    const res = await apiClient.post("/user", userData, {
        headers: getAuthHeaders(),
    });

    return res.data;
};

export async function UpdateUsers(userId, userData) {
    const res = await apiClient.put(`/user/${userId}`,
        { updateUser: userData },
        {
            headers: getAuthHeaders(),
        });
    return res.data;
};

export async function DeleteUser(userId) {
    const res = await apiClient.delete(`/user/${userId}`,
        {
            headers: getAuthHeaders(),
        }
    );
    return res.data;
};

export async function GetUsers({ page = 1, limit = 10 }) {
    const res = await apiClient.get(`/user?page=${page}&limit=${limit}`,
        {
            headers: getAuthHeaders(),
        }
    );

    return {
        users: res.data.data.users,
        pagination: res.data.data.pagination
    }
};   