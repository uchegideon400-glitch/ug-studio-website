import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — UG Design Studio Journal` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:image", content: loaderData.post.imageUrl },
          { name: "twitter:image", content: loaderData.post.imageUrl },
        ]
      : [],
    scripts: [
      ...(loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.post.title,
                description: loaderData.post.excerpt,
                image: loaderData.post.imageUrl,
                author: { "@type": "Organization", name: "UG Design Studio" },
                publisher: { "@type": "Organization", name: "UG Design Studio" },
              }),
            },
          ]
        : []),
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F6F0]">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          Not Found
        </p>
        <h1 className="mt-4 font-display text-3xl text-foreground">
          That article doesn't exist
        </h1>
        <Link
          to="/posts"
          className="mt-8 inline-block text-[11px] uppercase tracking-[0.3em] text-foreground underline underline-offset-[6px]"
        >
          ← BACK TO INSIGHTS
        </Link>
      </div>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#F9F6F0] text-foreground">
      <div className="fixed left-6 top-6 z-50 lg:left-12 lg:top-10">
        <Link
          to="/posts"
          className="group inline-flex items-center gap-2 rounded-full bg-[#F9F6F0]/85 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-foreground backdrop-blur-md transition-opacity hover:opacity-70"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.25}
          />
          Back to Insights
        </Link>
      </div>

      <header className="relative h-[70vh] w-full overflow-hidden lg:h-[85vh]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </header>

      <article className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          JOURNAL
        </p>
        <h1 className="mt-6 font-display text-balance text-left text-4xl leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mt-10 text-lg leading-relaxed text-foreground/70 md:text-xl">
          {post.excerpt}
        </p>

        <div className="mt-12 h-px w-16 bg-foreground/30" />

        <div className="mt-12 space-y-7 text-base leading-[1.85] text-foreground/85 md:text-[17px]">
          {post.content.split("\n\n").map((para: string, i: number) => (
            <p
              key={i}
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: para.trim() }}
            />
          ))}
        </div>

        <div className="mt-20">
          <Link
            to="/posts"
            className="text-[11px] uppercase tracking-[0.3em] text-foreground underline underline-offset-[6px] transition-opacity hover:opacity-60"
          >
            ← BACK TO INSIGHTS
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
