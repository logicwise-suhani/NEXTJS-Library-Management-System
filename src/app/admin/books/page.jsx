import { GetBooks } from "@/services/BookService";
import BookManagement from "./BookManagement";
import { createMetadata } from "@/utils/metadata";

// export const metadata = {
//     title: "Library Management",
//     description: "View and manage library books",
// }

export const metadata = createMetadata("Library Management", "View and manage library books");

export default function BookPage() {
    console.log("SERVER FETCHING BOOKS");

    const response = async () => await GetBooks();

    return (
        <BookManagement initialBooks={response.data} />
    )
}