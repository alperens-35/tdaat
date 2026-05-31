export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  country: string;
  flag: string;
  category: "politics" | "culture" | "education" | "economy" | "science";
};

export type CultureItem = {
  id: string;
  title: string;
  description: string;
  origin: string;
  flag: string;
};

export type AcademicItem = {
  id: string;
  title: string;
  institution: string;
  summary: string;
  field: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "turkic-council-summit",
    title: "Türk Devletleri Teşkilatı Zirvesi",
    summary:
      "Türk Devletleri Teşkilatı üyesi devletlerin devlet başkanları, ortak eğitim, bilim ve kültür projelerini görüşmek üzere bir araya geldi. Zirvede üniversiteler arası öğrenci değişim programlarının genişletilmesi kararlaştırıldı.",
    source: "Türk Devletleri Teşkilatı",
    date: "25 Mayıs 2026",
    country: "Kazakistan",
    flag: "🇰🇿",
    category: "education",
  },
  {
    id: "turkmen-akhmet-yasawi",
    title: "Hoca Ahmet Yesevi Yılı Kutlamaları",
    summary:
      "Türkmenistan'da Hoca Ahmet Yesevi anısına düzenlenen uluslararası bilimsel sempozyum, Türk dünyası sufî geleneği ve eğitim felsefesi üzerine önemli tartışmalara ev sahipliği yaptı.",
    source: "Türkmenistan Kültür Bakanlığı",
    date: "18 Mayıs 2026",
    country: "Türkmenistan",
    flag: "🇹🇲",
    category: "culture",
  },
  {
    id: "azerbaijan-green-energy",
    title: "Azerbaycan'ın Yeşil Enerji Hamlesi",
    summary:
      "Azerbaycan, Hazar Denizi kıyısında kurduğu rüzgar enerjisi santralleriyle bölgesel enerji işbirliğinde öncü rol oynamaya devam ediyor. Türk devletleri arasında yenilenebilir enerji ağı kurulması gündemde.",
    source: "Azerbaycan Enerji Bakanlığı",
    date: "10 Mayıs 2026",
    country: "Azerbaycan",
    flag: "🇦🇿",
    category: "economy",
  },
  {
    id: "kyrgyz-manuscript",
    title: "Kırgızistan'da Nadir El Yazması Bulundu",
    summary:
      "Kırgızistan Millî Kütüphanesi'nde, 15. yüzyıla ait Çağatayca bir tıp el yazması keşfedildi. Eser, Türk dünyası ortak bilim mirasının önemli bir parçası olarak değerlendiriliyor.",
    source: "Kırgızistan Millî Kütüphanesi",
    date: "3 Mayıs 2026",
    country: "Kırgızistan",
    flag: "🇰🇬",
    category: "science",
  },
  {
    id: "uzbek-restoration",
    title: "Özbekistan'daki Tarihi Medrese Restorasyonu Tamamlandı",
    summary:
      "Semerkant'taki bir medrese, yıllar süren restorasyon çalışmalarının ardından ziyaretçilere açıldı. Türk-İslam mimarisinin önemli örneklerinden biri olan yapı, öğrenci gruplarına ücretsiz rehberli turlar sunuyor.",
    source: "Özbekistan Turizm Bakanlığı",
    date: "28 Nisan 2026",
    country: "Özbekistan",
    flag: "🇺🇿",
    category: "culture",
  },
  {
    id: "turkey-turkic-world-festival",
    title: "İstanbul'da Türk Dünyası Kültür Festivali",
    summary:
      "İstanbul'da düzenlenen Türk Dünyası Kültür Festivali'nde altı bağımsız devletten sanatçılar ve akademisyenler bir araya geldi. Festival kapsamında konserler, söyleşiler ve el sanatları atölyeleri yer aldı.",
    source: "İstanbul Kültür ve Turizm Müdürlüğü",
    date: "15 Nisan 2026",
    country: "Türkiye",
    flag: "🇹🇷",
    category: "culture",
  },
];

