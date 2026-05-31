import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

// Sarah – warm, natural multilingual voice that works well in Turkish.
const DEFAULT_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

type TtsBody = { text?: unknown; voiceId?: unknown };

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response("Unauthorized", { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length);

        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          {
            global: { headers: { Authorization: `Bearer ${token}` } },
            auth: { persistSession: false, autoRefreshToken: false },
          },
        );
        const { data: claims } = await supabase.auth.getClaims(token);
        if (!claims?.claims?.sub) {
          return new Response("Unauthorized", { status: 401 });
        }

        const body = (await request.json().catch(() => ({}))) as TtsBody;
        const text = typeof body.text === "string" ? body.text.trim() : "";
        const rawVoiceId =
          typeof body.voiceId === "string" && body.voiceId.trim()
            ? body.voiceId.trim()
            : DEFAULT_VOICE_ID;
        // Strict allowlist format: ElevenLabs voice IDs are ~20 alphanumeric chars.
        const voiceId = /^[A-Za-z0-9]{10,30}$/.test(rawVoiceId) ? rawVoiceId : DEFAULT_VOICE_ID;

        if (!text || text.length > 4000) {
          return new Response("Bad request", { status: 400 });
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
          return new Response("ELEVENLABS_API_KEY is not configured", { status: 500 });
        }

        const upstream = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.45,
                similarity_boost: 0.8,
                style: 0.3,
                use_speaker_boost: true,
              },
            }),
          },
        );

        if (!upstream.ok || !upstream.body) {
          const err = await upstream.text().catch(() => "");
          console.error("[tts] ElevenLabs upstream error:", upstream.status, err);
          const status = upstream.status === 429 ? 429 : 502;
          const message =
            status === 429 ? "TTS rate limited" : "TTS service unavailable";
          return new Response(message, { status });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
