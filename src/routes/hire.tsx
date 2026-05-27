import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/hire")({
  component: HirePage,
});

function HirePage() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] text-foreground">
      <Nav />
      <div className="fixed left-6 top-6 z-50 lg:left-12 lg:top-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[#F9F6F0]/85 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-foreground backdrop-blur-md transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.25} />
          Back to Home
        </Link>
      </div>

      <section className="mx-auto max-w-3xl px-6 pt-40 pb-32">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">STUDIO INQUIRY</p>
        <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.1]">
          Let's plan your next project.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
          Whether you are looking to design a minimalist villa, a modern tropical bungalow, or require high-end 3D visualizations, share your vision below and our team will get back to you.
        </p>

        <form className="mt-16 space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60">Your Name</label>
              <input type="text" placeholder="Gideon Eze" className="border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-foreground focus:outline-none" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-wider text-foreground/60">Email Address</label>
              <input type="email" placeholder="hello@studio.com" className="border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-foreground focus:outline-none" required />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60">Project Type</label>
            <select className="border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-foreground focus:outline-none text-foreground/80">
              <option value="residential">Residential Design</option>
              <option value="commercial">Commercial Design</option>
              <option value="tropical">Modern Tropical / Minimalist Villa</option>
              <option value="visualization">3D Archviz Mastery & Rendering</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-wider text-foreground/60">Project Details</label>
            <textarea rows={4} placeholder="Tell us about the location, estimated scale, or your design requirements..." className="border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-foreground focus:outline-none resize-none" required />
          </div>

          <button type="submit" className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90">
            Submit Studio Inquiry
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
