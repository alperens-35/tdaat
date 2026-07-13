import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Mail, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type MemberRow = Database["public"]["Tables"]["members"]["Row"];

export const Route = createFileRoute("/admin/uyelikler")({
  ssr: false,
  component: AdminMembersPage,
});

function AdminMembersPage() {
  const { isReady } = useAuth();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["admin-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("joined_at", { ascending: false });
      if (error) throw error;
      return data as MemberRow[];
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
          Üyelik Yönetimi
        </h1>
        <Button asChild>
          <Link to="/admin/uyelikler/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Yeni Üye Ekle
          </Link>
        </Button>
      </div>

      {members.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Henüz üye kaydı yok.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <Badge variant="outline">{member.role}</Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {member.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {member.joined_at ? new Date(member.joined_at).toLocaleDateString("tr-TR") : ""}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/uyelikler/$id/edit" params={{ id: member.id }}>
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