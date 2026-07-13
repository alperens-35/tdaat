import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarDays, FileText, Newspaper, Images, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  component: AdminDashboard,
});

function AdminDashboard() {
  const { isReady } = useAuth();

  const { data: eventCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-event-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: isReady,
  });

  const { data: blogCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-blog-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: isReady,
  });

  const { data: newsCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-news-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("news_items")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: isReady,
  });

  const { data: galleryCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-gallery-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("gallery_items")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: isReady,
  });

  const { data: memberCount = 0 } = useQuery({
    queryKey: ["admin-dashboard-member-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: isReady,
  });

  if (!isReady) {
    return (
      <div className="flex h-40 items-center justify-center">
        <span className="text-muted-foreground">Yükleniyor...</span>
      </div>
    );
  }

  const stats = [
    { label: "Etkinlikler", value: eventCount, icon: CalendarDays, color: "text-blue-500" },
    { label: "Blog Yazıları", value: blogCount, icon: FileText, color: "text-green-500" },
    { label: "Haberler", value: newsCount, icon: Newspaper, color: "text-orange-500" },
    { label: "Galeri", value: galleryCount, icon: Images, color: "text-purple-500" },
    { label: "Üyeler", value: memberCount, icon: Users, color: "text-pink-500" },
  ];

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Yönetim Paneli Özet
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Topluluğa ait tüm içeriklerin genel durumu.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4"
          >
            <div className={`rounded-full bg-primary/10 p-3 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}