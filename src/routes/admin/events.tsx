import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";
import { useEffect } from "react";

type EventRow = Database["public"]["Tables"]["events"]["Row"];

export const Route = createFileRoute("/admin/events")({
  ssr: false,
  component: AdminEventsPage,
});

function AdminEventsPage() {
  const { isReady } = useAuth();
  console.log('[AdminEventsPage] isReady:', isReady);

  useEffect(() => {
    console.log('[AdminEventsPage] isReady değişti:', isReady);
  }, [isReady]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      console.log('[AdminEventsPage] useQuery queryFn çalışıyor (isReady true)');
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) {
        console.error('[AdminEventsPage] Supabase sorgu hatası:', error);
        throw error;
      }
      console.log('[AdminEventsPage] events geldi, adet:', data?.length);
      return data as EventRow[];
    },
    enabled: isReady,
  });

  if (!isReady || isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-muted-foreground">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Etkinlik Yönetimi
        </h1>
        <Button asChild>
          <Link to="/admin/events/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Yeni Etkinlik
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Henüz etkinlik eklenmemiş.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <Badge variant={event.is_upcoming ? "default" : "secondary"}>
                    {event.is_upcoming ? "Yaklaşıyor" : "Geçmiş"}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date_label}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time_label}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/events/$slug/edit" params={{ slug: event.slug }}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}