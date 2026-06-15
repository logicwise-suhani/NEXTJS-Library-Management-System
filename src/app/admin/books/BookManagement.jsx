"use client"

import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import SearchBar from "@/components/SearchBar/SearchBar";
import useBookFunction from "@/hooks/useBookFunctions";
import useBooks from "@/hooks/useBooks";
import { bookFields } from "@/utils/formFields";
import { useEffect, useState } from "react";

export default function BookManagement() {
    const { books, setBooks, loading } = useBooks();

    const [search, setSearch] = useState("");

    const { setSelectedBookId, setSelectedSerial, setShowIssueModal, editBookId, dialogRef,
        handleCreateBook, handleUpdateBook, handleChange, createBook, errors, handleCreateDialog } = useBookFunction(books, setBooks);

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

    if (loading) return <p style={{ textAlign: "center", marginTop: "250px" }}>Loading Books...</p>;

    const filteredBooks = books.filter(
        (book) => book.name.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="manage-books">

                <dialog ref={dialogRef} className="dialog-form">
                    <div className="close-mark">
                        <Button onClick={() => dialogRef.current?.close()} label="❌" />
                    </div>

                    <Form
                        fields={bookFields}
                        onSubmit={editBookId ? handleUpdateBook : handleCreateBook}
                        onChange={handleChange}
                        values={createBook}
                        errors={errors}
                        submitButton={<Button type="submit" label={editBookId ? "Update" : "Create"} />}
                        showLabels={true}
                    >
                        <h4>Serial Numbers</h4>
                    </Form>
                </dialog>

                <div className="dialog-open-btn">
                    <Button onClick={handleCreateDialog} label="Create +" />
                </div>

                <SearchBar value={search} onChange={setSearch} />
                <div className="view-books">
                    <table border={1} cellPadding={12}>
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Total Copies</th>
                                <th>Issued Copies</th>
                                <th>Available Copies</th>
                                <th>Copies</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBooks.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.totalCopies}</td>
                                    <td>{book.copies.filter(copy => !copy.isAvailable).length}</td>
                                    <td>{book.copies.filter(copy => copy.isAvailable).length}</td>
                                    <td>
                                        <div className="issue-btns">
                                            {book.copies.map(copy => (
                                                <div key={copy._id}>
                                                    <span>{copy.serialNumber}</span>
                                                    {copy.isAvailable ? (
                                                        <Button label="Issue" onClick={() => {
                                                            setSelectedBookId(book._id);
                                                            setSelectedSerial(copy.serialNumber);
                                                            setShowIssueModal(true);
                                                        }} />
                                                    ) : (<Button label="Return" />)}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <Button label="Update" />
                                            <Button label="Delete" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div>
            </div >
        </>
    )
}