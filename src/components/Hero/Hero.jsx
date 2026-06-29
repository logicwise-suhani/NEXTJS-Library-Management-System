"use client"

import Image from "next/image";
import styles from "./hero.module.css";
import Button from "../Button/Button";
import { redirect, useRouter } from "next/navigation";
import { pages } from "@/lib/pages";

export default function Hero({ hero }) {

    const router = useRouter();

    return (
        <section className={styles.hero}>
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

            <div>
                <h1>{hero.title}</h1>
                <h2>{hero.subtitle}</h2>
                <p>{hero.description}</p>
            </div>

            <div>
                <Image src={hero.image} alt={hero.title} width={400} height={400} loading="eager" />
            </div>

        </section>
    )
}