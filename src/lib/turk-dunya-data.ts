export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string[];
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
      "Türk Devletleri Teşkilatı üyesi devletlerin devlet başkanları, ortak eğitim, bilim ve kültür projelerini görüşmek üzere bir araya geldi.",
    content: [
      "Türk Devletleri Teşkilatı (TDT) üyesi devletlerin devlet başkanları, Astana'da düzenlenen zirvede ortak eğitim, bilim ve kültür projelerini ele almak üzere bir araya geldi. Zirveye Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan ve gözlemci üye Türkmenistan'ın temsilcileri katıldı.",
      "Zirvenin en önemli sonuçlarından biri, üye ülkeler arasında üniversiteler arası öğrenci değişim programlarının önümüzdeki üç yıl içinde iki katına çıkarılması kararı oldu. Program kapsamında her yıl en az 5.000 öğrencinin Türk dünyasındaki farklı üniversitelerde bir veya iki dönem eğitim alması hedefleniyor.",
      "Ayrıca ortak bir dijital kütüphane platformu kurulması, Türk lehçeleri arasında otomatik çeviri sağlayan bir yapay zekâ projesinin başlatılması ve bilim insanları için ortak araştırma fonlarının oluşturulması da gündeme alındı.",
      "Zirvenin kapanış bildirgesinde, gençlik buluşmalarının her yıl farklı bir başkentte düzenlenmesi ve 2027 yılının 'Türk Dünyası Gençlik Yılı' ilan edilmesi kararlaştırıldı.",
    ],
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
      "Türkmenistan'da Hoca Ahmet Yesevi anısına düzenlenen uluslararası bilimsel sempozyum, Türk dünyası sufî geleneği üzerine önemli tartışmalara ev sahipliği yaptı.",
    content: [
      "Türkmenistan'ın başkenti Aşkabat'ta düzenlenen 'Hoca Ahmet Yesevi ve Türk Dünyası' uluslararası sempozyumu, 12 ülkeden 200'ü aşkın akademisyeni bir araya getirdi. Sempozyum, Pir-i Türkistan olarak da bilinen Yesevi'nin düşüncelerinin günümüz eğitim felsefesine etkilerini ele aldı.",
      "Üç gün süren etkinlik boyunca tasavvuf geleneği, hikmet edebiyatı, ahlâk eğitimi ve Türk dünyasında ortak değerlerin inşası gibi başlıklar tartışıldı. Türkiye'den katılan öğretim üyeleri, Yesevi'nin 'Divan-ı Hikmet' eserinin günümüz Türk lehçelerine yapılan yeni çevirilerini tanıttı.",
      "Sempozyum sonunda yayımlanan bildirgede, Yesevi düşüncesinin ortaokul ve lise müfredatlarına seçmeli ders olarak girmesi ve Türk dünyasında ortak bir 'Yesevi Akademisi'nin kurulması önerildi.",
    ],
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
      "Azerbaycan, Hazar Denizi kıyısında kurduğu rüzgar enerjisi santralleriyle bölgesel enerji işbirliğinde öncü rol oynamaya devam ediyor.",
    content: [
      "Azerbaycan, Hazar Denizi kıyısında devreye aldığı yeni rüzgar enerjisi santralleriyle yenilenebilir enerji üretimini son bir yılda %40 artırdı. Hükümet, 2030 yılına kadar üretilen elektriğin yarısının yenilenebilir kaynaklardan sağlanmasını hedefliyor.",
      "Projenin en dikkat çekici yönü, üretilen fazla enerjinin Türkiye ve Gürcistan üzerinden Avrupa'ya, doğuya doğru ise Orta Asya Türk cumhuriyetlerine iletilmesi planı. Bu kapsamda Hazar geçişli bir denizaltı elektrik kablosu projesi için fizibilite çalışmaları başlatıldı.",
      "Türk Devletleri Teşkilatı çatısı altında oluşturulması planlanan 'Türk Enerji Koridoru', özellikle Özbekistan ve Kırgızistan gibi enerji talebi hızla artan ülkeler için kritik önemde değerlendiriliyor.",
      "Azerbaycan ayrıca yeşil hidrojen üretimi konusunda Türk üniversiteleriyle ortak araştırma anlaşmaları imzaladı.",
    ],
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
      "Kırgızistan Millî Kütüphanesi'nde, 15. yüzyıla ait Çağatayca bir tıp el yazması keşfedildi.",
    content: [
      "Kırgızistan Millî Kütüphanesi'nin arşivlerinde yürütülen tasnif çalışmaları sırasında, 15. yüzyıla tarihlenen Çağatayca bir tıp el yazması keşfedildi. 240 sayfalık eser, dönemin bitki temelli tedavi yöntemlerini ve cerrahi uygulamalarını ayrıntılı biçimde anlatıyor.",
      "Eserin müellifi henüz kesin olarak tespit edilebilmiş değil; ancak yazı üslubu ve kullanılan terminoloji, müellifin Timurlular döneminde Semerkant veya Buhara'da yetişmiş bir hekim olduğuna işaret ediyor.",
      "Türkiye, Kazakistan ve Özbekistan'dan akademisyenlerin de katıldığı uluslararası bir komisyon, eserin dijitalleştirilmesi ve modern Türk lehçelerine çevirisi için çalışma başlattı. Eser, önümüzdeki yıl Bişkek'te düzenlenecek özel bir sergide kamuoyuyla paylaşılacak.",
      "Bu keşif, Türk dünyası ortak bilim mirasının ne kadar geniş ve hâlâ keşfedilmeyi bekleyen zenginlikte olduğunu bir kez daha gösterdi.",
    ],
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
      "Semerkant'taki bir medrese, yıllar süren restorasyon çalışmalarının ardından ziyaretçilere açıldı.",
    content: [
      "Semerkant'ın Registan Meydanı'na yakın bir konumda yer alan ve 17. yüzyıldan kalma tarihi medrese, yedi yıl süren titiz restorasyon çalışmalarının ardından ziyaretçilere açıldı. Çalışmalar süresince yapının özgün çini desenleri, ahşap işçilikleri ve kaligrafi panoları aslına uygun şekilde yenilendi.",
      "Restorasyon projesinde Türkiye, Özbekistan ve Azerbaycan'dan uzmanlar ortak çalıştı. UNESCO Dünya Mirası kapsamında değerlendirilen yapı, Türk-İslam mimarisinin önemli örneklerinden biri olarak kabul ediliyor.",
      "Medrese, sadece bir müze olarak değil, aynı zamanda Türk dünyasından gelen öğrencilere ev sahipliği yapacak bir kültür merkezi olarak da işlev görecek. Açılış programı çerçevesinde öğrenci gruplarına ücretsiz rehberli turlar düzenleniyor.",
      "Yetkililer, benzer restorasyon projelerinin Buhara ve Hive'de de başlatılacağını duyurdu.",
    ],
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
      "İstanbul'da düzenlenen Türk Dünyası Kültür Festivali'nde altı bağımsız devletten sanatçılar ve akademisyenler bir araya geldi.",
    content: [
      "İstanbul Büyükşehir Belediyesi'nin ev sahipliğinde düzenlenen 'Türk Dünyası Kültür Festivali', bir hafta boyunca şehrin farklı noktalarında konserler, sergiler, söyleşiler ve atölyelerle Türk dünyasının zengin kültürel mirasını sergiledi.",
      "Festivale Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan ve Türkmenistan'dan yüzlerce sanatçı, akademisyen ve zanaatkâr katıldı. Etkinlikler arasında geleneksel müzik konserleri, halk dansları gösterileri, el sanatları atölyeleri ve modern Türk edebiyatı üzerine paneller yer aldı.",
      "Sultanahmet Meydanı'nda kurulan büyük açık hava sahnesinde, her ülkenin geleneksel çalgılarını birleştiren özel orkestra konserleri büyük ilgi gördü. Ayrıca Gülhane Parkı'nda kurulan 'Türk Dünyası Çarşısı'nda altı ülkenin geleneksel yemekleri ve el sanatları ziyaretçilere sunuldu.",
      "Festivalin gelecek yıl Bakü'de, 2028'de ise Taşkent'te düzenlenmesi planlanıyor.",
    ],
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
