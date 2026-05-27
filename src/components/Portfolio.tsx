import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import resClassical1 from "@/assets/res-classical-1.jpg";
import resModern1 from "@/assets/res-modern-1.jpg";
import resBungalow1 from "@/assets/res-bungalow-1.jpg";
import resBungalow2 from "@/assets/res-bungalow-2.jpg";

type Cat = "All" | "Residential" | "Commercial" | "Modern Tropical" | "Hospitality";

const items: { src: string; title: string; place: string; cat: Cat; ratio: string; position?: string }[] = [
  { src: resClassical1, title: "Classical Manor", place: "OGUN, NG", cat: "Residential", ratio: "aspect-[16/9]" },
  { src: resModern1, title: "Minimalist Villa", place: "Enugu, NG", cat: "Residential", ratio: "aspect-[1920/1508]" },
  { src: resBungalow1, title: "Lumina pavilion", place: "ABUJA, NG", cat: "Residential", ratio: "aspect-[1824/1437]" },
  { src: resBungalow2, title: "Onyx Crest Bungalow", place: "OWERRI, NG", cat: "Residential", ratio: "aspect-[16/9]" },
  { src: hotel1, title: "Hotel Façade", place: "Enugu, NG", cat: "Hospitality", ratio: "aspect-[16/9]" },
  { src: hotel2, title: "Hotel Facade", place: "Enugu, NG", cat: "Hospitality", ratio: "aspect-[16/9]" },
  { src: hotel3, title: "Hotel Wing", place: "Enugu, NG", cat: "Hospitality", ratio: "aspect-[16/9]" },
  { src: p1, title: "Villa Asana", place: "EBONYI, NG", cat: "Modern Tropical", ratio: "aspect-[16/9]" },
  { src: p2, title: "Atelier 04", place: "EBONYI, NG", cat: "Residential", ratio: "aspect-[4/3]" },
  { src: p3, title: "The Twin Monoliths", place: "WOTE, KEN", cat: "Residential", ratio: "aspect-[4/5]" },
  { src: p4, title: "The Varanda House", place: "AKWA-IBOM, NG", cat: "Residential", ratio: "aspect-[16/9]" },
  { src: p5, title: "Maridian Height", place: "ENUGU, NG", cat: "Residential", ratio: "aspect-[2/3]" },
  { src: p6, title: "The Twin Monoliths", place: "WOTE, KEN", cat: "Commercial", ratio: "aspect-[16/9]" },
  { src: p7, title: "Twilight Lounge", place: "LAGOS, NG", cat: "Residential", ratio: "aspect-[16/9]" },
  { src: p8, title: "Aura Lounge ", place: "ACCRA, Gh", cat: "Commercial", ratio: "aspect-[16/9]" },
  { src: p9, title: "The Linear Lounge", place: "Ebonyi, NG", cat: "Residential", ratio: "aspect-[16/9]" },
];

const cats: Cat[] = ["All", "Residential", "Commercial", "Modern Tropical", "Hospitality"];

export function Portfolio() {
  const [active, setActive] = useState<Cat>("All");
  const [query, setQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 7;
  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (i) =>
      (active === "All" || i.cat === active) &&
      (q === "" || i.title.toLowerCase().includes(q) || i.place.toLowerCase().includes(q)),
  );

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const onSearch = (e: Event) => {
      const detail = (e as CustomEvent).detail as { query?: string } | undefined;
      const q = (detail?.query ?? "").trim();
      setActive("All");
      setQuery(q);
      setShowAll(true);
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    window.addEventListener("portfolio-search", onSearch);
    return () => window.removeEventListener("portfolio-search", onSearch);
  }, []);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="work" className="bg-background py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-muted-foreground">Selected Work</p>
            <h2 className="mt-4 text-balance text-4xl md:text-5xl lg:text-6xl">
              A portfolio of <em className="italic">quiet</em> precision.
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setActive(c)}
                  className={`border px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all ${
                    active === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 max-w-md">
          <label htmlFor="portfolio-search" className="sr-only">Search portfolio</label>
          <input
            id="portfolio-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or location…"
            className="w-full border border-border bg-transparent px-4 py-3 text-sm tracking-wide placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div className="mt-12 grid grid-cols-6 gap-6 lg:gap-8">
          {filtered.length === 0 && (
            <p className="col-span-6 text-sm text-muted-foreground">No projects match your search.</p>
          )}
          {filtered.map((it, idx) => {
            if (!showAll && idx >= INITIAL_COUNT) return null;
            const isRevealed = showAll && idx >= INITIAL_COUNT;
            const pos = idx % 6;
            const span =
              pos === 0
                ? "col-span-6"
                : pos === 1 || pos === 2
                ? "col-span-6 md:col-span-3"
                : "col-span-6 sm:col-span-3 md:col-span-2";
            return (
              <figure
                key={it.title}
                className={`group block ${span} ${isRevealed ? "fade-up" : ""}`}
                style={isRevealed ? { animationDelay: `${(idx - INITIAL_COUNT) * 120}ms` } : undefined}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  aria-label={`Open ${it.title}`}
                  className={`relative block w-full overflow-hidden bg-muted ${it.ratio} cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground`}
                >
                  <img
                    src={it.src}
                    alt={it.title}
                    loading="lazy"
                    style={{ objectPosition: it.position ?? "center" }}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
                </button>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-display text-xl">{it.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{it.place}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{it.cat}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  requestAnimationFrame(() => {
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                } else {
                  setShowAll(true);
                }
              }}
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground underline underline-offset-[6px] decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-all duration-300"
            >
              <span>{showAll ? "View Less" : "View More"}</span>
              {showAll ? (
                <Minus
                  strokeWidth={1}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                />
              ) : (
                <Plus
                  strokeWidth={1}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                />
              )}
            </button>
          </div>
        )}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm animate-in fade-in"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 rounded-full p-3 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground md:right-6 md:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground md:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground md:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div
            className="flex flex-1 items-center justify-center px-4 pt-16 pb-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <figcaption
            className="px-6 pb-8 text-center md:pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl md:text-3xl">{current.title}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {current.place} — {current.cat}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {(lightboxIndex ?? 0) + 1} / {filtered.length}
            </p>
          </figcaption>
        </div>
      )}
    </section>
  );
}
