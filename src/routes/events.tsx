import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Search, CalendarPlus, Download, ArrowRight, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
import { EventRegistrationDialog } from "@/components/events/EventRegistrationDialog";
import type { Database } from "@/integrations/supabase/types";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export const Route = createFileRoute("/events")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.vercel.app/events" }],
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
      { property: "og:url", content: "https://tdaat.vercel.app/events" },
    ],
  }),
  component: EventsPage,
});

function AddToCalendar({ event }: { event: EventRow }) {
  const cal: CalendarEvent = {
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: event.start_date,
    endDate: event.end_date,
    url: typeof window !== "undefined" ? window.location.href : "",
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

function EventsList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Hepsi");

  const { data: allEvents = [] } = useQuery({
    queryKey: ["public-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as EventRow[];
    },
  });

  const upcoming = useMemo(() => allEvents.filter((e) => e.is_upcoming), [allEvents]);
  const past = useMemo(() => allEvents.filter((e) => !e.is_upcoming), [allEvents]);

  const categories = useMemo(
    () => ["Hepsi", ...Array.from(new Set(allEvents.map((e) => e.category)))],
    [allEvents]
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
  }, [query, category, upcoming]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Etkinlikler
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-left">
            Konferanslar, paneller, makale okumaları, Türk sporları ve daha niceleri seni bekliyor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-lg border border-border/60 bg-card/50 px-4 py-3">
              <div className="text-2xl font-bold text-foreground">{upcoming.length}</div>
              <div className="text-xs text-muted-foreground">Yaklaşan</div>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 px-4 py-3">
              <div className="text-2xl font-bold text-foreground">{past.length}</div>
              <div className="text-xs text-muted-foreground">Geçmiş</div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
              Yaklaşan Etkinlikler
            </h2>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Etkinlik ara..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
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
            <p className="mt-10 text-sm text-muted-foreground">Yaklaşan etkinlik görünmüyor.</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => (
                <div key={event.id} className="flex flex-col rounded-xl border border-border/60 bg-background p-6 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{event.category}</Badge>
                    <span className="text-xs font-medium text-emerald-600">Yaklaşıyor</span>
                  </div>
                  <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {event.date_label}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {event.time_label}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {event.location}</div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2 pt-5">
                    <Button asChild size="sm" className="w-full">
                      <Link to="/events/$slug" params={{ slug: event.slug }}>Detaylar</Link>
                    </Button>
                    <EventRegistrationDialog eventSlug={event.slug} eventTitle={event.title} />
                    <AddToCalendar event={event} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-foreground">Geçmiş Etkinlikler</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => (
            <Link key={event.id} to="/events/$slug" params={{ slug: event.slug }} className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/40 hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden bg-accent/40">
                {event.image_url ? (
                  <img src={event.image_url} alt={event.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center"><ImageIcon className="h-10 w-10 text-muted-foreground/20" /></div>
                )}
              </div>
              <div className="p-5">
                <Badge variant="outline" className="text-xs">{event.category}</Badge>
                <h3 className="mt-3 font-semibold">{event.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function EventsPage() {
  const router = useRouter();
  const isIndex = router.state.location.pathname === "/events";
  return <div className="flex flex-col">{isIndex ? <EventsList /> : <Outlet />}</div>;
}