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
        if (!Array.isArray(messages) || messages.length === 0 || !threadId) {
          return new Response("Bad request", { status: 400 });
        }
        // Only accept the latest user message from the client; ignore any
        // client-supplied history to prevent prompt injection via fake
        // system/assistant messages.
        const lastMsg = (messages as UIMessage[])[messages.length - 1];
        if (!lastMsg || lastMsg.role !== "user") {
          return new Response("Bad request", { status: 400 });
        }
        let userChars = 0;
        for (const p of lastMsg.parts ?? []) {
          if (p.type === "text") userChars += (p.text ?? "").length;
        }
        if (userChars === 0 || userChars > 10000) {
          return new Response("Bad request", { status: 400 });
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

        // Load canonical history from DB (server-trusted)
        const { data: historyRows } = await supabase
          .from("arf_messages")
          .select("role, message, created_at")
          .eq("thread_id", threadId)
          .order("created_at", { ascending: true })
          .limit(100);
        const history: UIMessage[] = (historyRows ?? [])
          .map((r) => r.message as UIMessage)
          .filter((m) => m && (m.role === "user" || m.role === "assistant"));

        // Persist the latest user message
        await supabase.from("arf_messages").insert({
          thread_id: threadId,
          user_id: userId,
          role: "user",
          message: lastMsg,
        });
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

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          console.error("[chat] LOVABLE_API_KEY missing");
          return new Response("Service unavailable", { status: 503 });
        }

        const gateway = createLovableAiGatewayProvider(apiKey);
        const model = gateway("google/gemini-3-flash-preview");

        const modelMessages: UIMessage[] = [...history, lastMsg];

        const result = streamText({
          model,
          system: ARF_SYSTEM_PROMPT,
          messages: await convertToModelMessages(modelMessages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: modelMessages,
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
