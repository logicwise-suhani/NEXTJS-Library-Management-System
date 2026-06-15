"use client"

import { GetBooks } from "@/services/BookService"
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useBooks(initialBooks = []) {

    const [books, setBooks] = useState(initialBooks);
    const firstRender = useRef(true);

    const fetchBooks = async () => {
        try {
            const response = await GetBooks();
            console.log("Response in client: ", response)
            setBooks(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch books");
        }
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        fetchBooks();
    }, [])



    return {
        books,
    }
}