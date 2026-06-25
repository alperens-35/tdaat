import { createServerFn } from "@tanstack/react-start";

export type LiveNewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string; // ISO
  source: string;
  country: string; // ISO-ish code used by FlagIcon
  summary?: string;
  content?: string;
};

export type SourceStatus = {
  name: string;
  count: number;
};

export type TurkWorldNewsResult = {
  items: LiveNewsItem[];
  sources: SourceStatus[];
};

type Feed = {
  source: string;
  country: string;
  url: string;
  requireKeyword?: boolean;
};

// Curated RSS endpoints for each requested agency. If any feed is unreachable
// or returns invalid XML, it is silently skipped so the rest still render.
const FEEDS: Feed[] = [
  // Türkiye — Türkçe
  { source: "Anadolu Ajansı", country: "tr", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel", requireKeyword: true },
  { source: "TRT Haber", country: "tr", url: "https://www.trthaber.com/sondakika.rss", requireKeyword: true },
  { source: "TRT Avaz", country: "tr", url: "https://www.trtavaz.com.tr/rss/anasayfa/tr" },
  // Azerbaycan — Azerbaycan Türkçesi
  { source: "AZERTAC", country: "az", url: "https://azertag.az/rss" },
  // Kazakistan — Kazakça
  { source: "Kazinform", country: "kz", url: "https://www.inform.kz/kz/rss" },
  // Özbekistan — Özbekçe
  { source: "UZA", country: "uz", url: "https://uza.uz/oz/rss" },
  // Kırgızistan — Kırgızca
  { source: "Kabar", country: "kg", url: "https://kabar.kg/rss/" },
  // KKTC — Türkçe
  { source: "TAK (KKTC)", country: "tr", url: "https://www.tak.gov.ct.tr/rss" },
  // Kırım — Kırım Tatarcası / Türkçe
  { source: "QHA (Kırım)", country: "tr", url: "https://qha.com.tr/rss" },
];

// Keywords that mark an item as Türk dünyası related. Lower-cased, diacritic-tolerant
// matching covers Turkish + cognate spellings across Turkic languages.
const TURK_WORLD_KEYWORDS = [
  "turk dunyasi", "turk dunya", "turk devletleri", "tdt", "turk birligi",
  "turk konseyi", "turk akademisi", "turksoy", "turkpa", "turkic",
  "turkiye", "turkiya", "anadolu",
  "azerbaycan", "azerbaijan", "azeri", "baku", "baki", "karabag", "qarabag", "nahcivan", "naxcivan",
  "kazakistan", "kazakhstan", "qazaqstan", "kazak", "qazaq", "astana", "almati", "almaty",
  "ozbekistan", "uzbekistan", "ozbek", "uzbek", "taskent", "tashkent", "semerkant", "samarkand", "buhara", "bukhara",
  "kirgizistan", "kyrgyzstan", "kyrgyz", "kirgiz", "biskek", "bishkek",
  "turkmenistan", "turkmen", "askabat", "ashgabat",
  "kktc", "kuzey kibris", "lefkosa",
  "kirim", "qirim", "crimea", "tatar",
  "uygur", "uyghur", "dogu turkistan",
  "gagavuz", "baskurt", "yakut", "saha", "cuvas", "altay", "tuva",
  "ahiska",
];

// Political vocabulary used to drop domestic-politics items from the feeds.
// Applied after the Turkic-world keyword filter so cooperation/culture/economy
// items about Turkic states remain whenever possible.
const POLITICAL_KEYWORDS = [
  "siyaset", "politika", "siyasi", "seçim", "seçimleri", "milletvekili", "meclis", "tbmm",
  "bakanlar kurulu", "sayıştay", "danıştay", "yargıtay", "anayasa mahkemesi", "yüksek seçim kurulu", "ysk",
  "hükümet", "iktidar", "muhalefet", "parti", "partisi", "partisinin", "başbakanlık", "bakanlık", "bakanlığına", "bakanlığı",
  "cumhurbaşkanlığı", "belediye", "valilik", "vali", "kaymakam", "kaymakamlık",
  "büyükelçilik", "büyükelçi", "diplomat", "diplomatik",
];

function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/i̇/g, "i")
    .replace(/ş/g, "s").replace(/ç/g, "c")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o");
}

