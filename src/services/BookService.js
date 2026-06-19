import { apiClient } from "@/lib/api";
import { getAuthHeaders } from "@/lib/authHeaders";

export async function CreateBooks(bookData) {
    const res = await apiClient.post("/book", bookData, {
        headers: getAuthHeaders()
    });
    console.log(res.data);
    return res.data;
};

export async function UpdateBooks(bookId, bookData) {
    const res = await apiClient.put(`/book/${bookId}`, bookData, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export async function DeleteBook(bookId) {
    const res = await apiClient.delete(`/book/${bookId}`, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export async function GetBooks() {
    const res = await apiClient.get("/book", {
        headers: getAuthHeaders()
    });
    return res.data;
};

export async function IssueBooks(bookId, issueData) {
    const res = await apiClient.post(`/book/issue/${bookId}`, issueData, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export async function ReturnBooks(bookId, serialNumber) {
    const res = await apiClient.post(`/book/return/${bookId}`, serialNumber, {
        headers: getAuthHeaders()
    });
    return res.data;
};

export async function GetDashboardData() {
    const res = await apiClient.get("/book/dashboard", {
        headers: getAuthHeaders()
    });
    return res.data;
}; 