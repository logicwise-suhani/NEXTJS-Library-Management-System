import Contact from "@/components/Contact/Contact";
import { getPage } from "@/services/landingService";
import { createMetadata } from "@/utils/metadata";

// export const metadata = {
//     title: "Contact Us",
//     description: "Reach out in case of any inquiries or your feedback."
// };

export const metadata = createMetadata("Contact Us", "Reach out in case of any inquiries.");

export default async function ContactSection() {

    const data = await getPage("contact");

    return (
        <div>
            <Contact contact={data} />
        </div>
    )
}