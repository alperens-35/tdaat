import { createServerFn } from "@tanstack/react-start";

export type LiveNewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string; // ISO
  source: string;
  country: string; // ISO-ish code used by FlagIcon
  summary?: string;
};

type Feed = {
  source: string;
  country: string;
  url: string;
};

// Curated RSS endpoints for each requested agency. If any feed is unreachable
// or returns invalid XML, it is silently skipped so the rest still render.
const FEEDS: Feed[] = [
  { source: "Anadolu Ajansı", country: "tr", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel" },
  { source: "TRT Haber", country: "tr", url: "https://www.trthaber.com/sondakika.rss" },
  { source: "TRT Avaz", country: "tr", url: "https://www.trtavaz.com.tr/rss/anasayfa/tr" },
  { source: "AZERTAC", country: "az", url: "https://azertag.az/tr/rss" },
  { source: "Kazinform", country: "kz", url: "https://www.inform.kz/tr/rss" },
  { source: "UZA", country: "uz", url: "https://uza.uz/tr/rss" },
  { source: "Kabar", country: "kg", url: "https://kabar.kg/tr/rss/" },
  { source: "TAK (KKTC)", country: "tr", url: "https://www.tak.gov.ct.tr/rss" },
  { source: "QHA (Kırım)", country: "tr", url: "https://qha.com.tr/rss" },
];

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
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
    const summary =
      pick(block, "description") || pick(block, "summary") || pick(block, "content");
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
      summary: summary ? summary.slice(0, 240) : undefined,
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
          "Mozilla/5.0 (compatible; TDAAT-NewsAggregator/1.0; +https://tdaat.lovable.app)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.5",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, feed);
  } catch {
    return [];
  }
}

export const getTurkWorldNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveNewsItem[]> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
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
        if (n >= 6) continue;
        perSource.set(item.source, n + 1);
        capped.push(item);
      }
      return capped.slice(0, 60);
    } finally {
      clearTimeout(timeout);
    }
  },
);
