import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import { createLovableAiGatewayProvider, ARF_SYSTEM_PROMPT } from "@/lib/ai-gateway.server";

type ChatBody = { messages?: unknown; threadId?: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response("Unauthorized", { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);

        const { messages, threadId } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages) || !threadId) {
          return new Response("Bad request", { status: 400 });
        }
        if (messages.length > 100) {
          return new Response("Too many messages", { status: 400 });
        }
        let totalChars = 0;
        for (const m of messages as UIMessage[]) {
          for (const p of m.parts ?? []) {
            if (p.type === "text") totalChars += (p.text ?? "").length;
            if (totalChars > 50000) {
              return new Response("Payload too large", { status: 413 });
            }
          }
        }

        const supabaseUrl = process.env.SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: claims } = await supabase.auth.getClaims(token);
        const userId = claims?.claims?.sub;
        if (!userId) return new Response("Unauthorized", { status: 401 });

        // Verify thread ownership
        const { data: thread } = await supabase
          .from("arf_threads")
          .select("id")
          .eq("id", threadId)
          .maybeSingle();
        if (!thread) return new Response("Thread not found", { status: 404 });

        // Persist the latest user message
        const lastMsg = (messages as UIMessage[])[messages.length - 1];
        if (lastMsg?.role === "user") {
          await supabase.from("arf_messages").insert({
            thread_id: threadId,
            user_id: userId,
            role: "user",
            message: lastMsg,
          });
          // Update thread timestamp + auto-title if still default
          const firstText = lastMsg.parts
            ?.map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim()
            .slice(0, 60);
          await supabase
            .from("arf_threads")
            .update({
              updated_at: new Date().toISOString(),
              ...(firstText ? { title: firstText } : {}),
            })
            .eq("id", threadId);
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(apiKey);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: ARF_SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onFinish: async ({ messages: finalMessages }) => {
            const assistantMsg = finalMessages[finalMessages.length - 1];
            if (assistantMsg?.role === "assistant") {
              await supabase.from("arf_messages").insert({
                thread_id: threadId,
                user_id: userId,
                role: "assistant",
                message: assistantMsg,
              });
            }
          },
        });
      },
    },
  },
});
