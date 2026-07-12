import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { upsertBlogPost, deleteBlogPost } from "@/lib/admin.functions";
import { safeMediaUpload } from "@/lib/media-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["blog_posts"]["Row"];

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlogPage,
});

const empty = {
  slug: "",
  title: "",
  excerpt: "",
  date_label: "",
  author: "",
  reading_time: "5 dk",
  category: "",
  content: "",
  cover_url: "" as string | null,
};

function AdminBlogPage() {
  const qc = useQueryClient();
  const { data: rows } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: useServerFn(deleteBlogPost),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Yazı silindi");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold">Blog</h1>
        <Button onClick={() => setCreating(true)}>
          <Plus className="mr-1 h-4 w-4" /> Yeni yazı
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Başlık</th>
              <th className="px-4 py-2 text-left">Yazar</th>
              <th className="px-4 py-2 text-left">Tarih</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="border-t border-border/40">
                <td className="px-4 py-2">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.slug}</div>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{r.author}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.date_label}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(r)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`"${r.title}" silinsin mi?`)) del.mutate({ data: { id: r.id } });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {(!rows || rows.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                  Henüz yazı yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <BlogDialog initial={editing} onClose={() => { setEditing(null); setCreating(false); }} />
      )}
    </div>
  );
}

function BlogDialog({ initial, onClose }: { initial: Row | null; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => {
    if (!initial) return empty;
    return {
      slug: initial.slug,
      title: initial.title,
      excerpt: initial.excerpt,
      date_label: initial.date_label,
      author: initial.author,
      reading_time: initial.reading_time,
      category: initial.category,
      content: initial.content,
      cover_url: initial.cover_url,
    };
  });
  const [uploading, setUploading] = useState(false);

  const save = useMutation({
    mutationFn: useServerFn(upsertBlogPost),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Kaydedildi");
      onClose();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await safeMediaUpload(file, "public-media");
      setF((s) => ({ ...s, cover_url: url }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
    }
  }

  const canSave = useMemo(
    () => f.slug && f.title && f.excerpt && f.date_label && f.author && f.category && f.content,
    [f],
  );

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Yazıyı Düzenle" : "Yeni Yazı"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Slug (URL)" v={f.slug} on={(v) => setF({ ...f, slug: v })} />
            <Field label="Kategori" v={f.category} on={(v) => setF({ ...f, category: v })} />
          </div>
          <Field label="Başlık" v={f.title} on={(v) => setF({ ...f, title: v })} />
          <div className="grid gap-2 sm:grid-cols-3">
            <Field label="Yazar" v={f.author} on={(v) => setF({ ...f, author: v })} />
            <Field label="Tarih (örn. 15 Mayıs 2026)" v={f.date_label} on={(v) => setF({ ...f, date_label: v })} />
            <Field label="Okuma Süresi" v={f.reading_time} on={(v) => setF({ ...f, reading_time: v })} />
          </div>
          <Area label="Özet" v={f.excerpt} on={(v) => setF({ ...f, excerpt: v })} rows={2} />
          <Area label="İçerik (boş satırla paragraf ayır)" v={f.content} on={(v) => setF({ ...f, content: v })} rows={12} />

          <div>
            <Label>Kapak Görseli (opsiyonel)</Label>
            <div className="mt-1 flex items-center gap-3">
              {f.cover_url && <img src={f.cover_url} alt="" className="h-16 w-24 rounded border object-cover" />}
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
                <Upload className="h-4 w-4" />
                {uploading ? "Yükleniyor..." : "Görsel yükle"}
                <input type="file" accept="image/*" className="hidden" onChange={pickImage} disabled={uploading} />
              </label>
              {f.cover_url && (
                <Button size="sm" variant="ghost" onClick={() => setF({ ...f, cover_url: "" })}>Kaldır</Button>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>İptal</Button>
          <Button
            disabled={!canSave || save.isPending}
            onClick={() => save.mutate({ data: { id: initial?.id, values: { ...f, cover_url: f.cover_url || null } } })}
          >
            {save.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return <div><Label>{label}</Label><Input className="mt-1" value={v} onChange={(e) => on(e.target.value)} /></div>;
}
function Area({ label, v, on, rows }: { label: string; v: string; on: (v: string) => void; rows: number }) {
  return <div><Label>{label}</Label><Textarea className="mt-1" rows={rows} value={v} onChange={(e) => on(e.target.value)} /></div>;
}
