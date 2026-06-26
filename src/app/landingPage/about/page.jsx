import About from "@/components/About/About";
import { getPage } from "@/services/landingService";

export const metadata = {
    title: "About Us",
    description:
        "Know more about BookWorm Library Management System."
};

export default async function AboutSection() {

    const about = await getPage("about");

    return <About about={about} />;

}