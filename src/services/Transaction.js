import { apiClient } from "@/lib/api";
import { getAuthHeaders } from "@/lib/authHeaders";

export async function GetTransaction({ page = 1, limit = 10 }) {
    const res = await apiClient.get(`/transaction?page=${page}&limit=${limit}`, {
        headers: getAuthHeaders()
    });
    return res.data.data.transactions;
}