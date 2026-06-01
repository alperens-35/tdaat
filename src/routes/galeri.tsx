import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri — TDAAT" },
      {
        name: "description",
        content: "Türk Dünyası Akademik Araştırmalar Topluluğu etkinliklerinden fotoğraflar ve anılar.",
      },
      { property: "og:title", content: "Galeri — TDAAT" },
      { property: "og:description", content: "Etkinliklerimizden kareler ve anılar." },
      { property: "og:url", content: "https://tdaat.lovable.app/galeri" },
    ],
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/galeri" }],
  }),
  component: GalleryPage,
});

const PHOTOS = [
  { caption: "Açılış buluşması — 2025", color: "from-amber-200/40 to-rose-200/40" },
  { caption: "Mangala turnuvası finali", color: "from-emerald-200/40 to-teal-200/40" },
  { caption: "Makale okuması", color: "from-sky-200/40 to-indigo-200/40" },
  { caption: "Türk dünyası paneli", color: "from-rose-200/40 to-orange-200/40" },
  { caption: "Geleneksel oyunlar günü", color: "from-purple-200/40 to-pink-200/40" },
  { caption: "Sohbet akşamı", color: "from-cyan-200/40 to-blue-200/40" },
];

function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-left">
        Galeri
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Topluluk olarak biriktirdiğimiz anıların bir kısmı burada. Fotoğraflarımızı yakında bu sayfada paylaşacağız.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((photo, i) => (
          <figure
            key={i}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br ${photo.color}`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
              <ImageIcon className="h-10 w-10" />
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4 text-sm font-medium text-foreground">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Etkinliklerimizden fotoğraflarını paylaşmak ister misin? <a href="mailto:egeturkduyasitoplulugu@gmail.com" className="text-primary hover:underline">Bize yaz</a>.
      </p>
    </div>
  );
}
