import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { academicItems } from "@/lib/turk-dunya-data";

export const Route = createFileRoute("/turk-dunyasi/akademik/$slug")({
  loader: ({ params }) => {
    const item = academicItems.find((a) => a.id === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    links: [
      {
        rel: "canonical",
        href: `https://tdaat.lovable.app/turk-dunyasi/akademik/${loaderData?.id ?? ""}`,
      },
    ],
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Akademik — TDAAT` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Akademik — TDAAT" }],
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
  component: AcademicDetailPage,
});

function AcademicDetailPage() {
  const item = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/turk-dunyasi" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Türk Dünyası
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-xs">
          <BookOpen className="mr-1 h-2.5 w-2.5" />
          {item.field}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          <Building className="mr-1 h-2.5 w-2.5" />
          {item.institution}
        </Badge>
      </div>

      <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        {item.title}
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-foreground/90">{item.summary}</p>

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
