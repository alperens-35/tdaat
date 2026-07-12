import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, User, Clock, ArrowRight, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Database } from "@/integrations/supabase/types";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export const Route = createFileRoute("/blog")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://tdaat-seven.vercel.app/blog" }],
    meta: [
      { title: "Blog & Yayınlar — TDAAT" },
      {
        name: "description",
        content: "Türk Dünyası Akademik Araştırmalar Topluluğu blog yazıları, akademik makaleler ve incelemeler.",
      },
      { property: "og:title", content: "Blog — TDAAT" },
      { property: "og:url", content: "https://tdaat-seven.vercel.app/blog" },
    ],
  }),
  component: BlogPage,
});

function BlogList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Hepsi");

  // Supabase'den dinamik olarak tüm blogları çekiyoruz
  const { data: posts = [] } = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogPostRow[];
    },
    staleTime: 0,
  });

  const categories = useMemo(
    () => ["Hepsi", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = category === "Hepsi" || p.category === category;
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, category, posts]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Blog & Akademik Yazılar
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-left">
            Türk Dünyası üzerine akademik incelemeler, topluluk duyuruları ve kültürel makaleler.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filtreleme ve Arama */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-8">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Yazılarda ara..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">Henüz bir yazı bulunmuyor.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-accent/40">
                  {post.cover_url ? (
                    <img
                      src={post.cover_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.date_label}</span>
                  </div>
                  <h3 className="mt-3 font-[var(--font-heading)] text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {post.reading_time}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function BlogPage() {
  const router = useRouter();
  const isIndex = router.state.location.pathname === "/blog";
  return <div className="flex flex-col">{isIndex ? <BlogList /> : <Outlet />}</div>;
}