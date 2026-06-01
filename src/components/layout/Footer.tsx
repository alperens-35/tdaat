import { Link } from "@tanstack/react-router";
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";
import { useI18n } from "@/lib/i18n";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 font-[var(--font-heading)] text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <img
                src={logo}
                alt="Türk Dünyası Akademik Araştırmalar Topluluğu Logosu"
                className="h-8 w-auto object-contain"
              />
              Türk Dünyası Akademik Araştırmalar Topluluğu
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 max-w-xs">
              <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
                Bültenimize abone ol
              </h3>
              <NewsletterForm />
            </div>
          </div>



          {/* Links */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
              {t("footer.pages")}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t("nav.events")}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t("nav.team")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/takvim" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {"\u200B"}
                </Link>
              </li>
              <li>
                <Link to="/uye-ol" className="text-sm font-medium text-primary transition-colors hover:underline">
                  Üye Ol
                </Link>
              </li>
            </ul>
          </div>


          {/* Social Media */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
              {t("footer.social")}
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="https://x.com/egeturkdunyasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="https://www.instagram.com/ege.turkdunyasitoplulugu?igsh=b2JoeXVlZDV5eWN1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1FtUp8x9cA/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
              <a
                href="https://youtube.com/@egeuniversitesiturkdunyasi?si=dxE6gGUKM5ut7nRY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
              {t("footer.contact")}
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:egeturkduyasitoplulugu@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  egeturkduyasitoplulugu@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Ege+%C3%9Cniversitesi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {t("footer.location")}
                </a>
              </li>
              <li>
                <Link to="/contact" hash="sss" className="transition-colors hover:text-primary">
                  SSS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TDAAT. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
