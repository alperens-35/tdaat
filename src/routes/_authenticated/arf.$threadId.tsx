import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import {
  createArfThread,
  deleteArfThread,
  getArfThreadMessages,
  listArfThreads,
} from "@/lib/arf.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Plus, Trash2, LogOut, Menu, X } from "lucide-react";
import arfAvatar from "@/assets/arf-avatar.png";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/arf/$threadId")({
  head: () => ({
    meta: [
      { title: "Arf — Sohbet | TDAAT" },
      { name: "description", content: "Arf, TDAAT'ın yapay zeka sohbet asistanı." },
    ],
  }),
  loader: async ({ params }) => {
    const { messagesJson } = await getArfThreadMessages({ data: { threadId: params.threadId } });
    return { initialMessages: JSON.parse(messagesJson) as UIMessage[] };
  },
  component: ArfChatPage,
});

function ArfChatPage() {
  const { threadId } = Route.useParams();
  const { initialMessages } = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const createThread = useServerFn(createArfThread);
  const deleteThread = useServerFn(deleteArfThread);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setToken(data.session?.access_token ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setToken(session?.access_token ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const { data: threads = [] } = useQuery({
    queryKey: ["arf-threads"],
    queryFn: () => listArfThreads(),
  });

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: () => (token ? { Authorization: `Bearer ${token}` } : {}),
        body: { threadId },
      }),
    [token, threadId],
  );

  const { messages, sendMessage, status } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (err) => toast.error(err.message || "Bir hata oldu"),
    onFinish: () => {
      queryClient.invalidateQueries({ queryKey: ["arf-threads"] });
    },
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  const handleNewThread = async () => {
    const t = await createThread({});
    queryClient.invalidateQueries({ queryKey: ["arf-threads"] });
    navigate({ to: "/arf/$threadId", params: { threadId: t.id } });
    setSidebarOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteThread({ data: { threadId: id } });
    queryClient.invalidateQueries({ queryKey: ["arf-threads"] });
    if (id === threadId) navigate({ to: "/arf" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} absolute z-20 flex h-full w-72 flex-col border-r border-border/60 bg-card transition-transform md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-border/60 p-4">
          <div className="flex items-center gap-2">
            <img src={arfAvatar} alt="Arf" width={28} height={28} className="h-7 w-7" />
            <span className="font-[var(--font-heading)] font-semibold">Arf</span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Kapat">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <Button onClick={handleNewThread} className="w-full" size="sm">
            <Plus className="h-4 w-4" /> Yeni sohbet
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-2">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm ${t.id === threadId ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
            >
              <button
                className="flex-1 truncate text-left"
                onClick={() => {
                  navigate({ to: "/arf/$threadId", params: { threadId: t.id } });
                  setSidebarOpen(false);
                }}
              >
                {t.title}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(t.id);
                }}
                className="opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Sil"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </nav>
        <div className="border-t border-border/60 p-3">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Çıkış yap
          </Button>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2 md:hidden">
          <button onClick={() => setSidebarOpen(true)} aria-label="Menü">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-medium">Arf</span>
        </div>

        <Conversation className="flex-1">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <img src={arfAvatar} alt="Arf" width={64} height={64} className="h-16 w-16" />
                <h2 className="font-[var(--font-heading)] text-xl font-semibold">
                  Merhaba, ben Arf
                </h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Türk dünyası, kültürümüz veya TDAAT etkinlikleri hakkında bana sorabilirsin.
                </p>
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              return (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{text}</p>
                    )}
                  </MessageContent>
                </Message>
              );
            })}
            {status === "submitted" && (
              <div className="px-4 py-2">
                <Shimmer>Arf düşünüyor...</Shimmer>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border/60 p-4">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Arf'a bir şey sor..."
              autoFocus
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!input.trim() || isLoading} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
