import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, HandCoins, Sparkles, Users, Mail, Megaphone, Check, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/destek-ol")({
  head: () => ({
    meta: [
      { title: "Destek Ol — TDAAT" },
      {
        name: "description",
        content:
          "TDAAT'a bağış, sponsorluk, gönüllülük veya bilgi paylaşımıyla destek ol. Sponsorluk paketleri ve katkının nasıl kullanıldığını gör.",
      },
      { property: "og:title", content: "Destek Ol — TDAAT" },
      {
        property: "og:description",
        content: "Bağış, sponsorluk, gönüllülük ve bilgi paylaşımıyla topluluğumuza destek ol.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/destek-ol" },
    ],
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/destek-ol" }],
  }),
  component: DestekOl,
});

const ways = [
  {
    icon: HandCoins,
    title: "Bağış Yap",
    desc: "Tek seferlik veya düzenli bağışlarınla etkinliklerimizi sürdürmemize yardım et.",
    href: "/contact" as const,
    label: "İletişime Geç",
  },
  {
    icon: Sparkles,
    title: "Sponsor Ol",
    desc: "Kurumun adını topluluk etkinliklerimizde görünür kıl, öğrencilere ulaş.",
    href: "/contact" as const,
    label: "Sponsorluk Görüş",
  },
  {
    icon: Users,
    title: "Gönüllü Ol",
    desc: "Organizasyon, içerik üretimi ve saha çalışmalarımızda aktif rol al.",
    href: "/uye-ol" as const,
    label: "Üye Ol",
  },
  {
    icon: Mail,
    title: "Bilgi Al",
    desc: "İş birliği, protokol ve etkinlik fikirleri için bizimle iletişime geç.",
    href: "/contact" as const,
    label: "İletişim",
  },
];

const tiers = [
  {
    icon: Heart,
    name: "Dost",
    desc: "Bireysel destekçiler için. Tek seferlik veya düzenli katkı.",
    features: [
      "Etkinlik bültenimizde teşekkür",
      "Topluluk dijital sertifikası",
      "Özel etkinlik davetleri",
    ],
    highlight: false,
  },
  {
    icon: Sparkles,
    name: "Destekçi",
    desc: "Küçük işletmeler ve kurumlar için sponsorluk paketi.",
    features: [
      'Tüm "Dost Paketi" avantajları',
      "Etkinlik afişlerinde logo",
      "Sosyal medyada tanıtım",
      "Web sitesinde sponsor sayfasında yer alma",
      "1 etkinlikte stant hakkı",
    ],
    highlight: true,
  },
  {
    icon: Megaphone,
    name: "Stratejik Ortak",
    desc: "Büyük kurumsal işbirlikleri ve ana sponsorluklar.",
    features: [
      'Tüm "Destekçi Paketi" Avantajları',
      "Tüm etkinliklerde ana sponsor olarak yer alma",
      "Özel panel / workshop düzenleme imkânı",
      "Yıllık raporda öne çıkan tanıtım",
      "Üyelerimizle özel networking buluşması",
    ],
    highlight: false,
  },
];

const impact = [
  {
    icon: Target,
    percent: "40%",
    title: "Etkinlikler",
    desc: "Konferans, panel, atölye, gezi ve kültürel buluşmalar.",
  },
  {
    icon: Megaphone,
    percent: "35%",
    title: "İçerik & Yayın",
    desc: "Makale, dergi, video, podcast ve dijital içerik üretimi.",
  },
  {
    icon: Users,
    percent: "25%",
    title: "Topluluk",
    desc: "Üye gelişimi, eğitim materyalleri ve operasyonel giderler.",
  },
];

function DestekOl() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
          <Heart className="h-3.5 w-3.5" />
          Birlikte daha güçlüyüz
        </div>
        <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Destek Ol
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Türk Dünyası Akademik Araştırmalar Topluluğu çalışmalarını gönüllü emekle yürütüyor.
          Bağış, sponsorluk veya gönüllülükle yanımızda olabilir; akademik üretimi ve kültürel
          mirası yaşatma çabamıza ortak olabilirsin.
        </p>
      </section>

      {/* Destek Yolları */}
      <section className="w-full border-y border-border/50 bg-accent/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Destek Yolları
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Sadece bağış değil; bilgi, zaman ve görünürlük de bizim için kıymetli.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w) => (
              <div
                key={w.title}
                className="flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                  {w.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                <div className="mt-5">
                  <Button asChild variant="outline" size="sm" className="font-[var(--font-heading)]">
                    <Link to={w.href}>{w.label}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorluk Paketleri */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sponsorluk Paketleri
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Markanı veya kurumunu gençlerle buluştur. İhtiyacına uygun paketi seç, detayları
            konuşalım.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 transition-shadow hover:shadow-md ${
                t.highlight
                  ? "border-primary/40 ring-1 ring-primary/30"
                  : "border-border/60"
              }`}
            >
              {t.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Önerilen
                </Badge>
              )}
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
                  {t.name}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={t.highlight ? "default" : "outline"}
                className="mt-8 font-[var(--font-heading)]"
              >
                <Link to="/contact">
                  Bu Paketle İlgileniyorum <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Katkın Nereye Gidiyor */}
      <section className="w-full border-t border-border/50 bg-accent/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Katkın Nereye Gidiyor?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Şeffaflık bizim için önemli. Topluluğa yapılan katkılar şu üç alana yönlendiriliyor.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {impact.map((i) => (
              <div
                key={i.percent}
                className="rounded-2xl border border-border/60 bg-card p-8 text-center"
              >
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 font-[var(--font-heading)] text-4xl font-bold text-primary">
                  {i.percent}
                </div>
                <h3 className="mt-3 font-[var(--font-heading)] text-base font-semibold text-foreground">
                  {i.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl">
            Bir sonraki etkinliği birlikte ayağa kaldıralım
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Sponsorluk, bağış veya iş birliği için bize yaz. 48 saat içinde geri dönüş yapıyoruz.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background font-[var(--font-heading)] text-foreground hover:bg-background/90"
            >
              <Link to="/contact">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
