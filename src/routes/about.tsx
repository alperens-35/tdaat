import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Heart, Eye, BookOpen, Calendar, Globe2, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pastEvents } from "@/lib/events-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/about" }],
    meta: [
      { title: "Hakkımızda — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu hakkında: Misyonumuz, vizyonumuz ve topluluğumuzun hikayesi.",
      },
      {
        property: "og:title",
        content: "Hakkımızda — TDAAT",
      },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu hakkında: Misyonumuz, vizyonumuz ve topluluğumuzun hikayesi.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hakkımızda
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-left">
            Ege Üniversitesi Türk Dünyası Akademik Araştırmalar Topluluğu (TDAAT) 2025 yılında üniversitemiz bünyesinde kurulmuştur.
            Dede Korkut'un sesiyle, Yusuf Has Hacip'in öğüdüyle, Bilge Kağan'ın izinde; kültürümüzü tanımak, yaşatmak ve paylaşmak için bir aradayız.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
                Hikâyemiz
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Türk Dünyası Akademik Araştırmalar Topluluğu, Mayıs 2025'te Ege Üniversitesi Sağlık,
                Kültür ve Spor Daire Başkanlığı'na bağlı bir öğrenci topluluğu olarak kuruldu.
                Kuruluşumuz, Ege Üniversitesi'nin 70. kuruluş yılına ve öğrenci şehidimiz Fırat Yılmaz Çakıroğlu'nun şehadetinin 10. yılına denk gelen
                anlamlı bir tevafuktur.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Dede Korkut'un sesiyle, Yusuf Has Hacip'in öğüdüyle, Bilge Kağan'ın izinde; Türk halklarının ortak tarihi, dili, edebiyatı, kültürü ve
                toplumsal yapıları üzerine disiplinlerarası araştırmalar yürütüyor; akademik üretimi artırmayı ve genç araştırmacıları teşvik etmeyi amaçlıyoruz.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Etkinliklerimizin büyük çoğunluğunu Ege Üniversitesi Türk Dünyası Araştırmaları Enstitüsü (TDAE) ile iş birliği içinde gerçekleştiriyoruz.
                Panellerden konferanslara, söyleşilerden sergi ve kültürel programlara uzanan zengin bir takvimle Türk Dünyası'nın izini sürüyoruz.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-primary/5">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
          Değerlerimiz
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            icon={Target}
            title="Misyon"
            description="Türk Dünyası Akademik Araştırmalar Topluluğu'nun misyonu; üniversite gençliğini Türk dünyasının ortak tarih, kültür, dil ve medeniyet mirası etrafında bilinçlendirmek, düşünmeye ve üretmeye teşvik etmektir. Gençlerin akademik, entelektüel ve kültürel gelişimine katkı sağlayarak ortak Türk kimliği bilincini canlı tutmayı ve gelecek nesillere aktarmayı amaçlamaktadır."
          />
          <ValueCard
            icon={Eye}
            title="Vizyon"
            description="Vizyonumuz; Türk dünyasına dair meselelerde söz söyleyen, düşünen ve üreten bir gençlik inşa etmektir. Akademik birikimi gençliğin dinamizmiyle buluşturarak ortak Türk kimliğini çağın ihtiyaçları doğrultusunda yeniden anlamlandıran, örnek bir öğrenci topluluğu olmaktır."
          />
          <ValueCard
            icon={Heart}
            title="Kültür"
            description="Paylaşmak, dayanışma ve birlikte üretmek. Geleneksel müzik, dans, mutfak ve el sanatlarımızı yaşatırken; akademik birikimi gençliğin dinamizmiyle buluşturmak."
          />
        </div>
      </section>

      {/* Faaliyet Alanları */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
            Faaliyet Alanlarımız
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Seminer, panel, çalıştay, konferans ve sempozyumlar",
              "Akademik makale, dergi ve bülten yayımlama",
              "Türk Dünyası coğrafyasında saha araştırmaları",
              "Uzman akademisyenlerle söyleşi ve buluşmalar",
              "Geleneksel müzik, dans, mutfak ve el sanatları etkinlikleri",
              "Belgesel ve film gösterimleri",
              "Öğrencilere yönelik proje, sunum ve tematik yarışmalar",
              "Resim ve kültürel objelerin yer aldığı sergiler",
              "Türk Dünyası ülkelerinden konukların ağırlanması",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border/60 bg-card p-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkanlar */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
            Öne Çıkanlar
          </h2>
          <p className="text-muted-foreground">
            Kuruluşumuzdan bugüne ortaya koyduğumuz bazı dönüm noktaları.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <HighlightCard
            icon={Calendar}
            title="İlk etkinlik"
            description="14 Mayıs 2025'te Prof. Dr. İsmail Yakıt ile 'Türk Dünyası Bağlamında Ateizm ve Deizm' söyleşisi."
          />
          <HighlightCard
            icon={Globe2}
            title="Uluslararası konuklar"
            description="Medya panelimizin katılımcıları: Gulsum Khalilova (Tercüman Medya Genel Yayın Yönetmeni), Zafer Karatay (Kırım Tatar Millî Meclisi Türkiye Temsilcisi), Gulsum Mustafova (Kuzey Makedonya Büyükelçi Özel Kalemi), Dr. Murtaza Ali (Türkmen TV Genel Yayın Yönetmeni), Meruert Pambetova ve Agil Alesger (Yeni Çağ Medya Grubu Yönetim Kurulu Başkanı)."
          />
          <HighlightCard
            icon={Award}
            title="Kapsamlı panel"
            description="EÜ Rektörü Prof. Dr. Musa Alcı'nın katılımıyla 'Türk Dünyasında Ortak Türk Medyası' paneli."
          />
          <HighlightCard
            icon={BookOpen}
            title="Doğu Türkistan"
            description="Prof. Dr. Erkin Emet'in konuşmacı olduğu panel ile birlikte Uygur kıyafeti ve resim sergisi."
          />
        </div>
      </section>

      {/* İş birlikleri */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
            İş Birliklerimiz
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Akademik üretimimizi güçlendiren ortaklarımız.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Ege Üniversitesi Türk Dünyası Araştırmaları Enstitüsü (TDAE)",
              "Ege Üniversitesi Sağlık, Kültür ve Spor Daire Başkanlığı",
              "T.C. Gençlik ve Spor Bakanlığı",
              "ÜNİDES — Üniversite İletişim Derneği",
              "Ankara Üniversitesi",
              "Akdeniz Üniversitesi",
            ].map((p) => (
              <li
                key={p}
                className="rounded-lg border border-border/60 bg-background px-4 py-3 text-sm font-medium text-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-t border-border/50 bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-5 text-center">
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">130+</div>
              <div className="mt-2 text-sm text-muted-foreground">Aktif Üye</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">60+</div>
              <div className="mt-2 text-sm text-muted-foreground">Toplam Etkinlik</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">{pastEvents.length}+</div>
              <div className="mt-2 text-sm text-muted-foreground">Akademik Etkinlik</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">7+</div>
              <div className="mt-2 text-sm text-muted-foreground">Akademik Ortak Kurum</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">2025</div>
              <div className="mt-2 text-sm text-muted-foreground">Kuruluş Yılı</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild className="font-[var(--font-heading)]">
              <Link to="/events">
                Etkinliklerimizi Gör <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function HighlightCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <h3 className="mt-3 font-[var(--font-heading)] text-sm font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
