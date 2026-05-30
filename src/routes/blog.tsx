import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — TDAAT" },
      {
        name: "description",
        content:
          "TDAAT blog: Türk dünyası, akademik araştırmalar ve topluluk yazıları.",
      },
      { property: "og:title", content: "Blog — TDAAT" },
      {
        property: "og:description",
        content:
          "TDAAT blog: Türk dünyası, akademik araştırmalar ve topluluk yazıları.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/blog" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Türk dünyası, akademik araştırmalar ve topluluk hayatına dair
          yazılarımız çok yakında burada olacak.
        </p>
      </div>

      <div className="mt-16 rounded-2xl border border-dashed border-border/60 bg-accent/20 p-12 text-center">
        <h2 className="font-[var(--font-heading)] text-xl font-semibold text-foreground">
          Yakında
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          İlk yazılarımız üzerinde çalışıyoruz. Takipte kal!
        </p>
      </div>
    </div>
  );
}
