export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  category: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "turk-dunyasi-neden-onemli",
    title: "Türk Dünyası Neden Önemli?",
    excerpt:
      "Ortak tarih, dil ve kültür mirasının çağımız üniversite öğrencisi için ne ifade ettiğine dair kısa bir giriş.",
    date: "15 Mayıs 2026",
    author: "TDAAT Yayın Kurulu",
    readingTime: "5 dk",
    category: "Kültür",
    content:
      "Türk dünyası, bugün altı bağımsız devlet ve milyonlarca insanı kapsayan geniş bir coğrafyaya yayılır. Ortak tarih, akraba diller ve paylaşılan kültürel kodlar; akademik araştırma, ekonomi, sanat ve diplomasi için zengin bir zemin sunar. Bu yazıda, üniversite öğrencisi olarak bu mirası neden tanımanın değerli olduğunu kısaca özetliyoruz.",
  },
  {
    slug: "topluluk-kuruluş-hikayesi",
    title: "TDAAT Nasıl Kuruldu?",
    excerpt:
      "Bir grup öğrencinin Ege Üniversitesi'nde Türk Dünyası Akademik Araştırmalar Topluluğu'nu kurma yolculuğu.",
    date: "1 Mayıs 2026",
    author: "Muharrem Turgut",
    readingTime: "4 dk",
    category: "Topluluk",
    content:
      "TDAAT, 2025-2026 akademik yılında, Ege Üniversitesi'nde Türk dünyası ile ilgilenen bir grup öğrencinin bir araya gelmesiyle kuruldu. İlk toplantılarımızdan ilk panele kadar geçen sürede neler yaşadığımızı, hangi engellerle karşılaştığımızı ve neyi başarmaya çalıştığımızı bu yazıda anlatıyoruz.",
  },
  {
    slug: "mangala-nedir",
    title: "Mangala: Türk Zekâ Oyunu",
    excerpt:
      "Geleneksel Mangala oyununun kısa tarihi, kuralları ve neden bir 'Türk satrancı' sayılabileceği.",
    date: "20 Nisan 2026",
    author: "Alparslan Cengiz",
    readingTime: "6 dk",
    category: "Oyun & Spor",
    content:
      "Mangala, taş ve çukurlardan oluşan basit ama derin bir strateji oyunudur. Türk kültüründe yüzyıllardır oynanır, modern Türkiye'de okul müsabakalarıyla yeniden popüler olmuştur. Bu yazıda kuralları, temel stratejileri ve neden bir 'düşünme antrenmanı' olarak değerli olduğunu ele alıyoruz.",
  },
];

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
