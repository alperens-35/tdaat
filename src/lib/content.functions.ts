import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function pub() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type BlogRow = Database["public"]["Tables"]["blog_posts"]["Row"];
export type NewsRow = Database["public"]["Tables"]["news_items"]["Row"];
export type GalleryRow = Database["public"]["Tables"]["gallery_images"]["Row"];

export const listEvents = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await pub()
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as EventRow[];
});

export const getEventBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { data: row } = await pub()
      .from("events")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    return (row ?? null) as EventRow | null;
  });

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await pub()
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogRow[];
});

export const getBlogBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { data: row } = await pub()
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    return (row ?? null) as BlogRow | null;
  });

export const listNews = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await pub()
    .from("news_items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as NewsRow[];
});

export const getNewsBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { data: row } = await pub()
      .from("news_items")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    return (row ?? null) as NewsRow | null;
  });

export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await pub()
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as GalleryRow[];
});
