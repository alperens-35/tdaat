import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { upsertGalleryImage, deleteGalleryImage } from "@/lib/admin.functions";
import { safeMediaUpload } from "@/lib/media-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, Upload, ImagePlus } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["gallery_images"]["Row"];

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGalleryPage,
});

function AdminGalleryPage() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const { data: rows } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const create = useMutation({
    mutationFn: useServerFn(upsertGalleryImage),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-gallery"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: useServerFn(deleteGalleryImage),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Silindi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const url = await safeMediaUpload(file, "public-media");
        await create.mutateAsync({
          data: { values: { image_url: url, caption, title: "", sort_order: 0 } },
        });
      }
      setCaption("");
      toast.success(`${files.length} görsel eklendi`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold">Galeri</h1>
      </div>

      <div className="mb-6 rounded-xl border border-dashed border-border/60 bg-card/50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Açıklama (opsiyonel)</label>
            <Input className="mt-1" value={caption} onChange={(e) => setCaption(e.target.value)}
              placeholder="Örn. Açılış buluşması" />
          </div>
          <label className={`inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 ${uploading ? "opacity-60" : ""}`}>
            <Upload className="h-4 w-4" />
            {uploading ? "Yükleniyor..." : "Görsel(ler) yükle"}
            <input type="file" accept="image/*" multiple className="hidden" onChange={onPick} disabled={uploading} />
          </label>
        </div>
      </div>

      {(!rows || rows.length === 0) ? (
        <div className="rounded-xl border border-border/60 bg-card p-16 text-center text-muted-foreground">
          <ImagePlus className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-3 text-sm">Henüz galeri görseli yok.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <div key={r.id} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card">
              <img src={r.image_url} alt={r.caption} className="aspect-[4/3] w-full object-cover" />
              {r.caption && (
                <div className="p-3 text-sm text-foreground">{r.caption}</div>
              )}
              <Button
                size="sm" variant="destructive"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => { if (confirm("Görsel silinsin mi?")) del.mutate({ data: { id: r.id } }); }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
