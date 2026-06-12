"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fields } from "@/utils/formFields";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const router = useRouter();

    const validate = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Enter a valid email address";
            valid = false;
        }

        if (!form.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

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

    const loginFields = fields.filter((field) =>
        ["email", "password"].includes(field.name)
    );

    return (
        <div className="login">
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