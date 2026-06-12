import { CreateUsers, DeleteUser, UpdateUsers } from "@/services/UserService";
import { validateUser } from "@/utils/userValidation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function useUserFunction({ search, users, currentPage, fetchUsers }) {
    const [createUser, setCreateUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        contact: "",
    });
    const [editUserId, setEditUserId] = useState(null);
    const [errors, setErrors] = useState({});
    const dialogRef = useRef(null);

    const resetForm = () => {
        setCreateUser({
            name: "",
            userName: "",
            email: "",
            password: "",
            contact: "",
        });
        setErrors({});
        setEditUserId(null);
    };

    const handleDialogClose = () => {
        dialogRef.current?.close();
    };

    const handleCreateUser = async (e) => {
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
            handleDialogClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create user");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateUser((prev) => ({ ...prev, [name]: value, }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "", }));
        }
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

    const handleEditDialog = (user) => {
        handleEditClick(user);
        dialogRef.current?.showModal();
    };

    const handleCreateDialog = () => {
        resetForm();
        dialogRef.current?.showModal();
    };

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
            handleDialogClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update user");
        }
    }

    const handleDelete = async (userId) => {
        try {
            await DeleteUser(userId);
            fetchUsers(currentPage);
            toast.success("User Deleted Successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete user")
        }
    }

    const filteredUsers = users.filter(
        (user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.userName.toLowerCase().includes(search.toLowerCase()) || user.contact.toString().includes(search)
    );

    return {
        handleCreateUser,
        handleUpdateUser,
        handleEditDialog,
        handleCreateDialog,
        handleDelete,
        handleChange,
        handleDialogClose,
        dialogRef,
        editUserId,
        createUser,
        errors,
        filteredUsers
    }
}