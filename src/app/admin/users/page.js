"use client";

import { useEffect, useState } from "react";
import { GetUsers } from "@/services/UserService";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await GetUsers({ page: 1, limit: 10 });
                setUsers(res.users);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {users.map((u) => (
                <div key={u._id}>{u.name}</div>
            ))}
        </div>
    );
}