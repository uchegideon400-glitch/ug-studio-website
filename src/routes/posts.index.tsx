import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [
      { title: "Insights — UG Design Studio Journal" },
      {
        name: "description",
        content:
          "Essays and field notes on structural engineering, minimalist concrete, spatial planning and modern tropical luxury from UG Design Studio.",
      },
      { property: "og:title", content: "Insights — UG Design Studio Journal" },
      {
        property: "og:description",
        content:
          "Essays and field notes on structural engineering, minimalist concrete, spatial planning and modern tropical luxury.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Insights — UG Design Studio Journal",
          description:
            "Essays and field notes on structural engineering, minimalist concrete, spatial planning and modern tropical luxury.",
          hasPart: posts.map((p) => ({
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            image: p.imageUrl,
            url: `/posts/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: PostsIndex,
});

function PostsIndex() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] text-foreground">
      <Nav />
      <Link
        to="/"
        className="fixed bottom-8 left-8 z-50 group inline-flex items-center gap-2 rounded-full bg-[#F9F1E7]/90 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm shadow-sm border border-dark/10 transition-opacity hover:opacity-70"
      >
        <ArrowLeft
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          strokeWidth={1.25}
        />
        Back to Home
      </Link>
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          JOURNAL
        </p>
        <h1 className="mt-6 font-display text-balance text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
          Insights from the Studio
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
          A slow record of essays, field notes, and material studies on the craft
          of contemporary architecture.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <Link
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="block overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </Link>
              <div className="mt-6">
                <Link
                  to="/posts/$slug"
                  params={{ slug: post.slug }}
                  className="block"
                >
                  <h2 className="font-display text-balance text-2xl leading-[1.15] text-foreground md:text-3xl">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                  {post.excerpt}
                </p>
                <Link
                  to="/posts/$slug"
                  params={{ slug: post.slug }}
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.3em] text-foreground underline underline-offset-[6px] transition-opacity hover:opacity-60"
                >
                  READ ARTICLE
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
