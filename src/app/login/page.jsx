"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import Button from "@/components/Button/Button";
import { Toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { loginFields } from "@/utils/formFields";
import { validate } from "@/utils/validation";
import Image from "next/image";
import Form from "@/components/Form/Form";
import styles from "@/components/Form/form.module.css";
import AuthGuard from "@/auth/auth";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "", login: "" });
    const [errors, setErrors] = useState({ email: "", password: "", login: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { valid, newErrors } = validate(form);
        setErrors(newErrors);
        if (!valid) return;

        try {
            const data = await login(form);
            if (data.role.toUpperCase() !== form.login.toUpperCase()) {
                setErrors(prev => ({
                    ...prev,
                    login: "Selected role does not match this account"
                }));
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        } catch (err) {
            Toast.error(err?.message || "Login failed");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return (
        <AuthGuard>
            <div className="login">

                <div className="library-image">
                    <Image src="/library.jpg" alt="Library" width={500} height={500} loading="eager" />
                </div>

                <div className="lib-text">
                    <h1>Welcome  <br /> to Library!</h1>
                </div>
                <div className={styles.form}>
                    <Form
                        fields={loginFields}
                        values={form}
                        errors={errors}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        showLabels={true}
                        submitButton={<Button type="submit" label="Login" />}
                    />
                </div>
            </div>
        </AuthGuard>
    );
}