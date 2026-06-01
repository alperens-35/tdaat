import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Handshake, Users, BookOpen, Megaphone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/destek-ol")({
  head: () => ({
    meta: [
      { title: "Destek Ol & Sponsorluk — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'na bağış, sponsorluk ve gönüllülükle destek olun. Etkinliklerimizin parçası olun.",
      },
      { property: "og:title", content: "Destek Ol & Sponsorluk — TDAAT" },
      {
        property: "og:description",
        content: "Bağış, sponsorluk ve gönüllülük yoluyla topluluğa destek olun.",
      },
    ],
  }),
  component: DestekOlPage,
});

const sponsorshipTiers = [
  {
    name: "Dost",
    icon: Heart,
    description: "Bireysel destekçiler için. Tek seferlik veya düzenli katkı.",
    perks: [
      "Etkinlik bültenimizde teşekkür",
      "Topluluk dijital sertifikası",
      "Özel etkinlik davetleri",
    ],
  },
  {
    name: "Destekçi",
    icon: Handshake,
    description: "Küçük işletmeler ve kurumlar için sponsorluk paketi.",
    perks: [
      "Etkinlik afişlerinde logo",
      "Sosyal medyada tanıtım",
      "Web sitesinde sponsor sayfasında yer alma",
      "1 etkinlikte stant hakkı",
    ],
    featured: true,
  },
  {
    name: "Stratejik Ortak",
    icon: Megaphone,
    description: "Büyük kurumsal işbirlikleri ve ana sponsorluklar.",
    perks: [
      "Tüm etkinliklerde ana sponsor olarak yer alma",
      "Özel panel / workshop düzenleme imkânı",
      "Yıllık raporda öne çıkan tanıtım",
      "Üyelerimizle özel networking buluşması",
    ],
  },
];

const supportWays = [
  {
    icon: Heart,
    title: "Bağış Yap",
    description: "Tek seferlik veya düzenli bağışlarınla etkinliklerimizi sürdürmemize destek ol.",
  },
  {
    icon: Handshake,
    title: "Sponsor Ol",
    description: "Kurumun veya işletmen adına etkinliklerimize sponsor olarak markanı öğrencilerle buluştur.",
  },
  {
    icon: Users,
    title: "Gönüllü Ol",
    description: "Zamanını ve yeteneklerini paylaş. Etkinlik organizasyonu, içerik üretimi ve daha fazlası.",
  },
  {
    icon: BookOpen,
    title: "Bilgi Paylaş",
    description: "Konuşmacı, panelist veya akademik danışman olarak topluluğumuza katkı sağla.",
  },
];

function DestekOlPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
            <Heart className="h-3.5 w-3.5" />
            Destek Ol
          </div>
          <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Birlikte Daha Güçlüyüz
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            TDAAT olarak Türk dünyasının akademik ve kültürel mirasını gençlere taşıyoruz.
            Bu yolculukta yanımızda olmanın birçok yolu var.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href="mailto:egeturkduyasitoplulugu@gmail.com?subject=Sponsorluk%20%2F%20Ba%C4%9F%C4%B1%C5%9F">
                <Mail className="mr-2 h-4 w-4" />
                İletişime Geç
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/uye-ol">Gönüllü Ol</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to support */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Destek Yolları
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          Sadece bağış değil; bilgi, zaman ve görünürlük de bizim için kıymetli.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportWays.map((w) => (
            <div
              key={w.title}
              className="rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent/50"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-foreground">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsorship tiers */}
      <section className="border-y border-border/50 bg-accent/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sponsorluk Paketleri
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Markanı veya kurumunu gençlerle buluştur. İhtiyacına uygun paketi seç, detayları konuşalım.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-xl border bg-background p-6 ${
                  tier.featured ? "border-primary shadow-lg" : "border-border/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <tier.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                      Popüler
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Button
                    asChild
                    variant={tier.featured ? "default" : "outline"}
                    className="w-full"
                  >
                    <a
                      href={`mailto:egeturkduyasitoplulugu@gmail.com?subject=Sponsorluk%20-%20${encodeURIComponent(tier.name)}`}
                    >
                      Bu Paketle İlgileniyorum
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Desteğin Nereye Gidiyor?
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="font-[var(--font-heading)] text-3xl font-bold text-primary">%40</div>
            <p className="mt-2 text-sm text-muted-foreground">Etkinlik organizasyonu (panel, sempozyum, gezi)</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="font-[var(--font-heading)] text-3xl font-bold text-primary">%35</div>
            <p className="mt-2 text-sm text-muted-foreground">Akademik yayın ve içerik üretimi</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="font-[var(--font-heading)] text-3xl font-bold text-primary">%25</div>
            <p className="mt-2 text-sm text-muted-foreground">Topluluk altyapısı ve üye desteği</p>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Detaylı bilgi ve özel sponsorluk talepleri için bize ulaşın:{" "}
          <a
            href="mailto:egeturkduyasitoplulugu@gmail.com"
            className="font-medium text-primary hover:underline"
          >
            egeturkduyasitoplulugu@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
