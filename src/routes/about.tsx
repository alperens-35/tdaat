import { createFileRoute } from "@tanstack/react-router";
import { Target, Heart, Eye, BookOpen } from "lucide-react";

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
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
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
                Hakkımızda
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Ege Üniversitesi Türk Dünyası Akademik Araştırmalar Topluluğu (TDAAT) 2025 yılında üniversitemiz bünyesinde kurulmuştur.
                Dede Korkut'un sesiyle, Yusuf Has Hacip'in öğüdüyle, Bilge Kağan'ın izinde; kültürümüzü tanımak, yaşatmak ve paylaşmak için bir aradayız.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Panellerden sempozyumlara, kültürel gezilerden yayın çalışmalarına kadar birçok faaliyette Türk Dünyası'nın izini sürüyoruz.
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
            description="Türk Dünyası Akademik Araştırmalar Topluluğu’nun misyonu; üniversite gençliğini Türk dünyasının ortak tarih, kültür, dil ve medeniyet mirası etrafında bilinçlendirmek, düşünmeye ve üretmeye teşvik etmektir. Gençlerin akademik, entelektüel ve kültürel gelişimine katkı sağlayarak ortak Türk kimliği bilincini canlı tutmayı ve gelecek nesillere aktarmayı amaçlamaktadır."
          />
          <ValueCard
            icon={Eye}
            title="Vizyon"
            description="Vizyonumuz; Türk dünyasına dair meselelerde söz söyleyen, düşünen ve üreten bir gençlik inşa etmektir. Akademik birikimi gençliğin dinamizmiyle buluşturarak ortak Türk kimliğini çağın ihtiyaçları doğrultusunda yeniden anlamlandıran, örnek bir öğrenci topluluğu olmaktır."
          />
          <ValueCard
            icon={Heart}
            title="Kültür"
            description="Paylaşmak, dayanışma ve açık kaynak felsefesiyle birlikte büyümek."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-t border-border/50 bg-accent/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">130+</div>
              <div className="mt-2 text-sm text-muted-foreground">Aktif Üye</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">60+</div>
              <div className="mt-2 text-sm text-muted-foreground">Düzenlenen Etkinlik</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">2</div>
              <div className="mt-2 text-sm text-muted-foreground">Tamamlanan Proje</div>
            </div>
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
