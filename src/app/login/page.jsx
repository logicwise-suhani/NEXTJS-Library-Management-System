"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fields } from "@/utils/formFields";
import { validate } from "@/utils/adminValidation";
import Image from "next/image";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { valid, newErrors } = validate(form);
        setErrors(newErrors);
        if (!valid) return;

        try {
            const data = await login(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        } catch (err) {
            toast.error(err?.message || "Login failed");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const loginFields = fields.filter((field) => ["email", "password"].includes(field.name));

    return (
        <div className="login">

            <div className="library-image">
                <Image src="/library.jpg" alt="Library" width={500} height={500} loading="eager" />
            </div>

            <div className="lib-text">
                <h1>Welcome to Library!</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    {loginFields.map((field) => (
                        <div key={field.name} style={{ marginBottom: "12px" }}>
                            <label>
                                {field.name === "email" ? "Email"
                                    : field.name === "password" ? "Password"
                                        : field.name}: {' '}
                            </label>

                            <input
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.name === "password" ? "password" : "text"}
                                value={form[field.name]}
                                onChange={handleChange}
                                style={{
                                    border: errors[field.name]
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                }}
                            />
                            {errors[field.name] && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}

                    <Button type="submit" label="Login" />
                </form>
            </div>
        </div>
    );
}