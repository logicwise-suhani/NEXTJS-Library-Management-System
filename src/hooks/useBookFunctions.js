import { CreateBooks, DeleteBook, GetBooks, IssueBooks, ReturnBooks, UpdateBooks } from "@/services/BookService";
import { validateBook } from "@/utils/validation";
import { useRef, useState } from "react";
import { Toast } from "@/utils/toast"; 

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
    const [bookErrors, setBookErrors] = useState({});
    const dialogRef = useRef(null);

    const handleBookChange = (e) => {
        setCreateBook({
            ...createBook,
            [e.target.name]: e.target.value,
        });
        setBookErrors({
            ...bookErrors,
            [e.target.name]: "",
        });
    }

    const handleCreateBook = async (e) => {
        e.preventDefault();

        const validateErrors = validateBook(createBook);
        if (Object.keys(validateErrors).length > 0) {
            setBookErrors(validateErrors);
            return;
        }

        try {
            const payload = {
                ...createBook,
                totalCopies: Number(createBook.totalCopies),
            };
            const createdBook = await CreateBooks(payload);
            // window.dispatchEvent(new Event("refresh-dashboard"));
            setBooks((prev) => [...prev, createdBook.data]);
            Toast.success("Book created successfully");
            setCreateBook({
                name: "",
                author: "",
                totalCopies: "",
                copies: [""],
            });
            setBookErrors({});
            dialogRef.current?.close();
        } catch (err) {
            Toast.error(err);
        }
    }

    const handleCreateBookDialog = () => {
        setEditBookId(null);
        setBookErrors({});
        setCreateBook({
            name: "",
            author: "",
            totalCopies: "",
            copies: [""],
        });
        dialogRef.current?.showModal();
    }

    const handleCopyChange = (index, value) => {
        const updatedCopies = [...createBook.copies];
        updatedCopies[index] = value.toUpperCase();
        setCreateBook({ ...createBook, copies: updatedCopies, });
        setBookErrors({ ...bookErrors, copies: "", });
    };

    const addCopyField = () => {
        setCreateBook((prev) => ({ ...prev, copies: [...prev.copies, ""], }));
    };

    const removeCopyField = (index) => {
        setCreateBook((prev) => ({ ...prev, copies: prev.copies.filter((_, i) => i !== index), }));
    };

    const handleEditBookClick = (book) => {
        setBookErrors({});
        setCreateBook({
            name: book.name,
            author: book.author,
            totalCopies: book.totalCopies,
            copies: Array.isArray(book.copies) ? book.copies.map((copy) => typeof copy === "string"
                ? copy : copy?.serialNumber || "") : [""]
        })
        setEditBookId(book._id);
    }

    const handleUpdateBook = async (e) => {
        e.preventDefault();

        const validateErrors = validateBook(createBook);
        if (Object.keys(validateErrors).length > 0) {
            setBookErrors(validateErrors);
            return;
        }

        try {
            const payloadBookData = {
                ...createBook,
                totalCopies: Number(createBook.totalCopies),
            }
            console.log(payloadBookData)
            const updatedBook = await UpdateBooks(editBookId, payloadBookData);
            setBooks((prev) => prev.map((book) => book._id === editBookId ? updatedBook.data : book))
            Toast.success("Book updated successfully");
            setCreateBook({
                name: "",
                author: "",
                totalCopies: "",
                copies: [""],
            })
            setEditBookId(null);
            setBookErrors({});
            dialogRef.current?.close();

        } catch (err) {
            Toast.error(err.response?.data?.message || "Failed to update book");
        }
    }

    const handleEditBookDialog = (book) => {
        if (editBookId !== book._id) {
            handleEditBookClick(book);
        }
        dialogRef.current?.showModal();
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await DeleteBook(bookId);
            Toast.success("Book Deleted Successfully");
        } catch (err) {
            Toast.error(err.response?.data?.message || "Failed to delete book")
        }
    }

    const submitIssueBook = async (issueData) => {
        console.log("Selected BookId:", selectedBookId)
        console.log("IssueData:", issueData)
        try {
            await IssueBooks(selectedBookId, issueData);
            const updatedBooks = await GetBooks();
            setBooks(updatedBooks.data)
            setShowIssueModal(false);
            Toast.success("Book issued successfully!");
        } catch (err) {
            Toast.error(err.response?.data?.message || "Failed to issue book!");
        }
    }

    const handleReturn = async (selectedBookId, serialNumber) => {
        try {
            await ReturnBooks(selectedBookId, { serialNumber });
            const updatedBooks = await GetBooks();
            setBooks(updatedBooks.data);
            Toast.success("Book returned successfully!");
        } catch (err) {
            Toast.error(err.response?.data?.message || "Failed to return book");
        }
    }

    return {
        setSelectedBookId, setSelectedSerial, setShowIssueModal, editBookId, setEditBookId, dialogRef,
        handleCreateBook, handleUpdateBook, handleBookChange, createBook, bookErrors, handleCreateBookDialog, handleCopyChange,
        addCopyField, removeCopyField, handleEditBookClick, handleEditBookDialog, handleDeleteBook, submitIssueBook, showIssueModal,
        selectedSerial, handleReturn
    }
}