import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlagIcon } from "@/components/FlagIcon";
import { getTurkWorldNews, extractArticleText, type LiveNewsItem } from "@/lib/turk-news.functions";

const countryNames: Record<string, string> = {
  tr: "Türkiye",
  az: "Azerbaycan",
  kz: "Kazakistan",
  kg: "Kırgızistan",
  uz: "Özbekistan",
  tm: "Türkmenistan",
};

export const Route = createFileRoute("/turk-dunyasi/haber/canli/$id")({
  loader: async ({ params }): Promise<{
    item: LiveNewsItem;
    dateText: string;
    countryName: string;
    lead: string | undefined;
    paragraphs: string[];
  }> => {
    const data = await getTurkWorldNews();
    const item = data.items.find((i) => i.id === params.id);
    if (!item) throw notFound();

    const date = new Date(item.pubDate);
    const dateText = isNaN(date.getTime())
      ? item.pubDate
      : date.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

    const extracted = await extractArticleText(item.link);

    // If the extracted text starts with the same summary we already show as the lead, skip it.
    let bodyParagraphs = extracted;
    if (item.summary && bodyParagraphs.length && bodyParagraphs[0].startsWith(item.summary)) {
      bodyParagraphs = bodyParagraphs.slice(1);
    }

    if (!bodyParagraphs.length) {
      bodyParagraphs = item.content
        ? item.content
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean)
        : item.summary
          ? [item.summary]
          : [];
      if (item.summary && bodyParagraphs.length && bodyParagraphs[0].startsWith(item.summary)) {
        bodyParagraphs.shift();
      }
    }

    return {
      item,
      dateText,
      countryName: countryNames[item.country] ?? item.country.toUpperCase(),
      lead: item.summary,
      paragraphs: bodyParagraphs,
    };
  },
  head: ({ loaderData }) => ({
    links: [
      {
        rel: "canonical",
        href: `https://tdaat.lovable.app/turk-dunyasi/haber/canli/${encodeURIComponent(loaderData?.item.id ?? "")}`,
      },
    ],
    meta: loaderData
      ? [
          { title: `${loaderData.item.title} — TDAAT` },
          {
            name: "description",
            content: loaderData.lead ?? loaderData.item.title,
          },
          { property: "og:title", content: loaderData.item.title },
          {
            property: "og:description",
            content: loaderData.lead ?? loaderData.item.title,
          },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Haber — TDAAT" }],
  }),
  notFoundComponent: () => (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Haber bulunamadı</h1>
      <p className="mt-3 text-muted-foreground">
        Aradığınız haber kaldırılmış ya da taşınmış olabilir.
      </p>
      <Link
        to="/turk-dunyasi"
        className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Türk Dünyası'na dön
      </Link>
    </section>
  ),
  errorComponent: ({ reset }) => (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Bir şeyler ters gitti</h1>
      <button onClick={reset} className="mt-4 text-primary hover:underline">
        Tekrar dene
      </button>
    </section>
  ),
  component: LiveNewsDetailPage,
});

function LiveNewsDetailPage() {
  const { item, dateText, countryName, lead, paragraphs } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/turk-dunyasi"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Türk Dünyası
      </Link>

      <div className="mt-6 flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          <Tag className="mr-1 h-2.5 w-2.5" />
          {item.source}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          <Globe className="mr-1 h-2.5 w-2.5" />
          {countryName}
        </Badge>
        <FlagIcon country={item.country} />
      </div>

      <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        {item.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {dateText}
        </span>
        <span>Kaynak: {item.source}</span>
      </div>

      {lead && (
        <p className="mt-8 text-lg leading-relaxed text-foreground/90">{lead}</p>
      )}

      <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
        {paragraphs.map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          to="/turk-dunyasi"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Tüm haberlere dön
        </Link>
      </div>
    </article>
  );
}
