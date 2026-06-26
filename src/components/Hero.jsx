import Image from "next/image";
import Button from "./Button/Button";

export default function Hero({ hero }) {
    return (
        <section className="hero">

            <div>
                <h1>{hero.title}</h1>
                <h2>{hero.subtitle}</h2>
                <p>{hero.description}</p>

                <Button label={hero.buttonText} />
            </div>

            <div>
                <Image src={hero.image} alt={hero.title} />
            </div>

        </section>
    )
}