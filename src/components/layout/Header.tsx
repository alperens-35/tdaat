import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import arfLogo from "@/assets/arf-avatar.png";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/turk-dunyasi", label: t("nav.turkWorld") },
    { to: "/about", label: t("nav.about") },
    { to: "/events", label: t("nav.events") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/team", label: t("nav.team") },
    { to: "/arf", label: t("nav.arf") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-[var(--font-heading)] text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <img src={logo} alt="Türk Dünyası Akademik Araştırmalar Topluluğu Logosu" className="h-9 w-9 object-contain" />
          <span className="hidden sm:inline">TDAAT</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.to === "/arf" ? (
                <span className="flex items-center gap-1.5">
                  {link.label}
                  <img src={arfLogo} alt="Arf" className="h-4 w-4 rounded-full object-cover" />
                </span>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <Link
            to="/uye-ol"
            className="hidden rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
          >
            {t("nav.join")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("nav.toggleMenu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.to === "/arf" ? (
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    <img src={arfLogo} alt="Arf" className="h-4 w-4 rounded-full object-cover" />
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
