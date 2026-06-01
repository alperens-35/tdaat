import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/blog" }],
    meta: [
      { title: "Blog — TDAAT" },
      {
        name: "description",
        content: "TDAAT blog: Türk dünyası, akademik araştırmalar ve topluluk yazıları.",
      },
      { property: "og:title", content: "Blog — TDAAT" },
      {
        property: "og:description",
        content: "TDAAT blog: Türk dünyası, akademik araştırmalar ve topluluk yazıları.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/blog" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-left">
          Blog
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-left">
          Türk dünyası, akademik araştırmalar ve topluluk hayatına dair yazılarımız.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <Badge variant="secondary" className="w-fit text-xs">{post.category}</Badge>
            <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Devamını oku <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
