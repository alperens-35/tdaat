import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/turk-dunyasi")({
  component: TurkDunyasiPage,
  head: () => ({
    meta: [
      { title: "Türk Dünyası — TDAAT" },
      { name: "description", content: "Türk dünyasından haberler ve ortak kültürümüze dair içerikler." },
    ],
  }),
});

function TurkDunyasiPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Türk Dünyası
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Türk dünyasından haberler ve ortak kültürümüze dair içerikler burada paylaşılacak.
        </p>
      </div>

      <div className="mt-16 flex items-center justify-center">
        <div className="flex h-48 w-full max-w-md items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30">
          <span className="text-lg text-muted-foreground">Yakında</span>
        </div>
      </div>
    </section>
  );
}
