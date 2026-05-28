import { Link } from "@tanstack/react-router";
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
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
                alt="TDAAT Logo"
                className="h-8 w-auto object-contain"
              />
              Türk Dünyası Akademik Araştırmalar Topluluğu
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda
              birlikte güçlendikleri bir topluluk.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
              Sayfalar
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Ekibimiz
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-semibold tracking-wide text-foreground">
              Sosyal Medya
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
                href="#"
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
              İletişim
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>egeturkduyasitoplulugu@gmail.com</li>
              <li>İzmir, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TDAAT. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
