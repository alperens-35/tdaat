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
        console.log('[AdminLayout] verifyAdmin başladı');
        
        // 1. localStorage'dan token'ı oku
        const storageKey = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
        console.log('[AdminLayout] storageKey:', storageKey);
        
        if (!storageKey) {
          console.warn('[AdminLayout] localStorage\'da auth token yok');
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/auth", replace: true });
          }
          return;
        }

        const raw = localStorage.getItem(storageKey);
        if (!raw) {
          console.warn('[AdminLayout] localStorage\'da raw token yok');
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/auth", replace: true });
          }
          return;
        }

        const parsed = JSON.parse(raw);
        console.log('[AdminLayout] localStorage\'dan token okundu:', parsed);

        // 2. 🚀 KRİTİK: setSession'ı bypass et, internal session'ı manuel set et
        // @ts-ignore - internal kullanım (Supabase client'ının internal state'i)
        supabase.auth._session = {
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token,
          user: parsed.user,
          expires_at: parsed.expires_at,
        };
        // @ts-ignore - listener'ları tetikle
        supabase.auth._notifyAllSubscribers('SIGNED_IN', supabase.auth._session);
        console.log('[AdminLayout] Internal session manuel olarak set edildi');

        // 3. Şimdi session'ı kullanarak admin rolünü kontrol et
        const userId = parsed.user?.id;
        if (!userId) {
          console.warn('[AdminLayout] user id yok');
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/auth", replace: true });
          }
          return;
        }

        console.log('[AdminLayout] user_roles sorgulanıyor, userId:', userId);
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();

        console.log('[AdminLayout] user_roles sonucu:', { roleData, roleError });

        if (roleError) {
          console.error('[AdminLayout] user_roles sorgu hatası:', roleError);
        }

        if (!roleData) {
          console.warn('[AdminLayout] Admin rolü bulunamadı, unauthorized');
          if (isMounted) {
            setStatus("unauthorized");
            navigate({ to: "/", replace: true });
          }
          return;
        }

        console.log('[AdminLayout] Admin rolü doğrulandı, authorized');
        if (isMounted) setStatus("authorized");
      } catch (err) {
        console.error('[AdminLayout] verifyAdmin beklenmedik hata:', err);
        if (isMounted) {
          setStatus("unauthorized");
          navigate({ to: "/", replace: true });
        }
      }
    }

    verifyAdmin();

    // Oturum değişikliklerini dinle (güvenlik ağı)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AdminLayout] onAuthStateChange event:', event, 'session:', session);
      if (event === "SIGNED_OUT" && isMounted) {
        console.warn('[AdminLayout] SIGNED_OUT yakalandı, unauthorized');
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