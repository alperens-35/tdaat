import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, BookOpen, History, Music, ArrowRight, Calendar, Users, Mountain, Wind, Landmark } from "lucide-react";

export const Route = createFileRoute("/turk-dunyasi")({
  component: TurkDunyasiPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/turk-dunyasi" }],
    meta: [
      { title: "Türk Dünyası — TDAAT" },
      { name: "description", content: "Bağımsız Türk devletleri, ortak tarih, dil ve kültür mirasımız. TDAAT ile Türk dünyasını tanıyın." },
      { property: "og:title", content: "Türk Dünyası — TDAAT" },
      { property: "og:description", content: "Bağımsız Türk devletleri, ortak tarih, dil ve kültür mirasımız." },
      { property: "og:url", content: "https://tdaat.lovable.app/turk-dunyasi" },
    ],
  }),
});

const countries = [
  {
    flag: "🇹🇷",
    name: "Türkiye",
    capital: "Ankara",
    population: "~85 milyon",
    description: "Türk dünyasının kalbi; binlerce yıllık medeniyet birikimiyle İstanbul'dan Anadolu'ya uzanan köprü.",
    icon: Landmark,
  },
  {
    flag: "🇦🇿",
    name: "Azerbaycan",
    capital: "Bakü",
    population: "~10 milyon",
    description: "Hazar'ın incisi; ateşgedeler diyarı, petrol ve kültür zenginliğiyle Kafkasya'nın parlayan yıldızı.",
    icon: Wind,
  },
  {
    flag: "🇰🇿",
    name: "Kazakistan",
    capital: "Astana",
    population: "~20 milyon",
    description: "Bozkırın genişliği; Türkistan'ın tarihî merkezi, modern mimarisiyle Avrasya'nın kesişme noktası.",
    icon: Mountain,
  },
  {
    flag: "🇰🇬",
    name: "Kırgızistan",
    capital: "Bişkek",
    population: "~7 milyon",
    description: "Cennetin dağları; Manas destanının doğduğu topraklar, Issık Göl'ün serinliğinde Türk ruhu.",
    icon: Mountain,
  },
  {
    flag: "🇺🇿",
    name: "Özbekistan",
    capital: "Taşkent",
    population: "~36 milyon",
    description: "İpek Yolu'nun kalbi; Semerkant ve Buhara'nın altın mozayikleriyle Türk-İslam medeniyetinin beşiği.",
    icon: Globe,
  },
  {
    flag: "🇹🇲",
    name: "Türkmenistan",
    capital: "Aşkabat",
    population: "~7 milyon",
    description: "Karakum'un incisi; Akhal-Tekke atları ve mermer şehirleriyle büyük ölçüde bağımsız bir Türk mirası.",
    icon: Wind,
  },
];

const heritage = [
  {
    icon: BookOpen,
    title: "Ortak Dil Mirası",
    description:
      "Orhun Yazıtları'ndan günümüze uzanan Türk dilleri; akraba lehçeler olarak birbirine bağlı bir ağ oluşturur. Türkçe, Azerbaycanca, Kazakça, Kırgızca, Özbekçe ve Türkmençe ortak kökenleriyle yüzyıllardır iletişim, edebiyat ve bilgi aktarımının taşıyıcısıdır.",
  },
  {
    icon: History,
    title: "Ortak Tarih",
    description:
      "Göktürk Kağanlığı'ndan Cengiz Han imparatorluğuna, Selçuklular'dan Osmanlı'ya ve Timurulara kadar Türk halkları ortak bir tarih coğrafyasında rol oynamıştır. Bu ortak geçmiş, günümüzde akademik araştırmaların zengin bir kaynağını oluşturur.",
  },
  {
    icon: Music,
    title: "Ortak Kültür",
    description:
      "Nevruz'dan ağızlara, atlı sporlardan çay ritüellerine, hat sanatından kilim dokumacılığına kadar Türk dünyası paylaşılan bir kültür hazinesine sahiptir. Her topluluk bu mirası kendi yorumuyla zenginleştirmiş ve yaşatmıştır.",
  },
];

function TurkDunyasiPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Türk Dünyası
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Altı bağımsız devlet, yüzlerce yıllık ortak tarih ve milyonlarca insan. Türk dünyası;
            Orta Asya bozkırlarından Anadolu'nun ovalarına, Kafkasya'dan İpek Yolu'na kadar
            uzayan geniş bir coğrafyada kök salmış ortak bir medeniyet ailesidir.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span>6 bağımsız devlet</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>~170 milyon + nüfus</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Ortak dil ailesi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bağımsız Türk Devletleri
            </h2>
            <p className="mt-2 text-muted-foreground">
              Günümüzde egemenliğini ilan etmiş altı Türk devleti ve temel bilgileri.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) => (
              <div
                key={c.name}
                className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl" role="img" aria-label={`${c.name} bayrağı`}>
                    {c.flag}
                  </span>
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                  {c.name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {c.capital}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {c.population}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ortak Mirasımız
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Tarih, dil ve kültür; bizi bir arada tutan üç temel sütun.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {heritage.map((h) => (
            <div key={h.title} className="rounded-xl border border-border/60 bg-card p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-foreground">
                {h.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Türk Dünyası'nı birlikte keşfedelim.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base opacity-90">
            Etkinliklerimiz, panellerimiz ve yayınlarımızla bu zengin mirası üniversite hayatına taşıyoruz.
            Sen de aramıza katıl.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary-foreground font-[var(--font-heading)] text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/events">
                <Calendar className="mr-1.5 h-4 w-4" />
                Etkinlikleri Keşfet
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent font-[var(--font-heading)] text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/about">
                Hakkımızda <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
