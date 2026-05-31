import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CultureIcon } from "@/components/CultureIcon";
import { cultureItems } from "@/lib/turk-dunya-data";

export const Route = createFileRoute("/turk-dunyasi/kultur/$slug")({
  loader: ({ params }) => {
    const item = cultureItems.find((c) => c.id === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    links: [
      {
        rel: "canonical",
        href: `https://tdaat.lovable.app/turk-dunyasi/kultur/${loaderData?.id ?? ""}`,
      },
    ],
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Kültür — TDAAT` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Kültür — TDAAT" }],
  }),
  notFoundComponent: () => (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">İçerik bulunamadı</h1>
      <Link to="/turk-dunyasi" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Türk Dünyası'na dön
      </Link>
    </section>
  ),
  errorComponent: ({ reset }) => (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Bir şeyler ters gitti</h1>
      <button onClick={reset} className="mt-4 text-primary hover:underline">Tekrar dene</button>
    </section>
  ),
  component: CultureDetailPage,
});

function CultureDetailPage() {
  const item = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/turk-dunyasi" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Türk Dünyası
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <CultureIcon id={item.id} size="lg" />
        <Badge variant="secondary" className="text-xs">
          <Globe className="mr-1 h-2.5 w-2.5" />
          {item.origin}
        </Badge>
      </div>

      <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        {item.title}
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-foreground/90">{item.description}</p>

      <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
        {item.content.map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link to="/turk-dunyasi" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Türk Dünyası'na dön
        </Link>
      </div>
    </article>
  );
}
