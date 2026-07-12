import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldAlert, ShieldCheck, UserPlus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/roller")({
  component: AdminRolesPage,
});

interface UserRoleRow {
  id: string;
  user_id: string;
  role: string;
  created_at?: string;
}

function AdminRolesPage() {
  const qc = useQueryClient();
  const [newUserId, setNewUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sistemdeki aktif yöneticileri sorgula
  const { data: roles, isLoading } = useQuery({
    queryKey: ["admin-roles-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "admin");
      
      if (error) throw new Error(error.message);
      return (data ?? []) as UserRoleRow[];
    },
  });

  // Yeni admin atama mutasyonu
  const grantAdminRole = useMutation({
    mutationFn: async (targetUserId: string) => {
      // Girdi doğrulama UUID kontrolü
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(targetUserId.trim())) {
        throw new Error("Geçersiz biçim. Lütfen geçerli bir User ID (UUID) girin.");
      }

      const { data, error } = await supabase
        .from("user_roles")
        .insert([{ user_id: targetUserId.trim(), role: "admin" }])
        .select();

      if (error) {
        if (error.code === "23505") throw new Error("Bu kullanıcı zaten admin rolüne sahip.");
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-roles-list"] });
      toast.success("Kullanıcıya başarıyla yetki verildi.");
      setNewUserId("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Yetkilendirme başarısız oldu.");
    },
    onSettled: () => setIsSubmitting(false),
  });

  // Admin yetkisini geri alma mutasyonu
  const revokeAdminRole = useMutation({
    mutationFn: async (rowId: string) => {
      const { data: currentAuth } = await supabase.auth.getUser();
      const targetRow = roles?.find(r => r.id === rowId);
      
      if (targetRow && currentAuth.user?.id === targetRow.user_id) {
        throw new Error("Kendi adminlik yetkinizi panel üzerinden kaldıramazsınız.");
      }

      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", rowId);

      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-roles-list"] });
      toast.success("Yöneticilik yetkisi başarıyla geri alındı.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Yetki kaldırma işlemi başarısız.");
    },
  });

  const handleGrantRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId.trim()) return;
    setIsSubmitting(true);
    grantAdminRole.mutate(newUserId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Rol Yönetimi
        </h1>
      </div>

      {/* Yeni Yönetici Ekleme Formu */}
      <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
        <form onSubmit={handleGrantRole} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="user-id-input" className="text-sm font-medium">
              Yeni Yönetici Atama (User ID)
            </Label>
            <p className="text-xs text-muted-foreground">
              Yetkilendirilecek kullanıcının Supabase üzerindeki benzersiz User ID (UUID) değerini girin.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Input
                id="user-id-input"
                placeholder="e.g. 8f3b2c1a-4d5e-6f7a-8b9c-0d1e2f3a4b5c"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                disabled={isSubmitting}
                className="font-mono text-xs max-w-xl"
              />
              <Button type="submit" disabled={isSubmitting || !newUserId.trim()}>
                <UserPlus className="mr-2 h-4 w-4" /> Yetki Ver
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Aktif Yönetici Listesi */}
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="bg-muted/30 px-4 py-3 border-b border-border/40">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Sistem Yöneticileri Listesi
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground border-b border-border/40">
            <tr>
              <th className="px-4 py-3 text-left">Kullanıcı Benzersiz Kimliği (User ID)</th>
              <th className="px-4 py-3 text-left">Rol Yetkisi</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground animate-pulse">
                  Yönetici listesi doğrulanıyor...
                </td>
              </tr>
            ) : (!roles || roles.length === 0) ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  Sistemde kayıtlı yönetici bulunamadı.
                </td>
              </tr>
            ) : (
              roles.map((r) => (
                <tr key={r.id} className="border-t border-border/40 hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-foreground tracking-tight selection:bg-primary/20">
                    {r.user_id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {r.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm("Bu kullanıcının yöneticilik yetkisini iptal etmek istediğinize emin misiniz?")) {
                          revokeAdminRole.mutate(r.id);
                        }
                      }}
                      className="hover:bg-destructive/10 text-muted-foreground hover:text-destructive group"
                    >
                      <Trash2 className="h-4 w-4 transition-transform group-hover:scale-105" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}