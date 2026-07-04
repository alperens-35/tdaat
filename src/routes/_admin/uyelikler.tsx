import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMemberships, updateMembershipStatus } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";

export const Route = createFileRoute("/_admin/uyelikler")({
  component: AdminMembershipsPage,
});

function AdminMembershipsPage() {
  const qc = useQueryClient();
  const list = useServerFn(listMemberships);
  const { data } = useQuery({
    queryKey: ["admin-memberships"],
    queryFn: () => list(),
  });

  const update = useMutation({
    mutationFn: useServerFn(updateMembershipStatus),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-memberships"] }); toast.success("Güncellendi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="mb-6 font-[var(--font-heading)] text-2xl font-bold">Üyelik Başvuruları</h1>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Ad Soyad</th>
              <th className="px-4 py-2 text-left">İletişim</th>
              <th className="px-4 py-2 text-left">Bölüm</th>
              <th className="px-4 py-2 text-left">Durum</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((r) => (
              <tr key={r.id} className="border-t border-border/40 align-top">
                <td className="px-4 py-3">
                  <div className="font-medium">{r.full_name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("tr-TR")}</div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  <div>{r.email}</div>
                  {r.phone && <div>{r.phone}</div>}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {r.faculty}<br />
                  {r.department} • {r.year}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                  {r.motivation && (
                    <details className="mt-2 max-w-xs">
                      <summary className="cursor-pointer text-xs text-primary">Motivasyonu gör</summary>
                      <p className="mt-1 text-xs text-muted-foreground">{r.motivation}</p>
                    </details>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost"
                      disabled={r.status === "approved"}
                      onClick={() => update.mutate({ data: { id: r.id, status: "approved" } })}>
                      <Check className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button size="sm" variant="ghost"
                      disabled={r.status === "rejected"}
                      onClick={() => update.mutate({ data: { id: r.id, status: "rejected" } })}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button size="sm" variant="ghost"
                      disabled={r.status === "pending"}
                      onClick={() => update.mutate({ data: { id: r.id, status: "pending" } })}>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">Başvuru yok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "approved" ? "bg-emerald-500/10 text-emerald-600"
    : status === "rejected" ? "bg-destructive/10 text-destructive"
    : "bg-muted text-muted-foreground";
  const label = status === "approved" ? "Onaylandı" : status === "rejected" ? "Reddedildi" : "Bekliyor";
  return <span className={`rounded px-2 py-0.5 text-xs font-medium ${style}`}>{label}</span>;
}
