"use client"

import { useRef, useState } from "react";
import { CreateUsers, DeleteUser, UpdateUsers } from "@/services/UserService";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { validateUser } from "@/utils/userValidation";
import useUsers from "@/hooks/useUsers";
import { fields } from "@/utils/formFields";

export default function UserManagement({ initialUsers = [], initialPagination }) {
    const [createUser, setCreateUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        contact: "",
    });
    const [editUserId, setEditUserId] = useState(null);
    const [search, setSearch] = useState("");
    const dialogRef = useRef(null);
    const [errors, setErrors] = useState({});
    const { users, currentPage, totalPages, loading, setCurrentPage, fetchUsers,
        handleNextPage, handlePrevPage } = useUsers(initialUsers, initialPagination);

    if (loading) {
        return <p>Loading users...</p>;
    }

    async function handleCreateUser(e) {
        e.preventDefault();

        const validateErrors = validateUser(createUser, users, editUserId, false);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }
        try {
            await CreateUsers(createUser);
            fetchUsers(currentPage);
            toast.success("User created successfully");
            setCreateUser({
                name: "",
                userName: "",
                email: "",
                password: "",
                contact: "",
            });
            setErrors({});
            dialogRef.current?.close();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create user");
        }
    }

    const handleChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    function handleEditClick(user) {
        if (editUserId === user._id) {
            return;
        }
        setErrors({});
        setCreateUser({
            name: user.name,
            userName: user.userName,
            email: user.email,
            password: "",
            contact: user.contact,
        });
        setEditUserId(user._id);
    }

    const handleCreateDialog = () => {
        setEditUserId(null);
        setErrors({});
        setCreateUser({
            name: "",
            userName: "",
            email: "",
            password: "",
            contact: "",
        });
        dialogRef.current?.showModal();
    };

    const handleEditDialog = (user) => {
        handleEditClick(user);
        dialogRef.current?.showModal();
    };

    const handleDialogClose = () => {
        dialogRef.current?.close();
    };

    const filteredUsers = users.filter(
        (user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.userName.toLowerCase().includes(search.toLowerCase()) || user.contact.toString().includes(search)
    );

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
                                    value={createUser[field.name]}
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
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact}</td>
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