import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, Shield, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { useIsAdmin } from "@/hooks/use-admin";
import { useAuthUser } from "@/hooks/use-auth-user";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { isAdmin } = useIsAdmin();
  const { user } = useAuthUser();

  const handleSignOut = async () => {
    try {
      // Çıkış işleminin tamamlanmasını bekle
      await supabase.auth.signOut();
      
      // Bildirimi göster
      toast.success("Oturum başarıyla kapatıldı.");
      
      // Kullanıcıyı ana sayfaya gönder ve geçmişi temizle
      // replace: true ile kullanıcının geri tuşuyla admin paneline dönmesi engellenir
      await navigate({ to: "/", replace: true });
    } catch (error) {
      toast.error("Çıkış yapılırken bir sorun oluştu.");
      console.error("Sign out error:", error);
    }
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/turk-dunyasi", label: t("nav.turkWorld") },
    { to: "/about", label: t("nav.about") },
    { to: "/events", label: t("nav.events") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/team", label: t("nav.team") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logo} alt="Logo" className="h-9 w-9" />
          <span className="hidden sm:inline">TDAAT</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <Shield className="h-4 w-4" /> Yönetim
            </Link>
          )}

          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" /> Çıkış
            </Button>
          )}

          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}