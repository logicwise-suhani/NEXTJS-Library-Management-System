import About from "@/components/About/About";
import { getPage } from "@/services/landingService";
import { createMetadata } from "@/utils/metadata";

// export const metadata = {
//     title: "About Us",
//     description: "Know more about BookWorm Library Management System."
// };

export const metadata = createMetadata("About Us", "Know more about BookWorm Library Management System.");

export default async function AboutSection() {

    const about = await getPage("about");

    return <About about={about} />;

}