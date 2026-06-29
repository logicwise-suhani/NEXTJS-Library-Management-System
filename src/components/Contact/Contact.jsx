import Header from "../Header/Header";
import styles from "./contact.module.css";

export default function Contact({ contact }) {
    return (
        <>
            <section className={styles.contact}>
                <Header />
                <h1>Contact Us</h1>

                <p>Email : {contact.email}</p>
                <p>Phone : {contact.phone}</p>
                <p>Address : {contact.address}</p>

            </section>
        </>
    )
}