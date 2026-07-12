import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type NewsItemRow = Database["public"]["Tables"]["news_items"]["Row"];

export const Route = createFileRoute("/admin/news")({
  ssr: false,
  component: AdminNewsPage,
});

function AdminNewsPage() {
  const { isReady } = useAuth();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as NewsItemRow[];
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
          Haber Yönetimi
        </h1>
        <Button asChild>
          <Link to="/admin/news/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Yeni Haber
          </Link>
        </Button>
      </div>

      {news.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Henüz haber eklenmemiş.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <Badge variant="outline">
                    <Tag className="mr-1 h-3 w-3" />
                    {item.category}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/news/$slug/edit" params={{ slug: item.id }}>
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