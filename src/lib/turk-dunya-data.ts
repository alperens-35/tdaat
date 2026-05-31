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
  content: string[];
  origin: string;
  flag: string;
};

export type AcademicItem = {
  id: string;
  title: string;
  institution: string;
  summary: string;
  content: string[];
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
      "Projenin en dikkat çekici yönü, üretilen fazla enerjinin Türkiye ve Gürcistan üzerinden Avrupa'ya, doğuya doğru ise Türkistan Türk cumhuriyetlerine iletilmesi planı. Bu kapsamda Hazar geçişli bir denizaltı elektrik kablosu projesi için fizibilite çalışmaları başlatıldı.",
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
    content: [
      "Nevruz, kelime anlamıyla 'yeni gün' demektir ve binlerce yıldır Türk dünyasının ortak bayramı olarak kutlanmaktadır. 21 Mart'ta, gece ile gündüzün eşitlendiği bahar ekinoksunda kutlanan bu bayram, doğanın yeniden uyanışını, umudu ve toplumsal dayanışmayı simgeler.",
      "Türk dünyasında Nevruz, farklı isimlerle ve farklı geleneklerle kutlanır: Türkiye'de Nevruz, Azerbaycan'da Novruz Bayramı, Kazakistan'da Nauryz Meyramı, Kırgızistan'da Nooruz, Özbekistan'da Navro'z, Türkmenistan'da Nowruz. Tüm bu kutlamalarda ortak olan; ateş üzerinden atlamak, sofralar kurmak ve doğayla buluşmaktır.",
      "Kazakistan'da bu bayrama özgü hazırlanan 'Nauryz köje' adlı yedi malzemeli çorba, bolluk ve bereketin simgesidir. Azerbaycan'da ise 'Semeni' adı verilen filizlenmiş buğday, yeniden doğuşu temsil eder.",
      "2009 yılında UNESCO İnsanlığın Somut Olmayan Kültürel Mirası Listesi'ne alınan Nevruz, Türk dünyasının ortak kültürel mirasının en güçlü ifadelerinden biri olmaya devam etmektedir.",
    ],
    origin: "Ortak Miras",
    flag: "🌿",
  },
  {
    id: "bozkir-kulturu",
    title: "Bozkır Kültürü",
    description:
      "Ata yurdu Türkistan bozkırlarından süzülerek gelen yaşam tarzı, konar-göçer hayat, atçılık ve çadır geleneği. Günümüzde hala Kırgızistan, Kazakistan ve Moğolistan'da canlılığını koruyor.",
    content: [
      "Bozkır kültürü, Türk milletinin tarih sahnesine çıktığı andan itibaren şekillendirdiği ve yüzyıllar boyunca taşıdığı bir yaşam biçimidir. Atın ehlîleştirilmesi, demirin işlenmesi ve göçebe yaşam tarzının geliştirilmesi, bu kültürün temel taşlarını oluşturur.",
      "Konar-göçer yaşam, mevsimlere göre yaylak ve kışlak arasında hareket etmeyi gerektirir. Bu yaşam tarzı, doğayla uyumlu, sade ve fonksiyonel bir kültürün doğmasına neden olmuştur. Yurt (çadır) bu kültürün en somut sembolüdür; sökülüp taşınabilen, dakikalar içinde yeniden kurulabilen mühendislik harikasıdır.",
      "Atçılık, bozkır kültürünün belkemiğidir. Türkler, atı sadece bir binek değil, savaşta yoldaş, törenlerde kutsal, ekonomide temel kaynak olarak görmüştür. Kımız (mayalanmış kısrak sütü), bu kültürün geleneksel içeceği olarak hâlâ Kazakistan ve Kırgızistan'da yaygın biçimde tüketilmektedir.",
      "Günümüzde Kırgızistan'ın Yaylım göçleri, Kazakistan'daki at festivalleri ve Moğolistan'ın Nadaam oyunları, bu kadim kültürün yaşayan örnekleridir.",
    ],
    origin: "Türkistan",
    flag: "🐎",
  },
  {
    id: "hat-sanati",
    title: "Hat Sanatı",
    description:
      "Arap harfleriyle yazılan güzel yazı sanatı, Türk-İslam medeniyetinin zirvesi olarak kabul edilir. Osmanlı döneminde doruk noktasına ulaşan hat, cami ve medreselerde süsleme unsuru olarak kullanıldı.",
    content: [
      "Hat sanatı, Arap harflerinin estetik kurallar çerçevesinde güzel ve dengeli biçimde yazılması sanatıdır. 'Hat' kelimesi Arapça'da 'çizgi' anlamına gelir; ancak Türk-İslam medeniyetinde bu sanat, yalnızca yazıdan öte bir anlam yüklenmiş, ruhun ve maneviyatın görsel ifadesi hâline gelmiştir.",
      "Osmanlı döneminde hat sanatı altın çağını yaşamıştır. Şeyh Hamdullah, Hafız Osman, Mustafa Râkım ve Mehmed Şefik Bey gibi büyük hattatlar, bugün dünya müzelerinde sergilenen eserler bırakmışlardır. 'Kur'an Mekke'de indi, Mısır'da okundu, İstanbul'da yazıldı' sözü, Türklerin bu sanattaki ustalığını özetler.",
      "Hat sanatında sülüs, nesih, ta'lik, divani, kufi gibi farklı yazı çeşitleri vardır. Her biri farklı amaçlar için kullanılır: kitabe yazısında celî sülüs, kitaplarda nesih, padişah fermanlarında divani tercih edilmiştir.",
      "Günümüzde Türkiye, Azerbaycan ve Özbekistan'daki güzel sanatlar akademilerinde hat eğitimi verilmekte; UNESCO 2021'de bu sanatı İnsanlığın Somut Olmayan Kültürel Mirası Listesi'ne dahil etmiştir.",
    ],
    origin: "Türkiye / Ortak",
    flag: "✒️",
  },
  {
    id: "asiklik-gelenegi",
    title: "Aşıklık Geleneği",
    description:
      "Saz eşliğinde doğaçlama şiir söyleme ve hikâye anlatma geleneği. Azerbaycan aşığı, Kazak akyını, Kırgız manasçısı ve Türk aşığı ortak köklere sahip bu geleneğin farklı dallarıdır.",
    content: [
      "Aşıklık geleneği, Türk dünyasının ortak sözlü edebiyat geleneklerinin en güçlü kollarından biridir. Saz (bağlama, kopuz, dombıra) eşliğinde doğaçlama şiir söyleyen, hikâye anlatan ve toplumsal olayları yorumlayan ozanlar yüzyıllardır bu geleneği yaşatmaktadır.",
      "Türkiye'de 'aşık', Azerbaycan'da 'aşıq', Kazakistan'da 'akın', Kırgızistan'da 'akın' ve 'manasçı', Türkmenistan'da 'bagşı' adıyla bilinen bu ustalar; aynı kökenden gelen bir geleneğin farklı kollarını temsil ederler.",
      "Karacaoğlan, Aşık Veysel, Pir Sultan Abdal Türkiye'de; Aşıq Ələsgər Azerbaycan'da; Jambıl Jabayev Kazakistan'da; Toktogul Satılganov Kırgızistan'da bu geleneğin unutulmaz isimleridir. 'Manas Destanı' ise Kırgız manasçılarının yüzyıllardır ezberden okuduğu, dünyanın en uzun destanlarından biridir (500.000+ dize).",
      "Aşıklık geleneği, atışma (deyişme), muamma çözme ve usta-çırak ilişkisi gibi kendine özgü kuralları olan canlı bir kültürdür. UNESCO Azerbaycan aşık sanatını 2009'da, Türk aşıklık geleneğini de farklı tescillerle koruma altına almıştır.",
    ],
    origin: "Türk Dünyası",
    flag: "🎵",
  },
  {
    id: "carpet-weaving",
    title: "Halıcılık",
    description:
      "Özellikle Türkmenistan, Azerbaycan ve Anadolu'da gelişen halı dokuma sanatı, her bölgenin kendine özgü motifleriyle zengin bir miras sunar. 'Göçmen duvar resmi' olarak da tanımlanır.",
    content: [
      "Türk halıcılığı, binlerce yıl öncesine dayanan bir gelenektir. 1949'da Sibirya'nın Pazırık kurganlarında bulunan ve MÖ 5. yüzyıla tarihlenen 'Pazırık Halısı', dünyanın bilinen en eski düğümlü halısıdır ve Türk halıcılığının kökenini Orta Asya bozkırlarına taşır.",
      "Anadolu'da Selçuklu döneminde Konya halıları, Osmanlı döneminde Uşak, Bergama, Hereke halıları dünyaca tanınmıştır. Avrupalı ressamların tablolarında Türk halılarına sıkça yer verilmesi, bu sanatın uluslararası prestijinin kanıtıdır.",
      "Türkmenistan'da her boy kendi 'göl' motifini taşır: Tekke, Yomut, Saryk, Ersarı göl motifleri, halıya bakıldığında o halının hangi boya ait olduğunu gösterir. Türkmen bayrağında dahi bu beş göl motifi yer alır.",
      "Azerbaycan halıcılığı; Kuba, Şirvan, Karabağ, Tebriz, Gence okullarıyla zengindir. UNESCO Azerbaycan halıcılık geleneğini 2010'da, geleneksel Türk halı dokumacılığını da çeşitli tescillerle insanlık mirası listesine almıştır.",
    ],
    origin: "Türkmenistan / Ortak",
    flag: "🧶",
  },
  {
    id: "buzkashi",
    title: "Buzkashi (Oğlak Kapma)",
    description:
      "Özellikle Afganistan, Özbekistan ve Kırgızistan'da oynanan geleneksel atlı spor. Ölü oğlağı hedefe taşıma üzerine kurulan bu oyun, Türk atlı kültürünün güçlü bir ifadesidir.",
    content: [
      "Buzkashi, kelime anlamıyla 'oğlak kapma' demektir ve Türk dünyasında 'kökbörü', 'gökbörü', 'ulak tartış' gibi farklı isimlerle bilinir. Atlı sporların atası olarak kabul edilen bu oyun, Türk savaş sanatının ve binicilik geleneğinin canlı bir mirasıdır.",
      "Oyun, iki takım atlının başı kesilmiş bir oğlağı (veya günümüzde özel hazırlanmış bir nesneyi) kapıp belirlenen hedefe taşımasıyla oynanır. Mücadele oldukça çetin geçer; atların terbiyesi, biniciler arasındaki uyum ve cesaret oyunun belirleyici unsurlarıdır.",
      "Kırgızistan'da Kök Börü, milli spor olarak kabul edilmiş ve Dünya Göçebe Oyunları'nın resmi disiplinleri arasına alınmıştır. Kazakistan'da kökpar, Özbekistan'da ulak, Türkmenistan'da gökbörü, Afganistan'da buzkashi adıyla aynı geleneğin kolları yaşatılmaktadır.",
      "Bu spor, sadece bir oyun değil, aynı zamanda bir kültürel kimlik ifadesidir. Türk dünyası, bu geleneği uluslararası alana taşımak için Dünya Göçebe Oyunları'nı düzenlemekte ve genç nesillere aktarılmasına özel önem vermektedir.",
    ],
    origin: "Türkistan",
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
    content: [
      "Uluslararası Türkoloji Kongresi, Türk dili, tarihi, edebiyatı, etnografyası ve sanatı üzerine çalışan akademisyenleri her iki yılda bir bir araya getiren prestijli bir bilimsel toplantıdır. Ankara Üniversitesi Dil ve Tarih-Coğrafya Fakültesi'nin ev sahipliğinde düzenlenen kongreye, dünyanın 40'tan fazla ülkesinden bilim insanı katılmaktadır.",
      "Kongre programı; Eski Türkçe ve Orhun Yazıtları, Çağatayca metinler, Türk lehçelerinin karşılaştırmalı dilbilgisi, Türk halk edebiyatı, Türk müziği ve etnomüzikoloji, mimari ve sanat tarihi gibi geniş bir yelpazede oturumlardan oluşmaktadır.",
      "Genç araştırmacılar için açılan özel oturumlar, doktora öğrencilerine çalışmalarını uluslararası bir platformda sunma fırsatı tanımaktadır. Kongre bildirileri hakemli bir süreçten geçirilerek 'Türkoloji Araştırmaları Yıllığı' adıyla yayımlanmaktadır.",
      "2027 kongresinin ana teması 'Dijital Çağda Türkoloji' olarak belirlenmiştir. Yapay zekâ destekli metin analizi, dijital arşivleme ve Türk lehçeleri arasında otomatik çeviri gibi konular gündemin merkezinde olacaktır. Başvurular 2026 Aralık ayı sonuna kadar açıktır.",
    ],
    field: "Dil ve Tarih",
  },
  {
    id: "central-asian-studies",
    title: "Türkistan Araştırmaları Dergisi",
    institution: "KazNU (Kazakistan)",
    summary:
      "Kazakistan'dan yayınlanan hakemli dergi, Türk dünyası siyaset bilimi, ekonomisi ve toplumsal yapısı üzerine çalışmaları akademik çevrelere taşıyor.",
    content: [
      "Türkistan Araştırmaları Dergisi, Kazakistan'ın en köklü yükseköğretim kurumu olan Al-Farabi Kazak Millî Üniversitesi (KazNU) bünyesinde yayımlanan, çift kör hakemli uluslararası bir akademik dergidir. Dergi, yılda dört sayı olarak Türkçe, Kazakça, İngilizce ve Rusça dillerinde makale kabul etmektedir.",
      "Yayın politikası; Türk cumhuriyetlerinin siyasi yapıları, bölgesel ekonomik entegrasyon, sosyal değişim, kentleşme, göç hareketleri, eğitim politikaları ve dış ilişkiler gibi konuları kapsamaktadır. Dergi, Scopus ve Web of Science taramalı veri tabanlarında indekslenmektedir.",
      "Son sayıda yayımlanan dikkat çekici çalışmalar arasında 'Türk Devletleri Teşkilatı'nın Bölgesel Güvenlik Mimarisindeki Yeri', 'Hazar Geçişli Boru Hatları ve Enerji Diplomasisi' ve 'Türk Cumhuriyetlerinde Dijital Dönüşüm Politikalarının Karşılaştırmalı Analizi' başlıklı makaleler yer almaktadır.",
      "Lisansüstü öğrenciler için ayrı bir 'Genç Araştırmacılar' bölümü bulunmaktadır. Makale başvuruları derginin web sitesi üzerinden çevrim içi olarak yapılmaktadır.",
    ],
    field: "Sosyal Bilimler",
  },
  {
    id: "migrating-words",
    title: "Göçebe Sözcükler Projesi",
    institution: "TDAAT & Ortaklar",
    summary:
      "Türk lehçelerinde ortak kökenli ama farklı anlamlara evrilmiş kelimeleri belgeleyen dijital veri tabanı projesi. Öğrencilerin katkıda bulunabileceği açık bir araştırma.",
    content: [
      "Göçebe Sözcükler Projesi, Türk lehçeleri arasında ortak kökenden gelmesine rağmen yüzyıllar içinde farklı anlamlara, kullanımlara ve telaffuzlara evrilmiş kelimeleri belgeleyen, açık erişimli dijital bir veri tabanı çalışmasıdır. Proje, TDAAT'ın koordinasyonunda Türkiye, Azerbaycan, Kazakistan ve Kırgızistan'dan dilbilimcilerin ortak katılımıyla yürütülmektedir.",
      "Veri tabanı şu anda 12.000'i aşkın kelime kaydı içermektedir. Her kayıt için kelimenin Eski Türkçedeki kökü, günümüz Türk lehçelerindeki karşılıkları, anlam kaymaları, ses değişimleri ve örnek cümleler yer almaktadır. Sesli telaffuz örnekleri de eklenerek lehçeler arasındaki fonetik farkların kavranması kolaylaştırılmıştır.",
      "Projenin en yenilikçi yönü, açık katılım modelidir. Öğrenciler, akademisyenler ve dil meraklıları sisteme üye olarak yeni kelimeler önerebilir, mevcut kayıtlara katkıda bulunabilir veya kendi lehçelerinden örnekler ekleyebilirler. Tüm katkılar uzman editörlerin onayından geçer.",
      "Proje verileri Creative Commons lisansı altında yayımlanmaktadır; eğitim materyali, mobil uygulama veya araştırma çalışmalarında serbestçe kullanılabilir. TDAAT, lise ve üniversite öğrencileri için özel atölyeler düzenleyerek projeye genç katılımı teşvik etmektedir.",
    ],
    field: "Dilbilim",
  },
];
