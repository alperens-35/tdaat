import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Users, Megaphone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/destek-ol")({
  head: () => ({
    meta: [
      { title: "Destek Ol — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'na destek olmanın yolları: üyelik, gönüllülük, etkinliklere katılım ve duyuru paylaşımı.",
      },
      { property: "og:title", content: "Destek Ol — TDAAT" },
      {
        property: "og:description",
        content: "Topluluğumuza destek olmanın yolları.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/destek-ol" },
    ],
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/destek-ol" }],
  }),
  component: DestekOl,
});

function DestekOl() {
  const ways = [
    {
      icon: Users,
      title: "Üye Ol",
      desc: "Topluluğumuza katıl, etkinliklerimizde aktif rol al.",
      href: "/uye-ol" as const,
      label: "Üye Ol",
    },
    {
      icon: Heart,
      title: "Gönüllü Ol",
      desc: "Organizasyon, içerik üretimi veya saha çalışmalarında bize yardım et.",
      href: "/contact" as const,
      label: "İletişime Geç",
    },
    {
      icon: Megaphone,
      title: "Duyur",
      desc: "Etkinliklerimizi ve içeriklerimizi sosyal medyada paylaşarak destek ol.",
      href: "/events" as const,
      label: "Etkinlikleri Gör",
    },
    {
      icon: Mail,
      title: "İş Birliği",
      desc: "Kurumsal iş birliği veya sponsorluk için bizimle iletişime geç.",
      href: "/contact" as const,
      label: "İletişim",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
          <Heart className="h-3.5 w-3.5" />
          Birlikte daha güçlüyüz
        </div>
        <h1 className="mt-6 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Destek Ol
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Türk Dünyası Akademik Araştırmalar Topluluğu olarak çalışmalarımızı
          gönüllü emekle yürütüyoruz. Bize farklı şekillerde destek olabilirsin.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {ways.map((w) => (
          <div
            key={w.title}
            className="flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent/50"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <w.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
              {w.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {w.desc}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" size="sm" className="font-[var(--font-heading)]">
                <Link to={w.href}>{w.label}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
