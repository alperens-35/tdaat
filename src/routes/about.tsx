import { createFileRoute } from "@tanstack/react-router";
import { Target, Heart, Eye, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Hakkımızda — lovelabdan" },
      {
        name: "description",
        content:
          "lovelabdan hakkında: Misyonumuz, vizyonumuz ve topluluğumuzun hikayesi.",
      },
      {
        property: "og:title",
        content: "Hakkımızda — lovelabdan",
      },
      {
        property: "og:description",
        content:
          "lovelabdan hakkında: Misyonumuz, vizyonumuz ve topluluğumuzun hikayesi.",
      },
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
            lovelabdan, 2023 yılında bir grup üniversite öğrencisi tarafından kurulan,
            öğrencilerin bir araya gelerek öğrendiklerini paylaştığı, birlikte projeler
            ürettiği ve kariyerlerine değer katan bir topluluktur.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
                Hikayemiz
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Üniversitede geçen sıradan bir günde, ders arasında bir grup arkadaş
                “neden öğrenciler olarak kendi başımıza bir şeyler yapamıyoruz?”
                diye sormaya başladı. Bu soru, lovelabdan'ın ilk tohumu oldu.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Kısa sürede küçük workshoplar, ardından ilk hackathonumuz ve şimdi
                ise her hafta düzenlenen etkinliklerle büyüyen bir topluluğa
                dönüştük. Amacımız net: öğrencilerin bir arada daha güçlü oldukları
                bir ortam yaratmak.
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
            description="Üniversite öğrencilerine öğrenme, üretme ve network kurma fırsatı sunarak onları geleceğe hazırlamak."
          />
          <ValueCard
            icon={Eye}
            title="Vizyon"
            description="Üniversiteden mezun olmadan sektör deneyimi kazanmış, projeler üretmiş öğrenciler yetiştirmek."
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
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">200+</div>
              <div className="mt-2 text-sm text-muted-foreground">Aktif Üye</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">50+</div>
              <div className="mt-2 text-sm text-muted-foreground">Düzenlenen Etkinlik</div>
            </div>
            <div>
              <div className="font-[var(--font-heading)] text-4xl font-bold text-primary">30+</div>
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
