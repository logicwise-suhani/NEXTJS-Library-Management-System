"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialState = {
    success: false,
    error: null,
    role: null,
    token: null,
};

export default function Login({ createFormAction }) {
    const router = useRouter();

    const [state, formAction, pending] = useActionState(
        createFormAction,
        initialState
    );

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }

        if (state?.success) {
            toast.success("Login successful");
            if (state?.token) {
                localStorage.setItem("token", state.token);
                localStorage.setItem("role", state.role);
            }

            setTimeout(() => {
                if (state?.role === "ADMIN") {
                    router.push("/admin");
                } else {
                    router.push("/user");
                }
            }, 500);
        }
    }, [state, router]);

    return (
        <form action={formAction}>

            <label>Email:</label>
            <input
                type="email"
                name="email"
            />

            <br />
            <label>Password:</label>
            <input
                type="password"
                name="password"
            />

            <br />
            <button type="submit" disabled={pending}>
                {pending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}