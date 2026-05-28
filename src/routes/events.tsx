import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Etkinlikler — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yaklaşan ve geçmiş etkinlikleri: eğitimler, hackathonlar, network günleri.",
      },
      {
        property: "og:title",
        content: "Etkinlikler — TDAAT",
      },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yaklaşan ve geçmiş etkinlikleri: eğitimler, hackathonlar, network günleri.",
      },
    ],
  }),
  component: EventsPage,
});

const upcoming = [
  {
    title: "Tanışma Etkinliği: Turan Toyu",
    date: "27 Eylül 2026",
    time: "10:00 - 16:00",
    location: "Konferans Salonu",
    category: "Eğlence",
    description:
      "Sektör liderleri ile yüz yüze tanış, kariyer yolculuğunda ipuçları al.",
    status: "yaklasan",
  },
  {
    title: "Makale Okuması",
    date: "2 Ekim 2026",
    time: "16:00 - 17:30",
    location: "Eğitim+Spor Kafe",
    category: "Eğitim",
    description:
      "Yapay zeka temellerini öğren: makine öğrenmesi, derin öğrenme ve günlük hayatta kullanım alanları.",
    status: "yaklasan",
  },
  {
    title: "Kış Hackathonu",
    date: "5-7 Ocak 2025",
    time: "Tüm gün",
    location: "Innovasyon Merkezi",
    category: "Hackathon",
    description:
      "48 saat süren yaratıcılık maratonu. Mentor desteği, ödüller ve network.",
    status: "yaklasan",
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

function EventsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Etkinlikler
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Workshoplar, hackathonlar, eğitimler ve network günleri. Kendini geliştir,
            yeni insanlar tanı, deneyim kazan.
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

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <div
                key={event.title}
                className="flex flex-col rounded-xl border border-border/60 bg-background p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {event.category}
                  </Badge>
                  <span className="text-xs text-emerald-600 font-medium">Yaklaşıyor</span>
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
                  <Button size="sm" className="w-full font-[var(--font-heading)]">
                    Katıl <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
