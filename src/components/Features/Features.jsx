import styles from "./features.module.css";

export default function Features({ features }) {
    return (
        <section className={styles.features}>
            <h2>Why choose BookWorm?</h2>

            <div>
                {features.map((feature) => (
                    <div key={feature.title}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

        </section>
    )

}