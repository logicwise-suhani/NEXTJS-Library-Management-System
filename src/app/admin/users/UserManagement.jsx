"use client"

import { GetUsers } from "@/services/UserService";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function UserManagement({ initialUsers = [], initialPagination }) {

    const [users, setUsers] = useState(initialUsers);

    const fetchUsers = async () => {

        try {
            const allUsers = await GetUsers({ page: 1, limit: 10 });
            setUsers(allUsers);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])


    return (
        <>
            {users.map((user) => (
                <div key={user._id}>
                    <p>{user.userName}</p>

                </div>
            ))}
        </>
    )
}
