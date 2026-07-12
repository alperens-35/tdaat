import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, ImageIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type GalleryItemRow = Database["public"]["Tables"]["gallery_items"]["Row"];

export const Route = createFileRoute("/admin/gallery")({
  ssr: false,
  component: AdminGalleryPage,
});

function AdminGalleryPage() {
  const { isReady } = useAuth();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as GalleryItemRow[];
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
          Galeri Yönetimi
        </h1>
        <Button asChild>
          <Link to="/admin/gallery/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Yeni Görsel
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Henüz galeri öğesi eklenmemiş.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:shadow-md"
            >
              <div className="aspect-video w-full bg-accent/30">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    <Calendar className="mr-1 inline h-3 w-3" />
                    {item.created_at ? new Date(item.created_at).toLocaleDateString("tr-TR") : ""}
                  </span>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/gallery/$id/edit" params={{ id: item.id }}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}