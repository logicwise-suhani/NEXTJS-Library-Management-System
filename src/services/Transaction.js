import { apiClient } from "@/lib/api";

export async function GetTransaction({ page = 1, limit = 10 }) {
    const res = await apiClient.get(`/transaction?page=${page}&limit=${limit}`);
    return res.data.data.transactions;
}