import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "az" | "kk" | "ky" | "uz";

export const LANGS: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "tr", label: "Türkçe", native: "Türkçe", flag: "🇹🇷" },
  { code: "az", label: "Azərbaycanca", native: "Azərbaycanca", flag: "🇦🇿" },
  { code: "kk", label: "Қазақша", native: "Қазақша", flag: "🇰🇿" },
  { code: "ky", label: "Кыргызча", native: "Кыргызча", flag: "🇰🇬" },
  { code: "uz", label: "Oʻzbekcha", native: "Oʻzbekcha", flag: "🇺🇿" },
];

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.turkWorld": "Türk Dünyası",
    "nav.about": "Hakkımızda",
    "nav.events": "Etkinlikler",
    "nav.blog": "Blog",
    "nav.team": "Ekibimiz",
    "nav.arf": "Arf",
    "nav.contact": "İletişim",
    "nav.toggleMenu": "Menüyü Aç/Kapat",
    "lang.label": "Dil",

    "footer.tagline": "Üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk.",
    "footer.pages": "Sayfalar",
    "footer.social": "Sosyal Medya",
    "footer.contact": "İletişim",
    "footer.location": "İzmir, Türkiye",
    "footer.rights": "Tüm hakları saklıdır.",

    "home.badge": "Üniversite Öğrenci Topluluğu",
    "home.title1": "TÜRK DÜNYASI AKADEMİK",
    "home.title2": "ARAŞTIRMALAR",
    "home.title3": "TOPLULUĞU",
    "home.subtitle": "— Üniversite Öğrenci Topluluğu",
    "home.lede": "Üniversite öğrencilerinin öğrenme, üretme ve büyüme yolculuğunda birlikte güçlendikleri bir topluluk.",
    "home.ctaEvents": "Etkinlikleri Keşfet",
    "home.ctaAbout": "Hakkımızda",
    "home.feat1.title": "Öğrenme Kültürü",
    "home.feat1.desc": "Workshoplar, eğitimler ve peer-learning oturumlarıyla sürekli gelişim.",
    "home.feat2.title": "Etkinlikler",
    "home.feat2.desc": "Sektör uzmanlarıyla buluşmalar, hackathonlar ve sosyal etkinlikler.",
    "home.feat3.title": "Topluluk",
    "home.feat3.desc": "Benzer ilgi alanlarına sahip öğrencilerle network kur, birlikte üret.",
    "home.upcoming": "Yaklaşan Etkinlikler",
    "home.upcomingSub": "Kaçırma, sen de yerini al!",
    "home.seeAll": "Tümünü Gör",
    "home.details": "Detaylar",
    "home.team": "Ekibimiz",
    "home.teamSub": "Topluluğu büyütmek için çalışan tutkulu ekibimizle tanış.",
    "home.seeTeam": "Tüm Ekibi Gör",
    "home.ctaTitle": "Birlikte bir şeyler inşa edelim.",
    "home.ctaDesc": "Fikirlerin var, projeler yapmak istiyorsun ama yanında bir ekip arıyorsun. Topluluğumuzda yerin hazır.",
    "home.ctaContact": "Bizimle İletişime Geç",
  },
  az: {
    "nav.home": "Ana Səhifə",
    "nav.turkWorld": "Türk Dünyası",
    "nav.about": "Haqqımızda",
    "nav.events": "Tədbirlər",
    "nav.blog": "Bloq",
    "nav.team": "Komandamız",
    "nav.arf": "Arf",
    "nav.contact": "Əlaqə",
    "nav.toggleMenu": "Menyunu Aç/Bağla",
    "lang.label": "Dil",

    "footer.tagline": "Universitet tələbələrinin öyrənmə, istehsal və böyümə yolunda birlikdə güclənən bir icma.",
    "footer.pages": "Səhifələr",
    "footer.social": "Sosial Media",
    "footer.contact": "Əlaqə",
    "footer.location": "İzmir, Türkiyə",
    "footer.rights": "Bütün hüquqlar qorunur.",

    "home.badge": "Universitet Tələbə İcması",
    "home.title1": "TÜRK DÜNYASI AKADEMİK",
    "home.title2": "ARAŞDIRMALAR",
    "home.title3": "İCMASI",
    "home.subtitle": "— Universitet Tələbə İcması",
    "home.lede": "Universitet tələbələrinin öyrənmə, istehsal və böyümə yolunda birlikdə güclənən bir icma.",
    "home.ctaEvents": "Tədbirləri Kəşf Et",
    "home.ctaAbout": "Haqqımızda",
    "home.feat1.title": "Öyrənmə Mədəniyyəti",
    "home.feat1.desc": "Vörkşoplar, təlimlər və peer-learning seansları ilə davamlı inkişaf.",
    "home.feat2.title": "Tədbirlər",
    "home.feat2.desc": "Sahə mütəxəssisləri ilə görüşlər, hakatonlar və sosial tədbirlər.",
    "home.feat3.title": "İcma",
    "home.feat3.desc": "Oxşar maraqları olan tələbələrlə şəbəkə qur, birlikdə istehsal et.",
    "home.upcoming": "Yaxınlaşan Tədbirlər",
    "home.upcomingSub": "Qaçırma, sən də yerini al!",
    "home.seeAll": "Hamısına Bax",
    "home.details": "Təfərrüatlar",
    "home.team": "Komandamız",
    "home.teamSub": "İcmanı böyütmək üçün çalışan həvəsli komandamızla tanış ol.",
    "home.seeTeam": "Bütün Komandaya Bax",
    "home.ctaTitle": "Birlikdə bir şeylər quraq.",
    "home.ctaDesc": "Fikirlərin var, layihələr etmək istəyirsən amma yanında bir komanda axtarırsan. İcmamızda yerin hazırdır.",
    "home.ctaContact": "Bizimlə Əlaqə Saxla",
  },
  kk: {
    "nav.home": "Басты бет",
    "nav.turkWorld": "Түркі әлемі",
    "nav.about": "Біз туралы",
    "nav.events": "Іс-шаралар",
    "nav.blog": "Блог",
    "nav.team": "Біздің команда",
    "nav.arf": "Arf",
    "nav.contact": "Байланыс",
    "nav.toggleMenu": "Мәзірді ашу/жабу",
    "lang.label": "Тіл",

    "footer.tagline": "Университет студенттерінің үйрену, өндіру және өсу жолында бірге күшейетін қауымдастығы.",
    "footer.pages": "Беттер",
    "footer.social": "Әлеуметтік желілер",
    "footer.contact": "Байланыс",
    "footer.location": "Измир, Түркия",
    "footer.rights": "Барлық құқықтар қорғалған.",

    "home.badge": "Университет Студенттік Қауымдастығы",
    "home.title1": "ТҮРКІ ӘЛЕМІ АКАДЕМИЯЛЫҚ",
    "home.title2": "ЗЕРТТЕУЛЕР",
    "home.title3": "ҚАУЫМДАСТЫҒЫ",
    "home.subtitle": "— Университет Студенттік Қауымдастығы",
    "home.lede": "Университет студенттерінің үйрену, өндіру және өсу жолында бірге күшейетін қауымдастығы.",
    "home.ctaEvents": "Іс-шараларды зерттеу",
    "home.ctaAbout": "Біз туралы",
    "home.feat1.title": "Үйрену мәдениеті",
    "home.feat1.desc": "Шеберханалар, тренингтер және peer-learning сабақтары арқылы үздіксіз даму.",
    "home.feat2.title": "Іс-шаралар",
    "home.feat2.desc": "Сала мамандарымен кездесулер, хакатондар және әлеуметтік іс-шаралар.",
    "home.feat3.title": "Қауымдастық",
    "home.feat3.desc": "Ұқсас қызығушылықтары бар студенттермен желі құр, бірге өндір.",
    "home.upcoming": "Жақын іс-шаралар",
    "home.upcomingSub": "Өткізіп алма, орныңды ал!",
    "home.seeAll": "Барлығын көру",
    "home.details": "Толығырақ",
    "home.team": "Біздің команда",
    "home.teamSub": "Қауымдастықты өсіру үшін жұмыс істейтін құмар командамызбен танысыңыз.",
    "home.seeTeam": "Бүкіл команданы көру",
    "home.ctaTitle": "Бірге бір нәрсе құрайық.",
    "home.ctaDesc": "Идеяларың бар, жобалар жасағың келеді, бірақ қасыңда команда іздейсің. Қауымдастығымызда орның дайын.",
    "home.ctaContact": "Бізбен байланысыңыз",
  },
  ky: {
    "nav.home": "Башкы бет",
    "nav.turkWorld": "Түрк дүйнөсү",
    "nav.about": "Биз жөнүндө",
    "nav.events": "Иш-чаралар",
    "nav.blog": "Блог",
    "nav.team": "Биздин команда",
    "nav.arf": "Arf",
    "nav.contact": "Байланыш",
    "nav.toggleMenu": "Менюну ачуу/жабуу",
    "lang.label": "Тил",

    "footer.tagline": "Университеттин студенттери үйрөнүү, өндүрүү жана өсүү жолунда бирге чыңалган коомчулук.",
    "footer.pages": "Барактар",
    "footer.social": "Социалдык тармактар",
    "footer.contact": "Байланыш",
    "footer.location": "Измир, Түркия",
    "footer.rights": "Бардык укуктар сакталган.",

    "home.badge": "Университет Студенттик Коомчулугу",
    "home.title1": "ТҮРК ДҮЙНӨСҮ АКАДЕМИЯЛЫК",
    "home.title2": "ИЗИЛДӨӨЛӨР",
    "home.title3": "КООМЧУЛУГУ",
    "home.subtitle": "— Университет Студенттик Коомчулугу",
    "home.lede": "Университеттин студенттери үйрөнүү, өндүрүү жана өсүү жолунда бирге чыңалган коомчулук.",
    "home.ctaEvents": "Иш-чараларды изилдөө",
    "home.ctaAbout": "Биз жөнүндө",
    "home.feat1.title": "Үйрөнүү маданияты",
    "home.feat1.desc": "Устаканалар, тренингдер жана peer-learning сабактары менен үзгүлтүксүз өсүү.",
    "home.feat2.title": "Иш-чаралар",
    "home.feat2.desc": "Тармак адистери менен жолугушуулар, хакатондор жана социалдык иш-чаралар.",
    "home.feat3.title": "Коомчулук",
    "home.feat3.desc": "Окшош кызыкчылыктары бар студенттер менен тармак түз, бирге өндүр.",
    "home.upcoming": "Жакынкы иш-чаралар",
    "home.upcomingSub": "Өткөрүп жибербе, сен да ордуңду ал!",
    "home.seeAll": "Баарын көрүү",
    "home.details": "Чоо-жайы",
    "home.team": "Биздин команда",
    "home.teamSub": "Коомчулукту өстүрүү үчүн иштеген кумар командабыз менен таанышыңыз.",
    "home.seeTeam": "Бүт команданы көрүү",
    "home.ctaTitle": "Бирге бир нерсе курабыз.",
    "home.ctaDesc": "Идеяларың бар, долбоорлор жасагың келет, бирок жаныңда команда издейсиң. Коомчулугубузда ордуң даяр.",
    "home.ctaContact": "Биз менен байланыш",
  },
  uz: {
    "nav.home": "Bosh sahifa",
    "nav.turkWorld": "Turk dunyosi",
    "nav.about": "Biz haqimizda",
    "nav.events": "Tadbirlar",
    "nav.blog": "Blog",
    "nav.team": "Bizning jamoa",
    "nav.arf": "Arf",
    "nav.contact": "Aloqa",
    "nav.toggleMenu": "Menyuni ochish/yopish",
    "lang.label": "Til",

    "footer.tagline": "Universitet talabalarining oʻrganish, ishlab chiqarish va oʻsish yoʻlida birgalikda kuchayadigan jamoasi.",
    "footer.pages": "Sahifalar",
    "footer.social": "Ijtimoiy tarmoqlar",
    "footer.contact": "Aloqa",
    "footer.location": "Izmir, Turkiya",
    "footer.rights": "Barcha huquqlar himoyalangan.",

    "home.badge": "Universitet Talabalar Jamoasi",
    "home.title1": "TURK DUNYOSI AKADEMIK",
    "home.title2": "TADQIQOTLAR",
    "home.title3": "JAMOASI",
    "home.subtitle": "— Universitet Talabalar Jamoasi",
    "home.lede": "Universitet talabalarining oʻrganish, ishlab chiqarish va oʻsish yoʻlida birgalikda kuchayadigan jamoasi.",
    "home.ctaEvents": "Tadbirlarni kashf eting",
    "home.ctaAbout": "Biz haqimizda",
    "home.feat1.title": "Oʻrganish madaniyati",
    "home.feat1.desc": "Vorkshoplar, treninglar va peer-learning mashgʻulotlari bilan uzluksiz rivojlanish.",
    "home.feat2.title": "Tadbirlar",
    "home.feat2.desc": "Soha mutaxassislari bilan uchrashuvlar, xakatonlar va ijtimoiy tadbirlar.",
    "home.feat3.title": "Jamoa",
    "home.feat3.desc": "Oʻxshash qiziqishlarga ega talabalar bilan tarmoq quring, birgalikda ishlab chiqaring.",
    "home.upcoming": "Yaqinlashayotgan tadbirlar",
    "home.upcomingSub": "Oʻtkazib yubormang, siz ham joyingizni oling!",
    "home.seeAll": "Hammasini koʻrish",
    "home.details": "Tafsilotlar",
    "home.team": "Bizning jamoa",
    "home.teamSub": "Jamoani oʻstirish uchun ishlayotgan ishtiyoqli jamoamiz bilan tanishing.",
    "home.seeTeam": "Butun jamoani koʻrish",
    "home.ctaTitle": "Birgalikda nimadir quraylik.",
    "home.ctaDesc": "Gʻoyalaringiz bor, loyihalar qilmoqchisiz, ammo yoningizda jamoa qidiryapsiz. Jamoamizda joyingiz tayyor.",
    "home.ctaContact": "Biz bilan bogʻlaning",
  },
};

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "tdaat-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && translations[saved]) setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? translations.tr[key] ?? key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
