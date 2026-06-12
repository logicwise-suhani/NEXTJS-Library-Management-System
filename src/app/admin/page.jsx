"use client"

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SidePanel from "@/components/SidePanel";

export default function AdminDashboard() {

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
                <div className="manage-section">
                    <Navbar />
                    <SidePanel />
                </div>

                <div className="display-section">
                    <h2>Select a module</h2>
                </div>
            </div >
        </>
    );
}