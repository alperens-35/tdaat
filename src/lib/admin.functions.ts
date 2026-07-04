import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// Any-typed helpers to bypass strict generic inference on the middleware context.
// The runtime types are enforced by RLS + zod validators below.
type Ctx = { supabase: any; userId: string };

async function isAdmin(ctx: Ctx): Promise<boolean> {
  const { data } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

async function assertAdmin(ctx: Ctx) {
  if (!(await isAdmin(ctx))) throw new Error("Forbidden: admin only");
}

export const getIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => ({ isAdmin: await isAdmin(context as unknown as Ctx) }));

// ============ EVENTS ============
const eventInput = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  date_label: z.string().min(1).max(100),
  time_label: z.string().max(100).default("—"),
  location: z.string().min(1).max(300),
  category: z.string().min(1).max(80),
  description: z.string().min(1).max(1000),
  long_description: z.string().min(1).max(10000),
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  image_url: z.string().nullable().optional(),
  is_upcoming: z.boolean().default(false),
});

export const upsertEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id?: string; values: z.input<typeof eventInput> }) => ({
    id: d.id,
    values: eventInput.parse(d.values),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    if (data.id) {
      const { error } = await context.supabase
        .from("events")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("events")
      .insert({ ...data.values, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id };
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: z.string().uuid().parse(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { error } = await context.supabase.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============ BLOG ============
const blogInput = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  excerpt: z.string().min(1).max(500),
  date_label: z.string().min(1).max(100),
  author: z.string().min(1).max(150),
  reading_time: z.string().max(30).default("5 dk"),
  category: z.string().min(1).max(80),
  content: z.string().min(1).max(50000),
  cover_url: z.string().nullable().optional(),
});

export const upsertBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id?: string; values: z.input<typeof blogInput> }) => ({
    id: d.id,
    values: blogInput.parse(d.values),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    if (data.id) {
      const { error } = await context.supabase
        .from("blog_posts")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .insert({ ...data.values, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id };
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: z.string().uuid().parse(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============ NEWS ============
const newsInput = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  summary: z.string().min(1).max(1000),
  content: z.array(z.string().min(1).max(5000)).min(1).max(50),
  source: z.string().min(1).max(200),
  date_label: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  flag: z.string().min(1).max(20),
  category: z.string().min(1).max(50),
});

export const upsertNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id?: string; values: z.input<typeof newsInput> }) => ({
    id: d.id,
    values: newsInput.parse(d.values),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    if (data.id) {
      const { error } = await context.supabase
        .from("news_items")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("news_items")
      .insert({ ...data.values, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: z.string().uuid().parse(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { error } = await context.supabase.from("news_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============ GALLERY ============
const galleryInput = z.object({
  title: z.string().max(200).default(""),
  caption: z.string().max(500).default(""),
  image_url: z.string().min(1).max(2000),
  sort_order: z.number().int().default(0),
});

export const upsertGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id?: string; values: z.input<typeof galleryInput> }) => ({
    id: d.id,
    values: galleryInput.parse(d.values),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    if (data.id) {
      const { error } = await context.supabase
        .from("gallery_images")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("gallery_images")
      .insert({ ...data.values, created_by: context.userId })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id };
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => ({ id: z.string().uuid().parse(d.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { error } = await context.supabase.from("gallery_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============ MEMBERSHIPS ============
export const listMemberships = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { data, error } = await context.supabase
      .from("membership_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateMembershipStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: "pending" | "approved" | "rejected" }) => ({
    id: z.string().uuid().parse(d.id),
    status: z.enum(["pending", "approved", "rejected"]).parse(d.status),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase as SB, context.userId);
    const { error } = await context.supabase
      .from("membership_applications")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
