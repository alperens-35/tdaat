import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/sss")({
  head: () => ({
    meta: [
      { title: "Sıkça Sorulan Sorular — TDAAT" },
      {
        name: "description",
        content:
          "TDAAT hakkında en sık sorulan sorular: üyelik, aidat, etkinliklere katılım, başvuru süreci.",
      },
      { property: "og:title", content: "Sıkça Sorulan Sorular — TDAAT" },
      { property: "og:description", content: "Üyelik, aidat ve etkinlik katılımı hakkında bilmek istediğin her şey." },
      { property: "og:url", content: "https://tdaat.lovable.app/sss" },
    ],
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/sss" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "Nasıl üye olabilirim?",
    a: "Üye Ol sayfasındaki başvuru formunu doldurman yeterli. Başvurunu inceleyip e-posta ile dönüş yapıyoruz.",
  },
  {
    q: "Aidat var mı?",
    a: "Hayır, TDAAT'a üyelik tamamen ücretsizdir. Bazı özel etkinliklerde sadece organizasyon maliyeti talep edilebilir.",
  },
  {
    q: "Sadece Ege Üniversitesi öğrencileri mi katılabilir?",
    a: "Resmi üyelik Ege Üniversitesi öğrencilerine yöneliktir, ancak etkinliklerimizin çoğu herkese açıktır.",
  },
  {
    q: "Etkinliklere üye olmadan katılabilir miyim?",
    a: "Evet. Açık etkinliklerimiz tüm öğrencilere açıktır; bazı kapalı oturumlar yalnızca üyelerimize özeldir.",
  },
  {
    q: "Hangi sıklıkla etkinlik yapıyorsunuz?",
    a: "Akademik dönem boyunca ortalama her iki haftada bir etkinlik düzenliyoruz: makale okumaları, paneller, kültürel buluşmalar ve sosyal aktiviteler.",
  },
  {
    q: "Topluluğa nasıl katkı sağlayabilirim?",
    a: "Yayın, organizasyon, sosyal medya gibi birimlerimizde aktif rol alabilir, kendi proje önerilerini getirebilirsin.",
  },
  {
    q: "Topluluğa nasıl ulaşırım?",
    a: "İletişim sayfasındaki e-posta veya Instagram hesabımız üzerinden bize her zaman ulaşabilirsin.",
  },
];

function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-left">
        Sıkça Sorulan Sorular
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Aklındaki soruların büyük çoğunluğunun cevabı burada. Bulamadıklarını iletişim sayfasından bize iletebilirsin.
      </p>

      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-[var(--font-heading)]">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
