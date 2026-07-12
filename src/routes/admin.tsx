import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, FileText, Newspaper, Images, Users, LayoutDashboard, Shield, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false, // Sunucu taraflı render'ı bu rota için tamamen kapatıyoruz
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
  
  const [mounted, setMounted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // 1. ADIM: Tarayıcı ve DOM senkronizasyonunu (Hydration) güvene alıyoruz. Donmayı engeller.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. ADIM: Oturum ve Rol Doğrulaması
  useEffect(() => {
    if (!mounted) return;

    async function checkAdminSession() {
      try {
        // En güncel lokal oturumu beklemeden çek
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate({ to: "/auth", replace: true });
          return;
        }

        // Rol doğrulaması
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!role) {
          navigate({ to: "/", replace: true });
          return;
        }

        // Her şey okeyse içeri al
        setAuthorized(true);
      } catch (err) {
        console.error("Doğrulama hatası:", err);
        navigate({ to: "/", replace: true });
      } finally {
        setChecking(false);
      }
    }

    checkAdminSession();
  }, [mounted, navigate]);

  // İlk render veya sunucu tetiklemesinde kilitlenmeyi önlemek için nötr shell dön
  if (!mounted) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (checking) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Yönetici yetkileri doğrulanıyor...</span>
      </div>
    );
  }

  if (!authorized) return null;

  return (
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
        {/* KRİTİK FİX: Sadece authorized true olduğunda Outlet yüklenir. 
            Böylece alt sorgular (blog, event) yetki tam oturmadan ateşlenmez, RLS'e takılıp 0 dönmez! */}
        <Outlet />
      </main>
    </div>
  );
}