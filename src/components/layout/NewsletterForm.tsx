import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, lang: (typeof document !== "undefined" && document.documentElement.lang) || "tr" });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("Bu e-posta zaten kayıtlı 👌");
      } else {
        toast.error("Abonelik başarısız. Tekrar dene.");
      }
      return;
    }
    toast.success("Aboneliğin alındı! 🎉");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex gap-2">
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          required
          maxLength={200}
          placeholder="E-posta adresin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 pl-8 text-sm"
        />
      </div>
      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "..." : "Abone Ol"}
      </Button>
    </form>
  );
}
