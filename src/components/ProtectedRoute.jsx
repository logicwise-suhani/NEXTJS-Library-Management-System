"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRole }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            router.replace("/about");
            // router.replace("/login");
            return;
        }

        if (allowedRole && role !== allowedRole) {
            router.replace("/unauthorized");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
    }, [router, allowedRole]);

    if (loading) return null;

    return <>{children}</>;
}