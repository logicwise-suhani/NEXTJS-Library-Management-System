"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/Button";

const initialState = {
    success: false,
    error: null,
    role: null,
    token: null,
};

export default function Login({ createFormAction }) {
    const router = useRouter();

    const [state, formAction, pending] = useActionState(createFormAction, initialState);

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

            if (state?.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/user");
            }

        }
    }, [state, router]);

    return (
        <div className="login">
            <div className="form">
                <form action={formAction}>

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                    />

                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                    />

                    <br />
                    <Button type="submit" disabled={pending} label={pending ? "Logging in..." : "Login"} />
                </form>
            </div>
        </div>
    );
}