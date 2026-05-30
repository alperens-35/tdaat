import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function logAndThrow(op: string, error: { message: string }): never {
  console.error(`[arf:${op}]`, error.message);
  throw new Error("İşlem gerçekleştirilemedi");
}

export const listArfThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("arf_threads")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    if (error) logAndThrow("listArfThreads", error);
    return data ?? [];
  });

export const createArfThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("arf_threads")
      .insert({ user_id: userId, title: "Yeni sohbet" })
      .select("id")
      .single();
    if (error) logAndThrow("createArfThread", error);
    return data;
  });

export const getArfThreadMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ threadId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: rows, error } = await supabase
      .from("arf_messages")
      .select("message")
      .eq("thread_id", data.threadId)
      .order("created_at", { ascending: true });
    if (error) logAndThrow("getArfThreadMessages", error);
    return { messagesJson: JSON.stringify((rows ?? []).map((r) => r.message)) };
  });

export const deleteArfThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ threadId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { error } = await supabase.from("arf_threads").delete().eq("id", data.threadId);
    if (error) logAndThrow("deleteArfThread", error);
    return { ok: true };
  });
