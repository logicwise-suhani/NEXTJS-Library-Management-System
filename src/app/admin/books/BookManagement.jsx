"use client"

import Button from "@/components/Button/Button";
import Dashboard from "@/components/Dashboard/Dashboard";
import DialogForm from "@/components/Form/DialogForm";
import IssueBookModal from "@/components/IssueModal/IssueBookModal";
import SearchBar from "@/components/SearchBar/SearchBar";
import useBookFunction from "@/hooks/useBookFunctions";
import useBooks from "@/hooks/useBooks";
import useUserFunction from "@/hooks/useUserFunctions";
import { GetUsers } from "@/services/UserService";
import { allFields, bookFields } from "@/utils/formFields";
import { useEffect, useState } from "react";
import { Toast } from "@/utils/toast";
import styles from "./books.module.css";
import Table from "@/components/Table/Table";
import { adminBookColumns } from "@/utils/tableFields";

export default function BookManagement() {
    const { books, setBooks, loading } = useBooks();

    const [search, setSearch] = useState("");

    const { setSelectedBookId, setSelectedSerial, setShowIssueModal, editBookId, dialogRef,
        handleCreateBook, handleUpdateBook, handleBookChange, createBook, bookErrors, handleCreateBookDialog, showIssueModal, selectedBookId,
        handleCopyChange, addCopyField, removeCopyField, handleEditBookDialog, handleDeleteBook, submitIssueBook, selectedSerial, handleReturn } = useBookFunction(books, setBooks);

    const [selectedType, setSelectedType] = useState("addBookForm");
    const currentFields = allFields[selectedType] || bookFields || [];

    const { createUser, errors, handleChange, editUserId, handleCreateUser, handleUpdateUser, handleCreateDialog } =
        useUserFunction({ search: "", users: [], currentPage: 1, fetchUsers: () => { } });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handlePopState = () => {
            window.history.go(1);
        };
        window.addEventListener("popstate", handlePopState);
        window.history.pushState(null, "", window.location.href);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const allLoadedUser = await GetUsers({ page: 1, limit: 10 });
                setUsers(allLoadedUser);
            } catch (err) {
                Toast.error(err);
            }
        }
        loadUsers();
    }, [])

    if (loading) return <p style={{ textAlign: "center", marginTop: "250px" }}>Loading Books...</p>;

    const filteredBooks = books.filter(
        (book) => book.name.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className={styles.manageBooks}>

                <DialogForm
                    dialogRef={dialogRef}
                    handleDialogClose={() => dialogRef.current?.close()}
                    fields={currentFields}
                    values={selectedType === "addBookForm" ? createBook : createUser}
                    errors={selectedType === "addBookForm" ? bookErrors : errors}
                    onChange={selectedType === "addBookForm" ? handleBookChange : handleChange}
                    onSubmit={selectedType === "addBookForm" ? editBookId ? handleUpdateBook : handleCreateBook : editUserId ? handleUpdateUser : handleCreateUser}
                    submitLabel={editBookId ? "Update" : "Create"}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                >
                    {
                        currentFields === bookFields &&
                        <>
                            <h4>Serial Numbers</h4>
                            {createBook.copies.map((copy, index) => (
                                <div key={index}
                                    style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center", }}
                                >
                                    <input
                                        placeholder="SN001"
                                        value={copy}
                                        onChange={(e) => handleCopyChange(index, e.target.value)}
                                    />

                                    {index === createBook.copies.length - 1 && (
                                        <Button label="+" onClick={addCopyField} style={{ padding: "4px 10px", cursor: "pointer", }} />
                                    )}

                                    {createBook.copies.length > 1 && (
                                        <Button label="−" onClick={() => removeCopyField(index)} style={{ padding: "4px 10px", cursor: "pointer", }} />
                                    )}
                                </div>
                            ))}
                            {bookErrors.copies && <p style={{ color: "red" }}>{bookErrors.copies}</p>}
                        </>
                    }
                </DialogForm>

                <Dashboard /> <br />
                <div className="dialog-open-btn">
                    <Button onClick={selectedType === "addBookForm" ? handleCreateBookDialog : handleCreateDialog} label="Create +" />
                </div>

                {showIssueModal &&
                    <IssueBookModal
                        users={users}
                        book={books.find(b => b._id === selectedBookId)}
                        mode={showIssueModal}
                        setSelectedSerial={setSelectedSerial}
                        serialNumber={selectedSerial}
                        onIssue={submitIssueBook}
                        onReturn={handleReturn}
                        onClose={() => setShowIssueModal(null)} />}

                <SearchBar value={search} onChange={setSearch} />
                <div className={styles.viewBooks}>
                    <Table
                        columns={adminBookColumns(setSelectedBookId, setSelectedSerial, setShowIssueModal, handleEditBookDialog, handleDeleteBook)}
                        data={filteredBooks}
                        getRowKey={(book) => book._id}
                    />
                </div>
            </div >
        </>
    )
}