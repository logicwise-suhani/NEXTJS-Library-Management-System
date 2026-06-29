import Image from "next/image";
import styles from "./hero.module.css";
import Header from "../Header/Header";

export default function Hero({ hero }) {

    return (
        <section className={styles.hero}>
            <Header />

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