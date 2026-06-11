"use client"

import { useEffect } from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

    const router = useRouter();

    useEffect(() => {
        const handlePopState = () => {
            window.history.go(1);
        };
        window.addEventListener("popstate", handlePopState);
        window.history.pushState(null, "", window.location.href);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <>
            <div className="admin-dashboard">
                <div>
                    <Navbar />
                    <div className="side-panel">
                        <h3>Library</h3>
                        <div className="side-panel-btns">
                            <Button onClick={() => router.push("/admin/users")} label="Manage Users" />
                            <Button onClick={() => router.push("/admin/books")} label="Manage Library" />
                        </div>
                    </div>
                </div>

                <div className="display-section">
                    <h2>Select a module</h2>
                </div>
            </div >
        </>
    );
}