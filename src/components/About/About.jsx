export default function About({ about }) {
    return (
        <section className="about">
            <h1>{about.title}</h1>
            <p>{about.description}</p>
        </section>
    )
}