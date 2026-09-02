import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MediaSection } from "@/components/MediaSection";
import { Credentials } from "@/components/Credentials";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Credentials />
        <MediaSection />
        <Benefits />
        <Process />
        <Founder />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
