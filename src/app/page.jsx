import About from "@/components/About/About";
import Features from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import { getPage } from "@/services/landingService";

export default function Home() {

  const home = getPage("home");

  return (
    <div className="home-page">
      <Hero hero={home.hero} />

      <Features features={home.features} />
    </div>
  )
}
