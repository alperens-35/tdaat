import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper, BookOpen, GraduationCap, Calendar, Globe, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlagIcon } from "@/components/FlagIcon";
import { newsItems, cultureItems, academicItems } from "@/lib/turk-dunya-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/turk-dunyasi/")({
  component: TurkDunyasiPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/turk-dunyasi" }],
    meta: [
      { title: "Türk Dünyası — TDAAT" },
      { name: "description", content: "Türk dünyasından haberler ve ortak kültürümüze dair içerikler." },
      { property: "og:title", content: "Türk Dünyası — TDAAT" },
      { property: "og:description", content: "Türk dünyasından haberler ve ortak kültürümüze dair içerikler." },
      { property: "og:url", content: "https://tdaat.lovable.app/turk-dunyasi" },
    ],
  }),
});

type TabKey = "news" | "culture" | "academic";

const categoryLabels: Record<string, string> = {
  politics: "Siyaset",
  culture: "Kültür",
  education: "Eğitim",
  economy: "Ekonomi",
  science: "Bilim",
};

function TurkDunyasiPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabKey>("news");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "news", label: t("turkWorld.newsTab"), icon: <Newspaper className="h-4 w-4" /> },
    { key: "culture", label: t("turkWorld.cultureTab"), icon: <BookOpen className="h-4 w-4" /> },
    { key: "academic", label: t("turkWorld.academicTab"), icon: <GraduationCap className="h-4 w-4" /> },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-3">
          <Globe className="mr-1 h-3 w-3" />
          {t("turkWorld.badge")}
        </Badge>
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t("nav.turkWorld")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {t("turkWorld.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-10">
        {activeTab === "news" && <NewsGrid />}
        {activeTab === "culture" && <CultureGrid />}
        {activeTab === "academic" && <AcademicGrid />}
      </div>

      {/* Info box */}
      <div className="mt-16 rounded-xl border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t("turkWorld.info")}
        </p>
      </div>
    </section>
  );
}

function NewsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newsItems.map((item) => (
        <Link
          key={item.id}
          to="/turk-dunyasi/haber/$slug"
          params={{ slug: item.id }}
          className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              <Tag className="mr-1 h-2.5 w-2.5" />
              {categoryLabels[item.category] ?? item.category}
            </Badge>
            <FlagIcon country={item.flag} />
          </div>
          <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {item.summary}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {item.date}
            </span>
            <span className="inline-flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Devamını oku
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CultureGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cultureItems.map((item) => (
        <Link
          key={item.id}
          to="/turk-dunyasi/kultur/$slug"
          params={{ slug: item.id }}
          className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={item.title}>
              {item.flag}
            </span>
            <Badge variant="secondary" className="text-xs">
              {item.origin}
            </Badge>
          </div>
          <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold text-foreground group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {item.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Devamını oku
            <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function AcademicGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {academicItems.map((item) => (
        <Link
          key={item.id}
          to="/turk-dunyasi/akademik/$slug"
          params={{ slug: item.id }}
          className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <Badge variant="secondary" className="w-fit text-xs">
            {item.field}
          </Badge>
          <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold text-foreground group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{item.institution}</p>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {item.summary}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Devamını oku
            <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      ))}
    </div>
  );
}

