export const getAuthHeaders = () => {
    if (typeof window === "undefined") return {};

    const token = window.localStorage.getItem("token");

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}; 