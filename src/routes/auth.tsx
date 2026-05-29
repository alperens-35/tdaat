import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import arfAvatar from "@/assets/arf-avatar.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Giriş Yap | Arf — TDAAT" },
      { name: "description", content: "Arf ile sohbet etmek için giriş yap." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/arf", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/arf", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Hesap oluşturuldu, giriş yapılıyor...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bir hata oldu");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/arf",
    });
    if (result.error) {
      toast.error("Google ile giriş başarısız oldu");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <img src={arfAvatar} alt="Arf" width={64} height={64} className="h-16 w-16" />
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Arf ile tanış
        </h1>
        <p className="text-sm text-muted-foreground">
          Sohbet geçmişini saklamak için giriş yap.
        </p>
      </div>

      <div className="w-full rounded-xl border border-border/60 bg-card p-6">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={loading}
        >
          Google ile devam et
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">veya</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Parola</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {mode === "signup" ? "Hesap oluştur" : "Giriş yap"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {mode === "signup" ? "Zaten hesabın var mı? " : "Hesabın yok mu? "}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          >
            {mode === "signup" ? "Giriş yap" : "Hesap oluştur"}
          </button>
        </p>
      </div>

      <Link to="/" className="mt-6 text-xs text-muted-foreground hover:text-foreground">
        ← Ana sayfaya dön
      </Link>
    </div>
  );
}