function matchesTurkWorld(item: LiveNewsItem): boolean {
  const hay = normalize(`${item.title} ${item.summary ?? ""}`);
  return TURK_WORLD_KEYWORDS.some((k) => hay.includes(k));
}

function matchesPolitical(item: LiveNewsItem): boolean {
  const hay = normalize(`${item.title} ${item.summary ?? ""}`);
  return POLITICAL_KEYWORDS.some((k) => hay.includes(k));
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function pick(block: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m ? decode(m[1]) : undefined;
}

function parseRss(xml: string, feed: Feed): LiveNewsItem[] {
  const items: LiveNewsItem[] = [];
  // RSS <item> and Atom <entry>
  const blocks = [
    ...xml.matchAll(/<item[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi),
  ];
  for (const m of blocks) {
    const block = m[0];
    const title = pick(block, "title");
    let link = pick(block, "link");
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["']/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    const pubRaw =
      pick(block, "pubDate") ||
      pick(block, "published") ||
      pick(block, "updated") ||
      pick(block, "dc:date");
    const rawContent =
      pick(block, "description") || pick(block, "summary") || pick(block, "content");
    const contentText = rawContent ?? "";
    const itemSummary = contentText ? contentText.slice(0, 240) : undefined;
    const itemContent = contentText ? contentText.slice(0, 3000) : undefined;
    if (!title || !link) continue;
    const date = pubRaw ? new Date(pubRaw) : new Date();
    const iso = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
    items.push({
      id: `${feed.source}-${link}`,
      title,
      link,
      pubDate: iso,
      source: feed.source,
      country: feed.country,
      summary: itemSummary,
      content: itemContent,
    });
  }
  return items;
}

async function fetchFeed(feed: Feed, signal: AbortSignal): Promise<LiveNewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.5",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRss(xml, feed);
    let filtered = feed.requireKeyword ? items.filter(matchesTurkWorld) : items;
    // Drop political items from every feed so the section focuses on
    // culture, economy, society, science, sport and cooperation.
    filtered = filtered.filter((i) => !matchesPolitical(i));
    return filtered;
  } catch {
    return [];
  }
}

export const getTurkWorldNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<TurkWorldNewsResult> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const results = await Promise.all(FEEDS.map((f) => fetchFeed(f, controller.signal)));
      const merged = results.flat();
      // Sort newest first
      merged.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
      // Cap per-source to keep variety
      const perSource = new Map<string, number>();
      const capped: LiveNewsItem[] = [];
      for (const item of merged) {
        const n = perSource.get(item.source) ?? 0;
        if (n >= 8) continue;
        perSource.set(item.source, n + 1);
        capped.push(item);
      }
      const sources: SourceStatus[] = FEEDS.map((f) => ({
        name: f.source,
        count: results.find((r) => r[0]?.source === f.source)?.length ?? 0,
      }));
      return { items: capped.slice(0, 60), sources };
    } finally {
      clearTimeout(timeout);
    }
  },
);

export async function extractArticleText(url: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];

    let html = await res.text();
    // Prefer article/main content if available.
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const sourceHtml = articleMatch?.[1] ?? mainMatch?.[1] ?? html;

    let text = sourceHtml
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<aside[\s\S]*?<\/aside>/gi, "")
      .replace(/<title[\s\S]*?<\/title>/gi, "")
      .replace(/<h1[\s\S]*?<\/h1>/gi, "");

    text = decode(text);

    return text
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length >= 80 && p.length <= 900)
      .slice(0, 14);
  } catch {
    return [];
  }
}

