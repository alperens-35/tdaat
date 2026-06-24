import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowLeft, CalendarPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { downloadIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/calendar";
import { findEvent, upcomingEvents } from "@/lib/events-data";
import { EventRegistrationDialog } from "@/components/events/EventRegistrationDialog";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = findEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.event;
    if (!e) return {};
    return {
      meta: [
        { title: `${e.title} — TDAAT` },
        { name: "description", content: e.description },
        { property: "og:title", content: e.title },
        { property: "og:description", content: e.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://tdaat.lovable.app/events/${e.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://tdaat.lovable.app/events/${e.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: e.title,
            description: e.longDescription,
            startDate: e.startDate,
            endDate: e.endDate,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: e.location, address: e.location },
            organizer: {
              "@type": "Organization",
              name: "Türk Dünyası Akademik Araştırmalar Topluluğu",
              url: "https://tdaat.lovable.app/",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-[var(--font-heading)] text-3xl font-bold">Etkinlik bulunamadı</h1>
      <p className="mt-3 text-muted-foreground">Aradığın etkinlik mevcut değil veya kaldırılmış olabilir.</p>
      <Button asChild className="mt-6">
        <Link to="/events">Tüm Etkinlikler</Link>
      </Button>
    </div>
  ),
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const cal: CalendarEvent = {
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate,
    url: `https://tdaat.lovable.app/events/${event.slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Tüm Etkinlikler
      </Link>

      <Badge variant="secondary" className="mt-6">
        {event.category}
      </Badge>
      <h1 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {event.title}
      </h1>

      {event.image && (
        <img
          src={event.image.url}
          alt={event.title}
          className="mt-6 w-full rounded-xl border border-border/60 object-cover shadow-sm"
        />
      )}

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> {event.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {event.time}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4" /> {event.location}
        </span>
      </div>

      <p className="mt-8 text-lg leading-relaxed text-foreground/90">{event.description}</p>
      <p className="mt-4 leading-relaxed text-muted-foreground">{event.longDescription}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-[var(--font-heading)]">
              <CalendarPlus className="mr-1.5 h-4 w-4" /> Takvime Ekle
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <a href={googleCalendarUrl(cal)} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" /> Google Takvim
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(ev) => { ev.preventDefault(); downloadIcs(cal); }}>
              <Download className="mr-2 h-4 w-4" /> Apple / Outlook (.ics)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {upcomingEvents.some((u) => u.slug === event.slug) && (
          <div className="inline-flex">
            <EventRegistrationDialog
              eventSlug={event.slug}
              eventTitle={event.title}
              triggerLabel="Etkinliğe Kayıt Ol"
              triggerSize="default"
              fullWidth={false}
            />
          </div>
        )}
        <Button variant="outline" asChild className="font-[var(--font-heading)]">
          <Link to="/contact">Sorum Var</Link>
        </Button>
      </div>
    </article>
  );
}
