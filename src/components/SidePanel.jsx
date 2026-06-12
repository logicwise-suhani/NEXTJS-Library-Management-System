"use client"

import { useRouter } from "next/navigation"
import Button from "./Button";

export default function SidePanel() {

    const router = useRouter();

    return (
        <div className="side-panel">
            <h3>Library</h3>
            <div className="side-panel-btns">
                <Button onClick={() => router.push("/admin/users")} label="Manage Users" />
                <Button onClick={() => router.push("/admin/books")} label="Manage Library" />
            </div>
        </div>
    )
}