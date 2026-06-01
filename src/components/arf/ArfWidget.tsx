import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { X, Send, Maximize2, Mic, Volume2, VolumeX, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createArfThread } from "@/lib/arf.functions";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import arfAvatar from "@/assets/arf-avatar.png";
import { toast } from "sonner";

const STORAGE_KEY = "arf-widget-thread-id";

export function ArfWidget() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hide on the dedicated chat page and auth page
  const hidden =
    location.pathname.startsWith("/arf") || location.pathname.startsWith("/auth");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null);
      setUserId(data.session?.user.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setToken(session?.access_token ?? null);
      setUserId(session?.user.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Load or create thread once when widget is opened & user is logged in
  useEffect(() => {
    if (!open || !userId || threadId) return;
    const key = `${STORAGE_KEY}:${userId}`;
    const existing = typeof window !== "undefined" ? localStorage.getItem(key) : null;

    const createNew = () =>
      createArfThread({})
        .then((t) => {
          localStorage.setItem(key, t.id);
          setThreadId(t.id);
        })
        .catch((e) => toast.error(e.message || "Sohbet başlatılamadı"));

    if (existing) {
      // Verify the stored thread still exists (it may have been deleted)
      supabase
        .from("arf_threads")
        .select("id")
        .eq("id", existing)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.id) {
            setThreadId(data.id);
          } else {
            localStorage.removeItem(key);
            createNew();
          }
        });
      return;
    }
    createNew();
  }, [open, userId, threadId]);

  const transport = useMemo(
    () =>
      threadId
        ? new DefaultChatTransport({
            api: "/api/chat",
            headers: () =>
              token ? { Authorization: `Bearer ${token}` } : ({} as Record<string, string>),
            body: { threadId },
          })
        : undefined,
    [token, threadId],
  );

  const { messages, sendMessage, status } = useChat({
    id: threadId ?? "arf-widget-pending",
    messages: [] as UIMessage[],
    transport,
    onError: (err) => {
      const msg = err.message || "";
      if (msg.includes("Thread not found") || msg.includes("404")) {
        if (userId) localStorage.removeItem(`${STORAGE_KEY}:${userId}`);
        setThreadId(null);
        toast.error("Sohbet sıfırlandı, lütfen tekrar dene.");
        return;
      }
      toast.error(msg || "Bir hata oldu");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const voice = useVoiceChat();
  const lastSpokenIdRef = useRef<string | null>(null);

  // Auto-speak new assistant messages once streaming finishes
  useEffect(() => {
    if (!voice.voiceEnabled) return;
    if (status !== "ready") return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    if (lastSpokenIdRef.current === last.id) return;
    lastSpokenIdRef.current = last.id;
    const text = last.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
    if (text.trim()) void voice.speak(text);
  }, [messages, status, voice]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading || !threadId) return;
    setInput("");
    await sendMessage({ text });
  };

  const handleMicDown = () => {
    if (!voice.sttSupported || isLoading || !threadId) return;
    voice.stopSpeaking();
    voice.startRecording((finalText) => {
      if (!finalText) return;
      void sendMessage({ text: finalText });
    });
  };
  const handleMicUp = () => {
    if (voice.isRecording) voice.stopRecording();
  };

  if (hidden) return null;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Arf'a sor — sesli ya da yazılı"
          title="Arf'a sor — sesli ya da yazılı"
          className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/30 transition-transform hover:scale-105"
        >
          <img src={arfAvatar} alt="" className="h-10 w-10 rounded-full" />
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background text-primary ring-2 ring-primary">
            <Mic className="h-3 w-3" />
          </span>
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
            Arf'a sor — sesli de konuşabilirsin
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[70vh] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={arfAvatar} alt="Arf" className="h-8 w-8 rounded-full" />
              <div>
                <div className="font-[var(--font-heading)] text-sm font-semibold">Arf</div>
                <div className="text-xs text-muted-foreground">TDAAT yapay zekası</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (voice.voiceEnabled) voice.stopSpeaking();
                  voice.setVoiceEnabled(!voice.voiceEnabled);
                }}
                aria-label={voice.voiceEnabled ? "Sesli yanıtı kapat" : "Sesli yanıtı aç"}
                title={voice.voiceEnabled ? "Sesli yanıtı kapat" : "Sesli yanıtı aç"}
                className={`rounded-md p-1.5 hover:bg-accent hover:text-accent-foreground ${voice.voiceEnabled ? "text-primary" : "text-muted-foreground"}`}
              >
                {voice.voiceEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate({ to: "/arf" });
                }}
                aria-label="Tam sayfada aç"
                title="Tam sayfada aç"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!userId ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <img src={arfAvatar} alt="Arf" className="h-14 w-14 rounded-full" />
              <p className="text-sm text-muted-foreground">
                Arf'la sohbet etmek için giriş yapman gerekiyor.
              </p>
              <Button size="sm" onClick={() => navigate({ to: "/auth" })}>
                Giriş yap
              </Button>
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-2 text-center">
                    <img src={arfAvatar} alt="Arf" className="h-12 w-12 rounded-full" />
                    <p className="text-sm font-medium">Merhaba, ben ARF 👋</p>
                    <div className="space-y-2 px-2 text-xs text-muted-foreground">
                      <p>
                        TDAAT'nin yapay zekâ asistanıyım. Adım, Ord. Prof. Dr. Cahit Arf'ın
                        1958'de Atatürk Üniversitesi'nde verdiği
                        <em> "Makine Düşünebilir mi ve Nasıl Düşünebilir?" </em>
                        konferansından dolayı kendisine ithafen verildi.
                      </p>
                      <p>Türk dünyası, kültürümüz veya TDAAT hakkında bana sorabilirsiniz.</p>
                    </div>
                  </div>
                )}
                {messages.map((m) => {
                  const text = m.parts
                    .map((p) => (p.type === "text" ? p.text : ""))
                    .join("");
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{text}</p>
                        ) : (
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <ReactMarkdown>{text}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {status === "submitted" && (
                  <div className="px-1">
                    <Shimmer>Arf düşünüyor...</Shimmer>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 border-t border-border p-3"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder={voice.isRecording ? "Dinliyorum..." : "Arf'a bir şey sor..."}
                  rows={1}
                  className="max-h-32 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
                  autoFocus
                />
                {voice.isSpeaking ? (
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    onClick={voice.stopSpeaking}
                    aria-label="Sesi durdur"
                    title="Sesi durdur"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                ) : voice.sttSupported ? (
                  <Button
                    type="button"
                    size="icon-sm"
                    variant={voice.isRecording ? "destructive" : "secondary"}
                    onPointerDown={handleMicDown}
                    onPointerUp={handleMicUp}
                    onPointerLeave={handleMicUp}
                    onPointerCancel={handleMicUp}
                    disabled={isLoading || !threadId}
                    aria-label="Bas-konuş"
                    title="Bas-konuş"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                ) : null}
                <Button
                  type="submit"
                  size="icon-sm"
                  disabled={!input.trim() || isLoading || !threadId}
                  aria-label="Gönder"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
