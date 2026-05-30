import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/team" }],
    meta: [
      { title: "Ekibimiz — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yönetim kurulu ve lider ekibiyle tanışın.",
      },
      {
        property: "og:title",
        content: "Ekibimiz — TDAAT",
      },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'nun yönetim kurulu ve lider ekibiyle tanışın.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/team" },
    ],
  }),
  component: TeamPage,
});

const team = [
  {
    name: "Muharrem Turgut",
    role: "Başkan",
    bio: "4. sınıf bilgisayar mühendisliği öğrencisi. Yapay zeka ve topluluk yönetimi tutkunu.",
    color: "bg-rose-100 text-rose-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Abdurrahman Gülle",
    role: "Başkan Yardımcısı",
    bio: "3. sınıf endüstri mühendisliği. Operasyon ve organizasyon uzmanı.",
    color: "bg-blue-100 text-blue-700",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Alparslan Cengiz",
    role: "Etkinlik Koordinatörü",
    bio: "3. sınıf işletme. Sosyal etkinlikler ve network organizasyonları.",
    color: "bg-amber-100 text-amber-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Ömer Faruk İyigören",
    role: "Organizasyon Birimi",
    bio: "2. sınıf işletme. Organizasyon ve operasyon yönetimi.",
    color: "bg-violet-100 text-violet-700",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Şevval Sağcan",
    role: "Sosyal Medya",
    bio: "3. sınıf halkla ilişkiler ve tanıtım. Sosyal medya yönetimi ve içerik üretimi.",
    color: "bg-pink-100 text-pink-700",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    name: "Dilek Bozkurt",
    role: "Sponsorluk",
    bio: "3. sınıf işletme. Sponsorluk görüşmeleri ve kurumsal ilişkiler.",
    color: "bg-orange-100 text-orange-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Meltem Turcan",
    role: "Akademi Birimi",
    bio: "3. sınıf halkla ilişkiler ve tanıtım. Akademik program ve içerik yönetimi.",
    color: "bg-teal-100 text-teal-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Firdevs Tekke",
    role: "Sanat Birimi",
    bio: "2. sınıf rehberlik ve psikolojik danışmanlık. Kültürel etkinlikler ve sanatsal faaliyetler.",
    color: "bg-fuchsia-100 text-fuchsia-700",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Yusuf Alperen Kılınçdoğan",
    role: "Satın Alma",
    bio: "Satın alma operasyonları ve tedarik zinciri yönetimi.",
    color: "bg-indigo-100 text-indigo-700",
    social: { linkedin: "#", twitter: "#" },
  },
];

function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ekibimiz
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Topluluğu büyütmek için çalışan, tutkulu ve çeşitli bir ekiple tanış.
            Her biri farklı bir alanda yetkin, birlikte daha güçlüyüz.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col rounded-xl border border-border/60 bg-background p-6 text-center transition-all hover:shadow-md"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${member.color} text-xl font-bold`}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h2 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-foreground">
                  {member.name}
                </h2>
                <p className="text-xs font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
                <div className="mt-auto flex items-center justify-center gap-2 pt-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      aria-label="GitHub"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Sen de aramıza katıl!
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Gönüllü olarak ekibe dahil olmak, farklı bir rolda yer almak
          veya topluluğa katkı sağlamak istiyorsan bize ulaş.
        </p>
      </section>
    </div>
  );
}
