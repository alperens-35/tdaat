import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/turk-dunyasi")({
  component: TurkDunyasiPage,
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/turk-dunyasi" }],
    meta: [
      { title: "Türk Dünyası — TDAAT" },
      { name: "description", content: "Bağımsız Türk Devletleri'nin şiveleri, ortak kelimeler ve kültürel bağlar." },
      { property: "og:title", content: "Türk Dünyası — TDAAT" },
      { property: "og:description", content: "Bağımsız Türk Devletleri'nin şiveleri, ortak kelimeler ve kültürel bağlar." },
      { property: "og:url", content: "https://tdaat.lovable.app/turk-dunyasi" },
    ],
  }),
});

type Dialect = {
  flag: string;
  country: string;
  language: string;
  family: string;
  speakers: string;
  script: string;
  greeting: { native: string; latin?: string; tr: string };
  phrases: { tr: string; native: string; latin?: string }[];
  note: string;
};

const DIALECTS: Dialect[] = [
  {
    flag: "🇹🇷",
    country: "Türkiye",
    language: "Türkçe (Türkiye Türkçesi)",
    family: "Oğuz",
    speakers: "~85 milyon",
    script: "Latin",
    greeting: { native: "Merhaba", tr: "Merhaba" },
    phrases: [
      { tr: "Nasılsın?", native: "Nasılsın?" },
      { tr: "Teşekkür ederim", native: "Teşekkür ederim" },
      { tr: "Kardeşim", native: "Kardeşim" },
      { tr: "Hoş geldin", native: "Hoş geldin" },
    ],
    note: "Oğuz grubunun batı kolu; Anadolu ve Balkanlar'da konuşulur.",
  },
  {
    flag: "🇦🇿",
    country: "Azerbaycan",
    language: "Azərbaycan dili",
    family: "Oğuz",
    speakers: "~30 milyon",
    script: "Latin",
    greeting: { native: "Salam", tr: "Selam" },
    phrases: [
      { tr: "Nasılsın?", native: "Necəsən?" },
      { tr: "Teşekkür ederim", native: "Çox sağ ol" },
      { tr: "Kardeşim", native: "Qardaşım" },
      { tr: "Hoş geldin", native: "Xoş gəlmisən" },
    ],
    note: "Türkiye Türkçesine en yakın şive; \"Bir millet, iki devlet\".",
  },
  {
    flag: "🇰🇿",
    country: "Kazakistan",
    language: "Қазақ тілі / Qazaq tili",
    family: "Kıpçak",
    speakers: "~14 milyon",
    script: "Kiril → Latin (geçiş)",
    greeting: { native: "Сәлеметсіз бе", latin: "Sälemetsiz be", tr: "Selamünaleyküm" },
    phrases: [
      { tr: "Nasılsın?", native: "Қалыңыз қалай?", latin: "Qalıñız qalay?" },
      { tr: "Teşekkür ederim", native: "Рақмет", latin: "Raqmet" },
      { tr: "Kardeşim", native: "Бауырым", latin: "Bawırım" },
      { tr: "Hoş geldin", native: "Қош келдіңіз", latin: "Qoş keldiñiz" },
    ],
    note: "Kıpçak grubunun en büyük temsilcisi; bozkır kültürünün dili.",
  },
  {
    flag: "🇰🇬",
    country: "Kırgızistan",
    language: "Кыргыз тили / Kyrgyz tili",
    family: "Kıpçak",
    speakers: "~5 milyon",
    script: "Kiril",
    greeting: { native: "Салам алейкум", latin: "Salam aleykum", tr: "Selamünaleyküm" },
    phrases: [
      { tr: "Nasılsın?", native: "Кандайсың?", latin: "Kandaysıñ?" },
      { tr: "Teşekkür ederim", native: "Рахмат", latin: "Rahmat" },
      { tr: "Kardeşim", native: "Бир тууганым", latin: "Bir tuuganım" },
      { tr: "Hoş geldin", native: "Кош келиңиз", latin: "Koş keliñiz" },
    ],
    note: "Manas Destanı'nın dili; Kıpçak grubunda yer alır.",
  },
  {
    flag: "🇺🇿",
    country: "Özbekistan",
    language: "Oʻzbek tili",
    family: "Karluk",
    speakers: "~35 milyon",
    script: "Latin",
    greeting: { native: "Assalomu alaykum", tr: "Selamünaleyküm" },
    phrases: [
      { tr: "Nasılsın?", native: "Qalaysiz?" },
      { tr: "Teşekkür ederim", native: "Rahmat" },
      { tr: "Kardeşim", native: "Birodarim" },
      { tr: "Hoş geldin", native: "Xush kelibsiz" },
    ],
    note: "Karluk grubunun temsilcisi; Çağatay Türkçesi'nin mirasçısı.",
  },
  {
    flag: "🇹🇲",
    country: "Türkmenistan",
    language: "Türkmen dili",
    family: "Oğuz",
    speakers: "~7 milyon",
    script: "Latin",
    greeting: { native: "Salam", tr: "Selam" },
    phrases: [
      { tr: "Nasılsın?", native: "Niçik?" },
      { tr: "Teşekkür ederim", native: "Sag boluň" },
      { tr: "Kardeşim", native: "Doganym" },
      { tr: "Hoş geldin", native: "Hoş geldiňiz" },
    ],
    note: "Oğuz grubunun doğu kolu; Türkiye Türkçesine yakın.",
  },
  {
    flag: "🇨🇾",
    country: "KKTC",
    language: "Kıbrıs Türkçesi",
    family: "Oğuz",
    speakers: "~300 bin",
    script: "Latin",
    greeting: { native: "Merhaba", tr: "Merhaba" },
    phrases: [
      { tr: "Nasılsın?", native: "Nasılsın be?" },
      { tr: "Teşekkür ederim", native: "Sağol" },
      { tr: "Kardeşim", native: "Gardaşım" },
      { tr: "Hoş geldin", native: "Hoş geldin" },
    ],
    note: "Türkiye Türkçesi'nin Kıbrıs ağzı; gözlemci üye.",
  },
];

