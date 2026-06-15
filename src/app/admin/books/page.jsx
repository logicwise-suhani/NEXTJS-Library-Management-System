import { GetBooks } from "@/services/BookService";
import BookManagement from "./BookManagement";

export default function BookPage() {
    console.log("SERVER FETCHING BOOKS");

    const response = async () => await GetBooks();

    return (
        <BookManagement initialBooks={response.data} />
    )
}