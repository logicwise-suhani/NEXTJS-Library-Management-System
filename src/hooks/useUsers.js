"use client";

import { useEffect, useRef, useState } from "react";
import { GetUsers } from "@/services/UserService";
import { Toast } from "@/utils/toast";

export default function useUsers(initialUsers = [], initialPagination = {}) {
    const [users, setUsers] = useState(initialUsers);
    const [currentPage, setCurrentPage] = useState(initialPagination?.currentPage || 1);
    const [totalPages, setTotalPages] = useState(initialPagination?.totalPages || 1);
    const [loading, setLoading] = useState(false);

    const firstRender = useRef(true);
    const limit = 10;

    const fetchUsers = async (page) => {
        try {
            console.log(`CLIENT: Fetching users page=${page}`);
            setLoading(true);
            const response = await GetUsers({ page, limit });
            console.log("CLIENT: Response received", response);

            setUsers(response.users);
            setCurrentPage(response.pagination.currentPage);
            setTotalPages(response.pagination.totalPages);
        } catch (err) {
            Toast.error(err?.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(`CLIENT useEffect triggered | firstRender=${firstRender.current} | page=${currentPage}`);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return {
        users,
        setUsers,
        currentPage,
        setCurrentPage,
        totalPages,
        loading,
        fetchUsers,
        handleNextPage,
        handlePrevPage,
    };
}