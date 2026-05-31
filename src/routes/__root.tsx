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
import { ArfWidget } from "@/components/arf/ArfWidget";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığın sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Anasayfaya Dön
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
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4eec6068-58dc-4f5e-ad80-12687e2b7680/id-preview-3b671f81--b508f5c4-6ed9-45c9-b79a-668caf05fa74.lovable.app-1779979674819.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4eec6068-58dc-4f5e-ad80-12687e2b7680/id-preview-3b671f81--b508f5c4-6ed9-45c9-b79a-668caf05fa74.lovable.app-1779979674819.png" },
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
            <ArfWidget />
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
