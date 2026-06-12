"use client"

import { useState } from "react";
import { login } from "@/lib/api";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

    return (
        <>
            <div className="login">

                <div className="form">
                    <form onSubmit={handleSubmit}>

                        Email:{" "}
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <br /> <br />
                        Password:{" "}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <br /> <br />
                        <Button type="submit" label="Login" />
                    </form>
                </div>
            </div>
        </>
    )
};