export const cultureItems: CultureItem[] = [
  {
    id: "nawruz",
    title: "Nevruz Bayramı",
    description:
      "21 Mart'ta kutlanan Nevruz, Türk dünyasının en eski ve en yaygın ortak bayramlarından biridir. Doğanın uyanışını, umudu ve dayanışmayı simgeler. Her Türk devletinde farklı geleneklerle kutlanır.",
    origin: "Ortak Miras",
    flag: "🌿",
  },
  {
    id: "bozkır-kültürü",
    title: "Bozkır Kültürü",
    description:
      "Ata yurdu Orta Asya bozkırlarından süzülerek gelen yaşam tarzı, konar-göçer hayat, atçılık ve çadır geleneği. Günümüzde hala Kırgızistan, Kazakistan ve Moğolistan'da canlılığını koruyor.",
    origin: "Orta Asya",
    flag: "🐎",
  },
  {
    id: "hat-sanati",
    title: "Hat Sanatı",
    description:
      "Arap harfleriyle yazılan güzel yazı sanatı, Türk-İslam medeniyetinin zirvesi olarak kabul edilir. Osmanlı döneminde doruk noktasına ulaşan hat, cami ve medreselerde süsleme unsuru olarak kullanıldı.",
    origin: "Türkiye / Ortak",
    flag: "✒️",
  },
  {
    id: "aşıklık-geleneği",
    title: "Aşıklık Geleneği",
    description:
      "Saz eşliğinde doğaçlama şiir söyleme ve hikâye anlatma geleneği. Azerbaycan aşığı, Kazak akyını, Kırgız manasçısı ve Türk aşığı ortak köklere sahip bu geleneğin farklı dallarıdır.",
    origin: "Türk Dünyası",
    flag: "🎵",
  },
  {
    id: "carpet-weaving",
    title: "Halıcılık",
    description:
      "Özellikle Türkmenistan, Azerbaycan ve Anadolu'da gelişen halı dokuma sanatı, her bölgenin kendine özgü motifleriyle zengin bir miras sunar. 'Göçmen duvar resmi' olarak da tanımlanır.",
    origin: "Türkmenistan / Ortak",
    flag: "🧶",
  },
  {
    id: "buzkashi",
    title: "Buzkashi (Oğlak Kapma)",
    description:
      "Özellikle Afganistan, Özbekistan ve Kırgızistan'da oynanan geleneksel atlı spor. Ölü oğlağı hedefe taşıma üzerine kurulan bu oyun, Türk atlı kültürünün güçlü bir ifadesidir.",
    origin: "Orta Asya",
    flag: "🏇",
  },
];

export const academicItems: AcademicItem[] = [
  {
    id: "turkology-congress",
    title: "Uluslararası Türkoloji Kongresi",
    institution: "Ankara Üniversitesi",
    summary:
      "Her iki yılda bir düzenlenen kongre, Türk dilleri, tarihi ve etnografyası üzerine güncel araştırmaları bir araya getiriyor. Gelecek kongre 2027'de Ankara'da yapılacak.",
    field: "Dil ve Tarih",
  },
  {
    id: "central-asian-studies",
    title: "Orta Asya Araştırmaları Dergisi",
    institution: "KazNU (Kazakistan)",
    summary:
      "Kazakistan'dan yayınlanan hakemli dergi, Türk dünyası siyaset bilimi, ekonomisi ve toplumsal yapısı üzerine çalışmaları akademik çevrelere taşıyor.",
    field: "Sosyal Bilimler",
  },
  {
    id: "migrating-words",
    title: "Göçebe Sözcükler Projesi",
    institution: "TDAAT & Ortaklar",
    summary:
      "Türk lehçelerinde ortak kökenli ama farklı anlamlara evrilmiş kelimeleri belgeleyen dijital veri tabanı projesi. Öğrencilerin katkıda bulunabileceği açık bir araştırma.",
    field: "Dilbilim",
  },
];
