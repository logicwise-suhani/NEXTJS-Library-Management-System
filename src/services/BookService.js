import { apiClient } from "@/lib/api";

export async function CreateBooks(bookData) {
    const res = await apiClient.post("/book", bookData);
    console.log(res.data);
    return res.data;
};

export async function UpdateBooks(bookId, bookData) {
    const res = await apiClient.put(`/book/${bookId}`, bookData);
    return res.data;
};

export async function DeleteBook(bookId) {
    const res = await apiClient.delete(`/book/${bookId}`);
    return res.data;
};

export async function GetBooks() {
    const res = await apiClient.get("/book");
    return res.data;
};

export async function IssueBooks(bookId, issueData) {
    const res = await apiClient.post(`/book/issue/${bookId}`, issueData);
    return res.data;
};

export async function ReturnBooks(bookId, returnData) {
    const res = await apiClient.post(`/book/return/${bookId}`, returnData);
    return res.data;
};

export async function GetDashboardData() {
    const res = await apiClient.get("/book/dashboard");
    return res.data;
}; 