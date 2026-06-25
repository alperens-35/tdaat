import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";

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
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-left">
          Türk dünyası, akademik araştırmalar ve topluluk hayatına dair yazılarımız.
        </p>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/50 px-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Clock className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-6 font-[var(--font-heading)] text-2xl font-semibold text-foreground sm:text-3xl">
          Çok Yakında
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Blog yazılarımız üzerinde çalışıyoruz. Çok yakında burada olacağız.
        </p>
      </div>
    </div>
  );
}
