"use client";

import { redirect, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { pages } from "@/lib/pages";
import styles from "./header.module.css";

export default function Header() {

    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            {Object.keys(pages).map((page) => (
                <p key={page} onClick={() => {
                    if (page === "home") {
                        redirect("/");
                    } else {
                        router.push(`/${page}`)
                    }
                }}>{page}</p>
            ))}
            <Button label="Login" onClick={() => router.push("/login")} />
        </nav>
    )
}