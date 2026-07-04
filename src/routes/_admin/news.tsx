import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { upsertNews, deleteNews } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Row = Database["public"]["Tables"]["news_items"]["Row"];

export const Route = createFileRoute("/_admin/news")({
  component: AdminNewsPage,
});

const CATS = ["politics", "culture", "education", "economy", "science"] as const;

const empty = {
  slug: "",
  title: "",
  summary: "",
  content: "",
  source: "",
  date_label: "",
  country: "",
  flag: "tr",
  category: "culture",
};

function AdminNewsPage() {
  const qc = useQueryClient();
  const { data: rows } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news_items").select("*").order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: useServerFn(deleteNews),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-news"] }); toast.success("Silindi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold">Haberler</h1>
        <Button onClick={() => setCreating(true)}><Plus className="mr-1 h-4 w-4" /> Yeni haber</Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Başlık</th>
              <th className="px-4 py-2 text-left">Ülke</th>
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
                <td className="px-4 py-2 text-muted-foreground">{r.country}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.date_label}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(r)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => { if (confirm(`"${r.title}" silinsin mi?`)) del.mutate({ data: { id: r.id } }); }}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {(!rows || rows.length === 0) && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">Henüz haber yok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {(editing || creating) && (
        <NewsDialog initial={editing} onClose={() => { setEditing(null); setCreating(false); }} />
      )}
    </div>
  );
}

function NewsDialog({ initial, onClose }: { initial: Row | null; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => {
    if (!initial) return empty;
    return {
      slug: initial.slug,
      title: initial.title,
      summary: initial.summary,
      content: initial.content.join("\n\n"),
      source: initial.source,
      date_label: initial.date_label,
      country: initial.country,
      flag: initial.flag,
      category: initial.category,
    };
  });

  const save = useMutation({
    mutationFn: useServerFn(upsertNews),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-news"] }); toast.success("Kaydedildi"); onClose(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const canSave = useMemo(
    () => f.slug && f.title && f.summary && f.content && f.source && f.date_label && f.country && f.flag && f.category,
    [f],
  );

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{initial ? "Haberi Düzenle" : "Yeni Haber"}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Slug (URL)" v={f.slug} on={(v) => setF({ ...f, slug: v })} />
            <div>
              <Label>Kategori</Label>
              <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
                {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Field label="Başlık" v={f.title} on={(v) => setF({ ...f, title: v })} />
          <Area label="Özet" v={f.summary} on={(v) => setF({ ...f, summary: v })} rows={2} />
          <Area label="İçerik (paragrafları boş satırla ayır)" v={f.content} on={(v) => setF({ ...f, content: v })} rows={10} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Kaynak" v={f.source} on={(v) => setF({ ...f, source: v })} />
            <Field label="Tarih (örn. 25 Mayıs 2026)" v={f.date_label} on={(v) => setF({ ...f, date_label: v })} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Ülke" v={f.country} on={(v) => setF({ ...f, country: v })} />
            <Field label="Bayrak kodu (tr, az, kz, kg, uz, tm, ...)" v={f.flag} on={(v) => setF({ ...f, flag: v.toLowerCase() })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>İptal</Button>
          <Button disabled={!canSave || save.isPending} onClick={() =>
            save.mutate({
              data: {
                id: initial?.id,
                values: { ...f, content: f.content.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean) },
              },
            })
          }>
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
