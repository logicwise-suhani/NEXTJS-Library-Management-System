import { CreateBooks } from "@/services/BookService";
import { validateBook } from "@/utils/bookValidation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useBookFunction(books, setBooks) {

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedSerial, setSelectedSerial] = useState("");
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [editBookId, setEditBookId] = useState(null);
    const [createBook, setCreateBook] = useState({
        name: "",
        author: "",
        totalCopies: "",
        copies: ["SN001"],
    });
    const [errors, setErrors] = useState({});
    const dialogRef = useRef(null);


    const handleChange = (e) => {
        setCreateBook({
            ...createBook,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    }

    const handleCreateBook = async (e) => {
        e.preventDefault();

        const validateErrors = validateBook(createBook);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }
        try {
            const payload = {
                ...createBook,
                totalCopies: Number(createBook.totalCopies),
            };
            const createdBook = await CreateBooks(payload);
            window.dispatchEvent(new Event("refresh-dashboard"));
            setBooks((prev) => [...prev, createdBook.data]);
            toast.success("Book created successfully");
            setCreateBook({
                name: "",
                author: "",
                totalCopies: "",
                copies: [""],
            });
            setErrors({});
            dialogRef.current?.close();
        } catch (err) {
            toast.error(err);
        }
    }

    const handleUpdateBook = () => {

    }

    const handleCreateDialog = () => {
        setEditBookId(null);
        setErrors({});
        setCreateBook({
            name: "",
            author: "",
            totalCopies: "",
            copies: [""],
        });
        dialogRef.current?.showModal();
    }

    return {
        setSelectedBookId, setSelectedSerial, setShowIssueModal, editBookId, setEditBookId, dialogRef,
        handleCreateBook, handleUpdateBook, handleChange, createBook, errors, handleCreateDialog
    }
}