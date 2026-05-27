import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RegistrationBar } from "@/components/RegistrationBar";
import { MissionVision } from "@/components/MissionVision";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    const saved = sessionStorage.getItem("homepageScrollPos");
    if (saved !== null) {
      const top = parseInt(saved, 10);
      if (!Number.isNaN(top)) {
        window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
      }
      sessionStorage.removeItem("homepageScrollPos");
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <RegistrationBar />
      <MissionVision />
      <Portfolio />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
