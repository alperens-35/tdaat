import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { upsertEvent, deleteEvent } from "@/lib/admin.functions";
import { uploadPublicMedia } from "@/lib/media-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["events"]["Row"];

export const Route = createFileRoute("/_admin/events")({
  component: AdminEventsPage,
});

const empty = {
  slug: "",
  title: "",
  date_label: "",
  time_label: "—",
  location: "",
  category: "Panel",
  description: "",
  long_description: "",
  start_date: "",
  end_date: "",
  image_url: "" as string | null,
  is_upcoming: false,
};

function AdminEventsPage() {
  const qc = useQueryClient();
  const { data: rows } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: useServerFn(deleteEvent),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Etkinlik silindi");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold">Etkinlikler</h1>
        <Button onClick={() => setCreating(true)}>
          <Plus className="mr-1 h-4 w-4" /> Yeni etkinlik
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Başlık</th>
              <th className="px-4 py-2 text-left">Tarih</th>
              <th className="px-4 py-2 text-left">Durum</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r) => (
              <tr key={r.id} className="border-t border-border/40">
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.slug}</div>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{r.date_label}</td>
                <td className="px-4 py-2 text-xs">
                  {r.is_upcoming ? (
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-600">Yaklaşan</span>
                  ) : (
                    <span className="rounded bg-muted px-2 py-0.5 text-muted-foreground">Geçmiş</span>
                  )}
                </td>
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
                  Henüz etkinlik yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <EventDialog
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function EventDialog({ initial, onClose }: { initial: Row | null; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => {
    if (!initial) return empty;
    return {
      slug: initial.slug,
      title: initial.title,
      date_label: initial.date_label,
      time_label: initial.time_label,
      location: initial.location,
      category: initial.category,
      description: initial.description,
      long_description: initial.long_description,
      start_date: initial.start_date,
      end_date: initial.end_date,
      image_url: initial.image_url,
      is_upcoming: initial.is_upcoming,
    };
  });
  const [uploading, setUploading] = useState(false);

  const save = useMutation({
    mutationFn: useServerFn(upsertEvent),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-events"] });
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
      const url = await uploadPublicMedia(file, "events");
      setF((s) => ({ ...s, image_url: url }));
      toast.success("Görsel yüklendi");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
    }
  }

  const canSave = useMemo(
    () =>
      f.slug && f.title && f.date_label && f.location && f.category &&
      f.description && f.long_description && f.start_date && f.end_date,
    [f],
  );

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Etkinliği Düzenle" : "Yeni Etkinlik"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Slug (URL)" v={f.slug} on={(v) => setF({ ...f, slug: v })} />
            <Field label="Kategori" v={f.category} on={(v) => setF({ ...f, category: v })} />
          </div>
          <Field label="Başlık" v={f.title} on={(v) => setF({ ...f, title: v })} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Tarih (örn. 30 Nisan 2026)" v={f.date_label} on={(v) => setF({ ...f, date_label: v })} />
            <Field label="Saat" v={f.time_label} on={(v) => setF({ ...f, time_label: v })} />
          </div>
          <Field label="Konum" v={f.location} on={(v) => setF({ ...f, location: v })} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Başlangıç ISO (2026-04-30T14:00:00+03:00)" v={f.start_date} on={(v) => setF({ ...f, start_date: v })} />
            <Field label="Bitiş ISO" v={f.end_date} on={(v) => setF({ ...f, end_date: v })} />
          </div>
          <Area label="Kısa açıklama" v={f.description} on={(v) => setF({ ...f, description: v })} rows={2} />
          <Area label="Uzun açıklama" v={f.long_description} on={(v) => setF({ ...f, long_description: v })} rows={6} />

          <div>
            <Label>Kapak Görseli</Label>
            <div className="mt-1 flex items-center gap-3">
              {f.image_url && (
                <img src={f.image_url} alt="" className="h-16 w-24 rounded border object-cover" />
              )}
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
                <Upload className="h-4 w-4" />
                {uploading ? "Yükleniyor..." : "Görsel yükle"}
                <input type="file" accept="image/*" className="hidden" onChange={pickImage} disabled={uploading} />
              </label>
              {f.image_url && (
                <Button size="sm" variant="ghost" onClick={() => setF({ ...f, image_url: "" })}>Kaldır</Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={f.is_upcoming} onCheckedChange={(v) => setF({ ...f, is_upcoming: v })} />
            <Label>Yaklaşan etkinlik olarak göster</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>İptal</Button>
          <Button
            disabled={!canSave || save.isPending}
            onClick={() =>
              save.mutate({
                data: { id: initial?.id, values: { ...f, image_url: f.image_url || null } },
              })
            }
          >
            {save.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1" value={v} onChange={(e) => on(e.target.value)} />
    </div>
  );
}
function Area({ label, v, on, rows }: { label: string; v: string; on: (v: string) => void; rows: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea className="mt-1" rows={rows} value={v} onChange={(e) => on(e.target.value)} />
    </div>
  );
}
