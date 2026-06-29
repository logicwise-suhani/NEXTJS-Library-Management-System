import Header from "../Header/Header";
import styles from "./about.module.css";

export default function About({ about }) {
    return (
        <>
            <section className={styles.about}>
                <Header />
                <h1>{about.title}</h1>
                <p>{about.description}</p>
            </section>
        </>
    )
}