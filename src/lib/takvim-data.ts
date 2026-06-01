export type CalendarEvent = {
  date: string; // "MM-DD" formatında
  title: string;
  category: "bayram" | "anma" | "kultur" | "tarih";
  description: string;
  country?: string;
};

export const calendarEvents: CalendarEvent[] = [
  { date: "01-01", title: "Yılbaşı", category: "kultur", description: "Tüm Türk dünyasında yeni yılın karşılanması." },
  { date: "01-13", title: "Sürgün Anma Günü (Ahıska Türkleri)", category: "anma", description: "1944 Ahıska Türkleri sürgününün anma günü.", country: "Ahıska" },
  { date: "02-26", title: "Hocalı Katliamı'nı Anma Günü", category: "anma", description: "1992 Hocalı Katliamı'nda hayatını kaybedenleri anma günü.", country: "Azerbaycan" },
  { date: "03-18", title: "Çanakkale Zaferi", category: "tarih", description: "18 Mart 1915 Çanakkale Deniz Zaferi.", country: "Türkiye" },
  { date: "03-21", title: "Nevruz Bayramı", category: "bayram", description: "Türk dünyasının ortak baharın gelişi bayramı." },
  { date: "04-23", title: "Ulusal Egemenlik ve Çocuk Bayramı", category: "bayram", description: "TBMM'nin açılışı ve çocuklara armağan edilen bayram.", country: "Türkiye" },
  { date: "05-03", title: "Türkçüler Bayramı", category: "bayram", description: "1944 Türkçülük davası ve Türk milliyetçiliği için anma ve kutlama günü." },
  
  { date: "05-18", title: "Kırım Tatar Sürgünü'nü Anma Günü", category: "anma", description: "1944 Kırım Tatar sürgününün anma günü.", country: "Kırım" },
  { date: "05-19", title: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", category: "bayram", description: "Atatürk'ün Samsun'a çıkışı.", country: "Türkiye" },
  { date: "05-28", title: "Cumhuriyet Günü", category: "bayram", description: "Azerbaycan Demokratik Cumhuriyeti'nin ilanı (1918).", country: "Azerbaycan" },
  { date: "05-29", title: "İstanbul'un Fethi", category: "tarih", description: "29 Mayıs 1453'te Fatih Sultan Mehmet tarafından İstanbul'un fethi.", country: "Türkiye" },
  { date: "06-15", title: "Türkmenistan Bilim Günü", category: "kultur", description: "Türkmenistan'da bilim ve eğitim bayramı.", country: "Türkmenistan" },
  { date: "07-04", title: "Otlukbeli Zaferi", category: "tarih", description: "1473'te Fatih Sultan Mehmet'in Akkoyunlu hükümdarı Uzun Hasan'a karşı kazandığı zafer.", country: "Türkiye" },
  { date: "08-23", title: "Preveze Deniz Zaferi", category: "tarih", description: "1538'de Barbaros Hayreddin Paşa komutasındaki Osmanlı donanmasının Haçlı donanmasına karşı kazandığı zafer.", country: "Türkiye" },
  { date: "08-26", title: "Malazgirt Zaferi", category: "tarih", description: "26 Ağustos 1071'de Sultan Alp Arslan'ın Bizans ordusuna karşı kazandığı, Anadolu'nun kapılarını Türklere açan zafer.", country: "Türkiye" },
  { date: "08-30", title: "Zafer Bayramı", category: "bayram", description: "30 Ağustos 1922 Büyük Taarruz zaferi.", country: "Türkiye" },
  { date: "08-31", title: "Bağımsızlık Günü", category: "bayram", description: "Kırgızistan'ın bağımsızlık günü (1991).", country: "Kırgızistan" },
  { date: "09-01", title: "Bağımsızlık Günü", category: "bayram", description: "Özbekistan'ın bağımsızlık günü (1991).", country: "Özbekistan" },
  { date: "09-09", title: "Kut'ül Amare Zaferi (Kuruluş)", category: "tarih", description: "Talas Savaşı (751) — Karluk Türklerinin de katılımıyla Çinlilere karşı kazanılan zafer, Türklerin İslam ile buluşmasının yolunu açtı." },
  { date: "09-13", title: "Sakarya Meydan Muharebesi Zaferi", category: "tarih", description: "13 Eylül 1921'de sona eren ve Kurtuluş Savaşı'nın dönüm noktası olan zafer.", country: "Türkiye" },
  { date: "10-27", title: "Bağımsızlık Günü", category: "bayram", description: "Türkmenistan'ın bağımsızlık günü (1991).", country: "Türkmenistan" },
  { date: "10-29", title: "Cumhuriyet Bayramı", category: "bayram", description: "Türkiye Cumhuriyeti'nin ilanı (1923).", country: "Türkiye" },
  { date: "11-08", title: "Bayrak Günü", category: "kultur", description: "Azerbaycan Devlet Bayrağı Günü.", country: "Azerbaycan" },
  { date: "11-09", title: "Zafer Günü", category: "tarih", description: "Karabağ Zaferi.", country: "Azerbaycan" },
  { date: "11-10", title: "Atatürk'ü Anma Günü", category: "anma", description: "Mustafa Kemal Atatürk'ün vefatının yıl dönümü.", country: "Türkiye" },
  { date: "12-12", title: "Neftçala Cumhuriyeti Günü", category: "tarih", description: "Türk dünyası tarihi anma günü." },
  { date: "12-16", title: "Bağımsızlık Günü", category: "bayram", description: "Kazakistan'ın bağımsızlık günü (1991).", country: "Kazakistan" },
];


export const categoryLabels: Record<CalendarEvent["category"], string> = {
  bayram: "Bayram",
  anma: "Anma",
  kultur: "Kültür",
  tarih: "Tarih",
};

export const categoryColors: Record<CalendarEvent["category"], string> = {
  bayram: "bg-primary/10 text-primary ring-primary/20",
  anma: "bg-muted text-muted-foreground ring-border",
  kultur: "bg-accent text-accent-foreground ring-border",
  tarih: "bg-secondary text-secondary-foreground ring-border",
};
