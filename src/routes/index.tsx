import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Türk Dünyası Akademik Araştırmalar Topluluğu" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu, üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk.",
      },
      {
        property: "og:title",
        content: "Türk Dünyası Akademik Araştırmalar Topluluğu",
      },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu, üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Lightbulb,
    title: "Öğrenme Kültürü",
    description:
      "Workshoplar, eğitimler ve peer-learning oturumlarıyla sürekli gelişim.",
  },
  {
    icon: Calendar,
    title: "Etkinlikler",
    description:
      "Sektör uzmanlarıyla buluşmalar, hackathonlar ve sosyal etkinlikler.",
  },
  {
    icon: Users,
    title: "Topluluk",
    description:
      "Benzer ilgi alanlarına sahip öğrencilerle network kur, birlikte üret.",
  },
];

const upcomingEvents = [
  {
    title: "Yapay Zeka 101: Başlangıç Eğitimi",
    date: "15 Aralık 2024",
    location: "Kampüs Amfi",
  },
  {
    title: "Kariyer Günü: Sektör Buluşması",
    date: "22 Aralık 2024",
    location: "Konferans Salonu",
  },
  {
    title: "Kış Hackathonu",
    date: "5-7 Ocak 2025",
    location: "Innovasyon Merkezi",
  },
];

const teamPreview = [
  { name: "Elif Yılmaz", role: "Başkan", initial: "EY" },
  { name: "Can Özdemir", role: "Genel Sekreter", initial: "CÖ" },
  { name: "Zeynep Kaya", role: "Etkinlik Koordinatörü", initial: "ZK" },
  { name: "Burak Şen", role: "Teknik Lider", initial: "BŞ" },
];

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Türk Dünyası Akademik Araştırmalar Topluluğu"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              Üniversite Öğrenci Topluluğu
            </div>
            <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Türk Dünyası Akademik</span>
              <span className="flex items-center gap-3">
                <span className="text-primary">Araştırmalar</span>
                <span aria-hidden="true" className="h-[1em] flex-1 bg-blue-400" />
              </span>
              <span className="block text-primary">Topluluğu</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Üniversite öğrencilerinin öğrenme, üretme ve büyüme
              yolculuğunda birlikte güçlendikleri bir topluluk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-[var(--font-heading)]">
                <Link to="/events">
                  Etkinlikleri Keşfet
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="font-[var(--font-heading)]">
                <Link to="/about">Hakkımızda</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20 hover:bg-accent/50"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="w-full border-y border-border/50 bg-accent/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Yaklaşan Etkinlikler
              </h2>
              <p className="mt-2 text-muted-foreground">Kaçırma, sen de yerini al!</p>
            </div>
            <Button variant="ghost" asChild className="hidden font-[var(--font-heading)] sm:flex">
              <Link to="/events">
                Tümünü Gör <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="flex flex-col rounded-xl border border-border/60 bg-background p-6 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Calendar className="h-3.5 w-3.5" />
                  {event.date}
                </div>
                <h3 className="mt-3 font-[var(--font-heading)] text-base font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
                <div className="mt-auto pt-4">
                  <Button variant="outline" size="sm" className="w-full font-[var(--font-heading)]">
                    Detaylar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ekibimiz
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Topluluğu büyütmek için çalışan tutkulu ekibimizle tanış.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamPreview.map((member) => (
            <Link key={member.name} to="/team" className="group text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {member.initial}
              </div>
              <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" asChild className="font-[var(--font-heading)]">
            <Link to="/team">
              Tüm Ekibi Gör <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Birlikte bir şeyler inşa edelim.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base opacity-90">
            Fikirlerin var, projeler yapmak istiyorsun ama yanında bir ekip arıyorsun.
            Topluluğumuzda yerin hazır.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary-foreground font-[var(--font-heading)] text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/contact">Bizimle İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
