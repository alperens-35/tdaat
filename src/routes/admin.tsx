// src/routes/admin.tsx
import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, FileText, Newspaper, Images, Users, LayoutDashboard, Shield, Loader2 } from "lucide-react";
import { AuthProvider } from "@/contexts/AuthContext";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
});

const items = [
  { to: "/admin", label: "Özet", icon: LayoutDashboard, exact: true },
  { to: "/admin/events", label: "Etkinlikler", icon: CalendarDays, exact: false },
  { to: "/admin/blog", label: "Blog", icon: FileText, exact: false },
  { to: "/admin/news", label: "Haberler", icon: Newspaper, exact: false },
  { to: "/admin/gallery", label: "Galeri", icon: Images, exact: false },
  { to: "/admin/uyelikler", label: "Üyelikler", icon: Users, exact: false },
  { to: "/admin/roller", label: "Rol Yönetimi", icon: Shield, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    let isMounted = true;

    async function verifyAdmin() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/auth", replace: true });
          }
          return;
        }

        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!roleData) {
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/", replace: true });
          }
          return;
        }

        if (isMounted) setStatus("authorized");
      } catch {
        if (isMounted) {
          setStatus("unauthorized");
          navigate({ to: "/", replace: true });
        }
      }
    }

    verifyAdmin();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && isMounted) {
        setStatus("unauthorized");
        navigate({ to: "/auth", replace: true });
      }
    });

    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);

  if (status === "loading") {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Güvenli yönetim oturumu doğrulanıyor...</span>
      </div>
    );
  }

  if (status === "unauthorized") return null;

  return (
    <AuthProvider>
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="w-56 shrink-0">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Yönetim Paneli
          </div>
          <nav className="flex flex-col gap-1">
            {items.map((it) => {
              const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
              const Icon = it.icon;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}