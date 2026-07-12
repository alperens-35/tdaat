import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-accent/20 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
          TDAAT
        </div>
        <h1 className="mt-6 font-[var(--font-heading)] text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-foreground">
          Bu yol bizi bir yere çıkarmıyor
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığın sayfa Türk dünyasının bu köşesinde yok. Anasayfadan yeniden başlayabilir veya etkinliklerimize göz atabilirsin.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Anasayfaya Dön
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Etkinliklere Bak
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Bu sayfa yüklenemedi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bir şeyler ters gitti. Yenilemeyi dene veya anasayfaya dön.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Yeniden Dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Anasayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Türk Dünyası Akademik Araştırmalar Topluluğu" },
      { name: "description", content: "Türk Dünyası Akademik Araştırmalar Topluluğu, üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk." },
      { property: "og:title", content: "Türk Dünyası Akademik Araştırmalar Topluluğu" },
      { property: "og:description", content: "Türk Dünyası Akademik Araştırmalar Topluluğu, üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Türk Dünyası Akademik Araştırmalar Topluluğu" },
      { name: "twitter:description", content: "Türk Dünyası Akademik Araştırmalar Topluluğu, üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk." },
      { property: "og:image", content: "https://tdaat.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://tdaat.lovable.app/og-image.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      { children: themeInitScript },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            {/* <ArfWidget /> satırı buradan tamamen kaldırıldı */}
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
