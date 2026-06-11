"use server";

import { login } from "@/lib/api";

export async function createFormAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const user = await login({ email, password });

        return {
            success: true,
            error: null,
            token: user.token,
            role: user.role,
        };

    } catch (err) {
        return {
            success: false,
            error: err?.message || "Login failed",
            token: null,
            role: null,
        };
    }
}