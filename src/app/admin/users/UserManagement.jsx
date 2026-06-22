"use client"

import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import useUsers from "@/hooks/useUsers";
import { allFields, bookFields } from "@/utils/formFields";
import { useEffect, useState } from "react";
import useUserFunction from "@/hooks/useUserFunctions";
import useBookFunction from "@/hooks/useBookFunctions";
import DialogForm from "@/components/Form/DialogForm";
import Table from "@/components/Table/Table";
import { userColumns } from "@/utils/tableFields";

export default function UserManagement({ initialUsers = [], initialPagination }) {
    const [search, setSearch] = useState("");
    const userData = useUsers(initialUsers, initialPagination)

    const { users, loading, currentPage, totalPages, setCurrentPage, handleNextPage, handlePrevPage, fetchUsers } = userData;

    const { handleCreateUser, handleUpdateUser, handleEditDialog, handleCreateDialog, handleDelete, handleChange,
        handleDialogClose, dialogRef, editUserId, createUser, errors, filteredUsers } = useUserFunction({ search, users, currentPage, fetchUsers });

    const { createBook, addCopyField, handleCopyChange, removeCopyField, handleCreateBookDialog, handleBookChange,
        bookErrors, editBookId, handleUpdateBook, handleCreateBook } = useBookFunction();

    const [selectedType, setSelectedType] = useState("addStudentForm");
    const currentFields = allFields[selectedType] || bookFields || [];

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

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: "250px" }}>Loading users...</p>;
    }

    return (
        <>
            <div className="manage-users">

                <DialogForm
                    dialogRef={dialogRef}
                    handleDialogClose={handleDialogClose}
                    fields={currentFields}
                    values={selectedType === "addStudentForm" ? createUser : createBook}
                    errors={selectedType === "addStudentForm" ? errors : bookErrors}
                    onChange={selectedType === "addStudentForm" ? handleChange : handleBookChange}
                    onSubmit={selectedType === "addStudentForm" ? editUserId ? handleUpdateUser : handleCreateUser : editBookId ? handleUpdateBook : handleCreateBook}
                    submitLabel={editUserId ? "Update" : "Create"}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                >
                    {currentFields === bookFields &&
                        <>
                            <h4>Serial Numbers</h4>
                            {createBook.copies.map((copy, index) => (
                                <div key={index}
                                    style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center", }}
                                >
                                    <input
                                        placeholder="SN001"
                                        value={copy.serialNumber}
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

                {users.length > 0 ? (
                    <div className="view-users">
                        <div className="dialog-open-btn">
                            <Button onClick={selectedType === "addStudentForm" ? handleCreateDialog : handleCreateBookDialog} label="Create +" /> <br />
                        </div>
                        <SearchBar value={search} onChange={setSearch} />
                        <Table
                            columns={userColumns(handleEditDialog, handleDelete)}
                            data={filteredUsers}
                            getRowKey={(user) => user._id}
                        />
                    </div>
                ) : null}

                <div className="pagination">
                    <Button
                        label="Previous"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "active-page" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <Button
                        label="Next"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    />
                </div>
            </div>
        </>
    );
}