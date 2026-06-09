import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Handshake, Users, BookOpen, Megaphone, Check, Mail, ArrowRight, Target } from "lucide-react";
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
    icon: Heart,
    title: "Bağış Yap",
    desc: "Tek seferlik veya düzenli bağışlarınla etkinliklerimizi sürdürmemize destek ol.",
  },
  {
    icon: Handshake,
    title: "Sponsor Ol",
    desc: "Kurumun veya işletmen adına etkinliklerimize sponsor olarak markanı öğrencilerle buluştur.",
  },
  {
    icon: Users,
    title: "Gönüllü Ol",
    desc: "Zamanını ve yeteneklerini paylaş. Etkinlik organizasyonu, içerik üretimi ve daha fazlası.",
  },
  {
    icon: BookOpen,
    title: "Bilgi Paylaş",
    desc: "Konuşmacı, panelist veya akademik danışman olarak topluluğumuza katkı sağla.",
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
    icon: Handshake,
    name: "Destekçi",
    desc: "Küçük işletmeler ve kurumlar için sponsorluk paketi.",
    features: [
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
          Destek Ol
        </div>
        <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Birlikte Daha Güçlüyüz
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          TDAAT olarak Türk dünyasının akademik ve kültürel mirasını gençlere taşıyoruz. Bu
          yolculukta yanımızda olmanın birçok yolu var.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="font-[var(--font-heading)]">
            <Link to="/contact">
              <Mail className="mr-1.5 h-4 w-4" /> İletişime Geç
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-[var(--font-heading)]">
            <Link to="/uye-ol">Gönüllü Ol</Link>
          </Button>
        </div>
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
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-foreground">
                    {t.name}
                  </h3>
                </div>
                {t.highlight && <Badge variant="secondary">Popüler</Badge>}
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
    </div>
  );
}
