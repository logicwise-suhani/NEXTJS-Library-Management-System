"use client"

import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import useUsers from "@/hooks/useUsers";
import { fields } from "@/utils/formFields";
import { useEffect, useState } from "react";
import useUserFunction from "@/hooks/useUserFunctions";

export default function UserManagement({ initialUsers = [], initialPagination }) {
    const [search, setSearch] = useState("");
    const userData = useUsers(initialUsers, initialPagination)

    const { users, loading, currentPage, totalPages, setCurrentPage, handleNextPage, handlePrevPage, fetchUsers } = userData;

    const { handleCreateUser, handleUpdateUser, handleEditDialog, handleCreateDialog, handleDelete, handleChange,
        handleDialogClose, dialogRef, editUserId, createUser, errors, filteredUsers } = useUserFunction({ search, users, currentPage, fetchUsers });

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
        return <p>Loading users...</p>;
    }

    return (
        <>
            <div className="manage-users">
                <dialog ref={dialogRef} className="dialog-form">
                    <div className="close-mark">
                        <Button onClick={handleDialogClose} label="❌" />
                    </div>
                    <form onSubmit={editUserId ? handleUpdateUser : handleCreateUser}>
                        {fields.map((field) => (
                            <div key={field.name}>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={createUser[field.name] ?? ""}
                                    onChange={handleChange}
                                />

                                {errors[field.name] && (
                                    <p style={{ color: "red" }}>
                                        {errors[field.name]}
                                    </p>
                                )}

                                <br />
                            </div>
                        ))}
                        <Button type="submit" label={editUserId ? "Update" : "Create"} />
                    </form>

                </dialog>

                {users.length > 0 ? (
                    <div className="view-users">
                        <div className="dialog-open-btn">
                            <Button onClick={handleCreateDialog} label="Create +" /> <br />
                        </div>
                        <SearchBar value={search} onChange={setSearch} />
                        <table border="1" cellPadding="12px">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>userName</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact}</td>
                                        <td>
                                            <div className="action-btns">
                                                <Button onClick={() => handleEditDialog(user)} label="Update" />
                                                <Button onClick={() => handleDelete(user._id)} label="Delete" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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