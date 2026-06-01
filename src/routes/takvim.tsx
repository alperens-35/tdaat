import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { calendarEvents, categoryLabels, categoryColors, type CalendarEvent } from "@/lib/takvim-data";

export const Route = createFileRoute("/takvim")({
  head: () => ({
    meta: [
      { title: "Türk Dünyası Takvimi — TDAAT" },
      {
        name: "description",
        content:
          "Türk dünyasının ortak bayramları, anma günleri ve tarihi olayları. Nevruz'dan bağımsızlık günlerine kadar yıl boyu önemli tarihler.",
      },
      { property: "og:title", content: "Türk Dünyası Takvimi — TDAAT" },
      {
        property: "og:description",
        content: "Türk dünyasının ortak bayramları, anma günleri ve tarihi olayları bir arada.",
      },
    ],
  }),
  component: TakvimPage,
});

const months = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const categories: Array<CalendarEvent["category"] | "all"> = ["all", "bayram", "anma", "kultur", "tarih"];

function TakvimPage() {
  const [filter, setFilter] = useState<CalendarEvent["category"] | "all">("all");

  const grouped = useMemo(() => {
    const items = filter === "all" ? calendarEvents : calendarEvents.filter((e) => e.category === filter);
    const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
    const byMonth: Record<number, CalendarEvent[]> = {};
    for (const ev of sorted) {
      const m = parseInt(ev.date.slice(0, 2), 10) - 1;
      (byMonth[m] ||= []).push(ev);
    }
    return byMonth;
  }, [filter]);

  const today = new Date();
  const todayKey = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
          <Calendar className="h-3.5 w-3.5" />
          {"\u200B"}
        </div>
        <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ortak Hafızamızın Günleri
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Türk dünyasının bayramları, anma günleri ve önemli tarihi olayları yıl boyunca bir arada.
        </p>
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              filter === c
                ? "bg-primary text-primary-foreground"
                : "bg-accent/50 text-foreground hover:bg-accent"
            }`}
          >
            {c === "all" ? "Tümü" : categoryLabels[c]}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-12 space-y-10">
        {Object.entries(grouped).map(([month, events]) => (
          <section key={month}>
            <h2 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
              {months[parseInt(month, 10)]}
            </h2>
            <ul className="mt-4 space-y-3">
              {events.map((ev) => {
                const isToday = ev.date === todayKey;
                const day = parseInt(ev.date.slice(3, 5), 10);
                return (
                  <li
                    key={`${ev.date}-${ev.title}`}
                    className={`flex gap-4 rounded-xl border p-4 transition-colors ${
                      isToday
                        ? "border-primary bg-primary/5"
                        : "border-border/60 bg-card hover:border-primary/20"
                    }`}
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <div className="text-lg font-bold leading-none">{day}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-wide">
                        {months[parseInt(month, 10)].slice(0, 3)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-[var(--font-heading)] text-base font-semibold text-foreground">
                          {ev.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${categoryColors[ev.category]}`}
                        >
                          {categoryLabels[ev.category]}
                        </span>
                        {isToday && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            Bugün
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {ev.description}
                      </p>
                      {ev.country && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {ev.country}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
