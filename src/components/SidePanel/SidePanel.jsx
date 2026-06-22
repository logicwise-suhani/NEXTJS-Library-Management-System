"use client"

import { useRouter } from "next/navigation"
import Button from "../Button/Button";
import styles from "./sidePanel.module.css";

export default function SidePanel() {

    const router = useRouter();

    return (
        <div className={styles.sidePanel}>
            <h3>Library</h3>
            <div className={styles.sidePanelBtns}>
                <Button onClick={() => router.push("/admin/users")} label="Manage Users" />
                <Button onClick={() => router.push("/admin/books")} label="Manage Library" />
            </div>
        </div>
    )
} 