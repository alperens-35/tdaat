import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query"; // Importu unutma
import { supabase } from "@/integrations/supabase/client"; // Importu unutma

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
      { rel: "canonical", href: "https://tdaat.lovable.app/" },
    ],
    meta: [
      { title: "TDAAT — Ege Üniversitesi Türk Dünyası Topluluğu" },
      {
        name: "description",
        content:
          "Ege Üniversitesi TDAAT: etkinlikler, makale okumaları, Türk sporları ve kültürel buluşmalarla öğren, üret ve birlikte büyü.",
      },
      {
        property: "og:title",
        content: "TDAAT — Ege Üniversitesi Türk Dünyası Topluluğu",
      },
      {
        property: "og:description",
        content:
          "Ege Üniversitesi TDAAT: etkinlikler, makale okumaları, Türk sporları ve kültürel buluşmalarla öğren, üret ve birlikte büyü.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Türk Dünyası Akademik Araştırmalar Topluluğu",
          alternateName: "TDAAT",
          url: "https://tdaat.lovable.app/",
          logo: "https://tdaat.lovable.app/favicon.ico",
          description:
            "Ege Üniversitesi öğrenci topluluğu. Türk dünyasının kültür, tarih ve akademik araştırmalarına odaklanır.",
          parentOrganization: {
            "@type": "CollegeOrUniversity",
            name: "Ege Üniversitesi",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const teamPreview = [
  { name: "Muharrem Turgut", role: "Başkan", initial: "MT" },
  { name: "Abdurrahman Gülle", role: "Başkan Yardımcısı", initial: "AG" },
  { name: "Alparslan Cengiz", role: "Etkinlik Koordinatörü", initial: "AC" },
  { name: "Ömer Faruk İyigören", role: "Organizasyon Birimi", initial: "ÖFİ" },
];

function Index() {
  const { t } = useI18n();

  // Veritabanından etkinlikleri çek
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ["homepage-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_upcoming", true)
        .order("start_date", { ascending: true })
        .limit(3);
      if (error) throw error;
      return data ?? [];
    },
  });

  const features = [
    { icon: Lightbulb, title: t("home.feat1.title"), description: t("home.feat1.desc") },
    { icon: Calendar, title: t("home.feat2.title"), description: t("home.feat2.desc") },
    { icon: Users, title: t("home.feat3.title"), description: t("home.feat3.desc") },
  ];

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
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              {t("home.badge")}
            </div>
            <h1 className="mt-6 font-[var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">{t("home.title1")}</span>
              <span className="block text-primary">{t("home.title2")}</span>
              <span className="block text-primary">{t("home.title3")}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t("home.lede")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-[var(--font-heading)]">
                <Link to="/events">
                  {t("home.ctaEvents")}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="font-[var(--font-heading)]">
                <Link to="/about">{t("home.ctaAbout")}</Link>
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
              <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                {f.title}
              </h2>
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
                {t("home.upcoming")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("home.upcomingSub")}</p>
            </div>
            <Button variant="ghost" asChild className="hidden font-[var(--font-heading)] sm:flex">
              <Link to="/events">
                {t("home.seeAll")} <ArrowRight className="ml-1.5 h-4 w-4" />
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
                  <Button variant="outline" size="sm" asChild className="w-full font-[var(--font-heading)]">
                    <Link to="/events/$slug" params={{ slug: event.slug }}>
                      {t("home.details")}
                    </Link>
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
            {t("home.team")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            {t("home.teamSub")}
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
              {t("home.seeTeam")} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base opacity-90">
            {t("home.ctaDesc")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary-foreground font-[var(--font-heading)] text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/contact">{t("home.ctaContact")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
