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
    slug: "ortak-turk-medyasi-paneli-2026",
    title: "Türk Dünyasında Ortak Türk Medyası: Sorunlar ve Çözüm Önerileri",
    date: "30 Nisan 2026",
    time: "İki oturum",
    location: "EÜ Türk Dünyası Araştırmaları Enstitüsü Konferans Salonu",
    category: "Panel",
    description:
      "Türk devletleri arasında enformasyon akışı, dezenformasyonla mücadele ve ortak yayıncılık politikalarının ele alındığı iki oturumlu panel.",
    longDescription:
      "TDAAT, TDAE ve ÜNİDES iş birliğiyle düzenlenen panelde Türk Dünyasından gazeteciler ve medya temsilcileri bir araya geldi. EÜ Rektörü Prof. Dr. Musa Alcı ve TDAE Müdürü Prof. Dr. Atıf Akgün'ün de katıldığı etkinlikte, Türk devletleri arasındaki enformasyon akışının güçlendirilmesi, küresel dezenformasyonla mücadele ve ortak yayıncılık politikalarının geliştirilmesi tartışıldı. Azerbaycanlı gazeteci Agil Alesger de panelistler arasındaydı. Her iki oturum YouTube kanalımızda yayımlandı.",
    startDate: "2026-04-30T14:00:00+03:00",
    endDate: "2026-04-30T17:30:00+03:00",
  },
  {
    slug: "dogu-turkistan-paneli-2026",
    title: "Doğu Türkistan'da Asimilasyon ve Soykırım — Panel ve Sergi",
    date: "16 Nisan 2026",
    time: "Tüm gün",
    location: "EÜ Türk Dünyası Araştırmaları Enstitüsü Konferans Salonu",
    category: "Panel",
    description:
      "Çin'in Doğu Türkistan'daki asimilasyon politikalarını ele alan panel; eşliğinde resim ve geleneksel Uygur kıyafeti sergisi.",
    longDescription:
      "Prof. Dr. Alimcan İnayet'in moderatörlüğünde düzenlenen panelde Prof. Dr. Erkin Emet (Ankara Üniversitesi / Dünya Uygur Kurultayı sözcüsü), araştırmacı-yazar Hamit Göktürk ve eğitimci-yazar Gazi Karabulut konuşmacı olarak yer aldı. Etkinlik kapsamında Uygur Türklerine yönelik uygulamaları konu alan bir resim sergisi ile geleneksel Uygur kıyafetlerinden oluşan bir sergi de açıldı. Farklı fakültelerden dekanlar etkinliğe katıldı; Prof. Dr. Erkin Emet topluluğa kitap bağışında bulundu.",
    startDate: "2026-04-16T14:00:00+03:00",
    endDate: "2026-04-16T17:00:00+03:00",
  },
  {
    slug: "suriye-turkleri-paneli-2026",
    title:
      "Türkiye'nin Güneyinde Güncel Gelişmeler ve Suriye Türklerinin Durumu",
    date: "9 Mart 2026",
    time: "—",
    location: "Ege Üniversitesi Kültür Sanat Evi",
    category: "Panel",
    description:
      "Suriye'deki son gelişmeler, güney sınırının geleceği ve Suriye Türkmenlerinin önemi üzerine jeopolitik odaklı panel.",
    longDescription:
      "TDAE Müdürü Prof. Dr. Atıf Akgün'ün moderatörlüğündeki panelde, Yıldız Teknik Üniversitesi'nden Prof. Dr. Mehmet Akif Okur ve Suriyeli Türkmen Dernekler Federasyonu Başkanı / Halep Milletvekili Dr. Tarık Sülo Cevizci konuşmacı olarak yer aldı. Türkiye'nin güney sınırındaki güvenlik durumu ele alındı ve Türkmenlerin Suriye'nin yeniden yapılanmasında kurucu unsur olarak tanınması gerektiği vurgulandı.",
    startDate: "2026-03-09T14:00:00+03:00",
    endDate: "2026-03-09T16:30:00+03:00",
  },
  {
    slug: "ortak-kimlik-paneli-2025",
    title: "Türk Dünyası ve Ortak Kimliğinin İnşası",
    date: "23 Aralık 2025",
    time: "—",
    location: "EÜ Prof. Dr. Nuri Bilgin Konferans Salonu",
    category: "Panel",
    description:
      "Kültür, dil, din ve tarih oturumlarıyla Türk Dünyasının ortak kimliğini ele alan kapsamlı panel.",
    longDescription:
      "Topluluğun en kapsamlı etkinliklerinden biri olarak gerçekleşen panelin Kültür oturumunu Doç. Dr. Fazıl Özdamar modere etti; Prof. Dr. Metin Ekici (EÜ TDAE), Prof. Dr. Mustafa Aksoy (Munzur Üniversitesi) ve Prof. Dr. Saadettin Yağmur Gömeç (Ankara Üniversitesi) konuşmacı olarak yer aldı. Açılış ve kapanış konuşmalarını EÜ Rektör Yardımcısı Prof. Dr. Mehmet Ersan yaptı. Prof. Dr. Ekici Nevruz, Hıdırellez ve Dede Korkut anlatılarının birleştirici rolüne dikkat çekerken; Prof. Dr. Gömeç kimliğin töre ve millî ruhla ayakta durduğunu vurguladı.",
    startDate: "2025-12-23T14:00:00+03:00",
    endDate: "2025-12-23T17:30:00+03:00",
  },
  {
    slug: "feto-konferansi-2025",
    title:
      "FETÖ'nün Türkiye'nin Türk Dünyasıyla İlişkilerine Verdiği Hasar",
    date: "21 Kasım 2025",
    time: "—",
    location: "EÜ Türk Dünyası Araştırmaları Enstitüsü Konferans Salonu",
    category: "Konferans",
    description:
      "Prof. Dr. İbrahim Maraş'ın konuşmacı olduğu, FETÖ'nün Türk Dünyası ilişkilerine etkilerini ele alan konferans.",
    longDescription:
      "TDAAT ve TDAE iş birliğiyle düzenlenen konferansa Ankara Üniversitesi İlahiyat Fakültesi'nden Prof. Dr. İbrahim Maraş konuşmacı olarak katıldı. Açılışı TDAE Müdürü Prof. Dr. Abdullah Temizkan yaptı. İstiklal Marşı ve saygı duruşuyla başlayan programda, Türkiye'nin Orta Asya ve Türk coğrafyasıyla kurduğu derin ilişkilerin nasıl sekteye uğratıldığı akademik düzeyde tartışıldı.",
    startDate: "2025-11-21T14:00:00+03:00",
    endDate: "2025-11-21T16:00:00+03:00",
  },
  {
    slug: "ateizm-deizm-soylesisi-2025",
    title: "Türk Dünyası Bağlamında Ateizm ve Deizm",
    date: "14 Mayıs 2025",
    time: "—",
    location: "EÜ Edebiyat Fakültesi Ahmet Arslan Konferans Salonu",
    category: "Söyleşi",
    description:
      "Topluluğun ilk resmî etkinliği: Prof. Dr. İsmail Yakıt ile ateizm ve deizm kavramları üzerine söyleşi.",
    longDescription:
      "TDAAT'ın ilk resmî etkinliği olarak tarihe geçen söyleşide Akdeniz Üniversitesi öğretim üyesi Prof. Dr. İsmail Yakıt; ateizm ve deizm kavramlarını tarihsel kökleri, felsefi yansımaları ve dilsel karşılıkları bağlamında ele aldı. Türkçede ateizmin tam karşılığının bulunmadığını; Arapça \"ilhad\", Osmanlıca \"zındık\" ve İslam literatüründe \"dehrî/mülhid\" gibi terimlerle ifade edildiğini açıkladı. Etkinlik, EÜ İlahiyat Fakültesi Dekanı Prof. Dr. Hanefi Palabıyık'ın da katılımıyla sona erdi; konuşmacıya Yesevi Mührü takdim edildi.",
    startDate: "2025-05-14T14:00:00+03:00",
    endDate: "2025-05-14T16:00:00+03:00",
  },
];

export function findEvent(slug: string): EventItem | undefined {
  return [...upcomingEvents, ...pastEvents].find((e) => e.slug === slug);
}
