import Contact from "@/components/Contact/Contact";
import { getPage } from "@/services/landingService"

export default async function ContactSection() {

    const data = await getPage("contact");

    return (
        <div>
            <Contact contact={data.contact} />
        </div>
    )
}