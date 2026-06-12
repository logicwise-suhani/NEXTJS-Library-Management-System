"use client"

import styles from "./button.module.css";

export default function Button({ onClick, label }) {

    return (
        <>
            <div className={styles.allButtons}>
                <button onClick={onClick}>{label}</button>
            </div>
        </>
    )

}; 