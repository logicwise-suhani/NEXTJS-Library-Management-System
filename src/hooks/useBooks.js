import { GetBooks } from "@/services/BookService"
import { useEffect, useRef, useState } from "react";
import { Toast } from "@/utils/toast";

export default function useBooks(initialBooks = []) {

    const [books, setBooks] = useState(initialBooks);
    const firstRender = useRef(true);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await GetBooks();
            console.log("Response in client: ", response)
            setBooks(response.data);
        } catch (err) {
            Toast.error(err.response?.data?.message || "Failed to fetch books");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // if (firstRender.current) {
        //     firstRender.current = false;
        //     return;
        // }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBooks();
    }, [])

    return { books, setBooks, loading, fetchBooks };
}