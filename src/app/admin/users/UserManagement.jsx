"use client"

import { useRef, useState } from "react";
import { CreateUsers, DeleteUser, UpdateUsers } from "@/services/UserService";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { validateUser } from "@/utils/userValidation";
import useUsers from "@/hooks/useUsers";

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

    async function handleUpdateUser(e) {
        e.preventDefault();

        const validateErrors = validateUser(createUser, users, editUserId, true);
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }

        try {
            const payload = {
                name: createUser.name,
                userName: createUser.userName,
                email: createUser.email,
                contact: createUser.contact,
            };

            if (createUser.password.trim()) {
                payload.password = createUser.password;
            }
            await UpdateUsers(editUserId, payload);
            fetchUsers(currentPage);
            toast.success("User updated successfully");

            setCreateUser({
                name: "",
                userName: "",
                email: "",
                password: "",
                contact: "",
            });
            setErrors({});
            setEditUserId(null);
            dialogRef.current?.close();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update user");
        }
    }

    async function handleDeleteUser(userId) {
        try {
            await DeleteUser(userId);
            fetchUsers(currentPage);
            toast.success("User deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete user");
        }
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
                        <input
                            name="name"
                            placeholder="Name"
                            value={createUser.name}
                            onChange={handleChange}
                        />{errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        <br />
                        <input
                            name="userName"
                            placeholder="userName"
                            value={createUser.userName}
                            onChange={handleChange}
                        />{errors.userName && <p style={{ color: "red" }}>{errors.userName}</p>}
                        <br />
                        <input
                            name="email"
                            placeholder="Email"
                            value={createUser.email}
                            onChange={handleChange}
                        />{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={createUser.password}
                            onChange={handleChange}
                        />{errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <br />
                        <input
                            name="contact"
                            placeholder="Contact"
                            value={createUser.contact}
                            onChange={handleChange}
                        />{errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}
                        <br />
                        {errors.duplicate && (<p style={{ color: "red" }}>{errors.duplicate}</p>)}
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
                                                <Button
                                                    onClick={() => handleEditDialog(user)}
                                                    label="Update"
                                                />
                                                <Button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    label="Delete"
                                                />
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