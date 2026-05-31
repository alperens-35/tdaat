import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, MapPin, Clock, Search, CalendarPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/calendar";

type UpcomingEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
};

const upcoming: UpcomingEvent[] = [
  {
    title: "Tanışma Etkinliği: Turan Toyu",
    date: "27 Eylül 2026",
    time: "13:00 - 15:30",
    location: "İnciraltı Kent Ormanı",
    category: "Eğlence",
    description:
      "Sektör liderleri ile yüz yüze tanış, kariyer yolculuğunda ipuçları al.",
    startDate: "2026-09-27T13:00:00+03:00",
    endDate: "2026-09-27T15:30:00+03:00",
  },
  {
    title: "Makale Okuması",
    date: "2 Ekim 2026",
    time: "16:00 - 17:30",
    location: "Eğitim+Spor Kafe",
    category: "Eğitim",
    description:
      "Yapay zeka temellerini öğren: makine öğrenmesi, derin öğrenme ve günlük hayatta kullanım alanları.",
    startDate: "2026-10-02T16:00:00+03:00",
    endDate: "2026-10-02T17:30:00+03:00",
  },
  {
    title: "3. Geleneksel Mangala Turnuvası",
    date: "21 Ekim 2026",
    time: "13:30 - 15:00",
    location: "Kış Bahçesi Kafe",
    category: "Yarışma",
    description:
      "48 saat süren yaratıcılık maratonu. Mentor desteği, ödüller ve network.",
    startDate: "2026-10-21T13:30:00+03:00",
    endDate: "2026-10-21T15:00:00+03:00",
  },
];

const past = [
  {
    title: "Web Geliştirme Bootcamp",
    date: "Kasım 2024",
    category: "Eğitim",
    description: "HTML'den React'a modern web geliştirme yolculuğu.",
  },
  {
    title: "Girişimcilik Sohbetleri",
    date: "Ekim 2024",
    category: "Söyleşi",
    description: "Yerel girişimcilerle samimi sohbetler.",
  },
  {
    title: "Figma Tasarım Workshopu",
    date: "Eylül 2024",
    category: "Workshop",
    description: "UI/UX temelleri ve Figma pratiği.",
  },
];

export const Route = createFileRoute("/events")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/events" }],
    meta: [
      { title: "Etkinlikler — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yaklaşan ve geçmiş etkinlikleri: eğitimler, hackathonlar, network günleri.",
      },
      { property: "og:title", content: "Etkinlikler — TDAAT" },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yaklaşan ve geçmiş etkinlikleri: eğitimler, hackathonlar, network günleri.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/events" },
    ],
    scripts: upcoming.map((event) => ({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.location,
          address: event.location,
        },
        organizer: {
          "@type": "Organization",
          name: "Türk Dünyası Akademik Araştırmalar Topluluğu",
          url: "https://tdaat.lovable.app/",
        },
      }),
    })),
  }),
  component: EventsPage,
});

function AddToCalendar({ event }: { event: UpcomingEvent }) {
  const cal: CalendarEvent = {
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate,
    url: "https://tdaat.lovable.app/events",
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="w-full font-[var(--font-heading)]">
          <CalendarPlus className="mr-1.5 h-3.5 w-3.5" /> Takvime Ekle
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href={googleCalendarUrl(cal)} target="_blank" rel="noopener noreferrer">
            <Calendar className="mr-2 h-4 w-4" /> Google Takvim
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => { e.preventDefault(); downloadIcs(cal); }}>
          <Download className="mr-2 h-4 w-4" /> Apple / Outlook (.ics)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EventsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Hepsi");

  const categories = useMemo(
    () => ["Hepsi", ...Array.from(new Set(upcoming.map((e) => e.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return upcoming.filter((e) => {
      const matchesCat = category === "Hepsi" || e.category === category;
      const matchesQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, category]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Etkinlikler
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Konferanslar, paneller, makale okumaları, Türk sporları ve daha niceleri seni bekliyor.
            Kendini geliştir, yeni insanlar tanı, deneyim kazan.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
              Yaklaşan Etkinlikler
            </h2>
          </div>

          {/* Search + filter */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Etkinlik ara..."
                aria-label="Etkinlik ara"
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 text-sm text-muted-foreground">
              Aramana uygun etkinlik bulunamadı.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => (
                <div
                  key={event.title}
                  className="flex flex-col rounded-xl border border-border/60 bg-background p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                    <span className="text-xs font-medium text-emerald-600">Yaklaşıyor</span>
                  </div>
                  <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                  </div>
                  <div className="mt-auto pt-5">
                    <AddToCalendar event={event} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
          Geçmiş Etkinlikler
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => (
            <div
              key={event.title}
              className="rounded-lg border border-border/40 bg-card/50 p-5 opacity-80 transition-opacity hover:opacity-100"
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{event.date}</span>
              </div>
              <h3 className="mt-3 font-[var(--font-heading)] text-sm font-semibold text-foreground">
                {event.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