function TurkDunyasiPage() {
  const [active, setActive] = useState<string>(DIALECTS[0].country);
  const current = DIALECTS.find((d) => d.country === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Türk Dünyası
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Bağımsız Türk Devletleri'nin şiveleri, ortak kelimeleri ve bizi birbirimize bağlayan kültürel mirası keşfedin.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground">Şiveler</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {DIALECTS.map((d) => (
            <button
              key={d.country}
              onClick={() => setActive(d.country)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                active === d.country
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              <span className="text-base">{d.flag}</span>
              {d.country}
            </button>
          ))}
        </div>

        <article className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <header className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl">{current.flag}</span>
            <h3 className="text-2xl font-semibold text-foreground">{current.language}</h3>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {current.family} grubu
            </span>
          </header>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Konuşan</dt>
              <dd className="mt-1 font-medium text-foreground">{current.speakers}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Alfabe</dt>
              <dd className="mt-1 font-medium text-foreground">{current.script}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Selam</dt>
              <dd className="mt-1 font-medium text-foreground">
                {current.greeting.native}
                {current.greeting.latin && (
                  <span className="ml-1 text-muted-foreground">({current.greeting.latin})</span>
                )}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm text-muted-foreground">{current.note}</p>

          <div className="mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Ortak ifadeler
            </h4>
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2">Türkçe</th>
                    <th className="px-4 py-2">{current.country}</th>
                  </tr>
                </thead>
                <tbody>
                  {current.phrases.map((p) => (
                    <tr key={p.tr} className="border-t border-border">
                      <td className="px-4 py-3 text-muted-foreground">{p.tr}</td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {p.native}
                        {p.latin && <span className="ml-1 text-muted-foreground">({p.latin})</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
