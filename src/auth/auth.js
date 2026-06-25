"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token) {
            router.replace(role === "ADMIN" ? "/admin" : "/user");
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setChecked(true);
        }
    }, [router]);

    if (!checked) return null;

    return children;
}