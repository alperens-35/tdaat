export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  longDescription: string;
  startDate: string;
  endDate: string;
};

export const upcomingEvents: EventItem[] = [
  {
    slug: "turan-toyu-2026",
    title: "Tanışma Etkinliği: Turan Toyu",
    date: "27 Eylül 2026",
    time: "13:00 - 15:30",
    location: "İnciraltı Kent Ormanı",
    category: "Eğlence",
    description:
      "Yeni dönemin açılış buluşması: ikram, tanışma oyunları ve sohbet eşliğinde topluluğa kaynaşma günü.",
    longDescription:
      "Turan Toyu, dönem boyunca birlikte yol yürüyeceğimiz arkadaşlarla tanışacağımız samimi bir açılış buluşmasıdır. Geleneksel ikramlar, kısa oyunlar ve sohbet eşliğinde Türk dünyasının ortak kültürünü hatırlatan bir program planlıyoruz. Yeni üyeler için ideal başlangıç noktasıdır; ön kayıt gerekmez, herkes davetlidir.",
    startDate: "2026-09-27T13:00:00+03:00",
    endDate: "2026-09-27T15:30:00+03:00",
  },
  {
    slug: "makale-okumasi-ekim-2026",
    title: "Makale Okuması",
    date: "2 Ekim 2026",
    time: "16:00 - 17:30",
    location: "Eğitim+Spor Kafe",
    category: "Eğitim",
    description:
      "Önceden paylaşılan akademik bir makaleyi birlikte okuyup tartışıyoruz.",
    longDescription:
      "Her ay düzenli olarak yaptığımız makale okumalarının ilk oturumu. Türk dünyası üzerine güncel bir akademik metni önceden paylaşıyor, birlikte okuyup tartışıyoruz. Tartışmayı modere edecek bir kolaylaştırıcımız oluyor; akademik geçmişi olmayan üyelerimiz için de erişilebilir bir formattır.",
    startDate: "2026-10-02T16:00:00+03:00",
    endDate: "2026-10-02T17:30:00+03:00",
  },
  {
    slug: "mangala-turnuvasi-2026",
    title: "3. Geleneksel Mangala Turnuvası",
    date: "21 Ekim 2026",
    time: "13:30 - 15:00",
    location: "Kış Bahçesi Kafe",
    category: "Yarışma",
    description:
      "Türk dünyasının köklü zekâ oyunu Mangala üzerine eleme usulü turnuvamız.",
    longDescription:
      "Topluluğumuzun bu yıl üçüncüsünü düzenlediği geleneksel turnuva. Eleme usulü oynanır, kazananlara hediyemiz olacak. Mangala bilmeyenler için turnuva öncesi kısa bir tanıtım turu yapılır. Katılım ücretsizdir, sadece sınırlı kontenjan vardır; etkinlik günü erken gelmenizi öneririz.",
    startDate: "2026-10-21T13:30:00+03:00",
    endDate: "2026-10-21T15:00:00+03:00",
  },
];

export const pastEvents: EventItem[] = [
  {
    slug: "web-bootcamp-2024",
    title: "Web Geliştirme Bootcamp",
    date: "Kasım 2024",
    time: "Hafta sonu",
    location: "Ege Üniversitesi",
    category: "Eğitim",
    description: "HTML'den React'a modern web geliştirme yolculuğu.",
    longDescription:
      "İki hafta sonuna yayılan yoğun bir bootcamp programı. Temel HTML/CSS'ten başlayıp JavaScript ve React'a kadar uzanan, uygulama ağırlıklı bir içerikti.",
    startDate: "2024-11-09T10:00:00+03:00",
    endDate: "2024-11-10T17:00:00+03:00",
  },
  {
    slug: "girisimcilik-sohbetleri-2024",
    title: "Girişimcilik Sohbetleri",
    date: "Ekim 2024",
    time: "Akşam",
    location: "Ege Üniversitesi",
    category: "Söyleşi",
    description: "Yerel girişimcilerle samimi sohbetler.",
    longDescription:
      "İzmir'den ve Türk dünyasından girişimci konuklarımızla, kuruluş hikâyelerinden gelir modellerine kadar açık uçlu bir sohbet gecesiydi.",
    startDate: "2024-10-15T18:00:00+03:00",
    endDate: "2024-10-15T20:00:00+03:00",
  },
  {
    slug: "figma-workshop-2024",
    title: "Figma Tasarım Workshopu",
    date: "Eylül 2024",
    time: "Öğleden sonra",
    location: "Ege Üniversitesi",
    category: "Workshop",
    description: "UI/UX temelleri ve Figma pratiği.",
    longDescription:
      "Figma'yı hiç kullanmamış üyeler için sıfırdan başlayan, küçük bir arayüz prototipi ile biten uygulamalı bir atölye çalışmasıydı.",
    startDate: "2024-09-21T14:00:00+03:00",
    endDate: "2024-09-21T17:00:00+03:00",
  },
];

export function findEvent(slug: string): EventItem | undefined {
  return [...upcomingEvents, ...pastEvents].find((e) => e.slug === slug);
}
