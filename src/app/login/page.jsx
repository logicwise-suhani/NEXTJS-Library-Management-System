"use client"

import { useState } from "react";
import { login } from "@/lib/api";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fields } from "@/utils/formFields";

export default function Login() {

    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                router.push("/admin")
            } else {
                router.push("/user");
            }
        } catch (err) {
            toast.error(err);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const loginFields = fields.filter((field) => ["email", "password"].includes(field.name));

    return (
        <>
            <div className="login">

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        {loginFields.map((field) => (
                            <div key={field.name}>
                                <label>{field.name === "email" ? "Email"
                                    : field.name === "password" ? "Password"
                                        : field.name}: </label>
                                <input
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <Button type="submit" label="Login" />
                    </form>
                </div>
            </div>
        </>
    )
};
