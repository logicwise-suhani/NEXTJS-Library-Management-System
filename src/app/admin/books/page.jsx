import { GetBooks } from "@/services/BookService";
import BookManagement from "./BookManagement";

export const metadata = {
    title: "Books Management",
    description: "View and manage library books",
}

export default function BookPage() {
    console.log("SERVER FETCHING BOOKS");

    const response = async () => await GetBooks();

    return (
        <BookManagement initialBooks={response.data} />
    )
}