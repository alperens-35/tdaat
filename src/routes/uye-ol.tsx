import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/uye-ol")({
  head: () => ({
    meta: [
      { title: "Üye Ol — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu'na katılmak için başvuru formu.",
      },
      { property: "og:title", content: "Üye Ol — TDAAT" },
      {
        property: "og:description",
        content: "Topluluğumuza katılmak için kısa başvuru formunu doldur.",
      },
      { property: "og:url", content: "https://tdaat.lovable.app/uye-ol" },
    ],
    links: [{ rel: "canonical", href: "https://tdaat.lovable.app/uye-ol" }],
  }),
  component: JoinPage,
});

function JoinPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    const { error } = await supabase.from("membership_applications").insert({
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || null,
      faculty: String(fd.get("faculty") || "") || null,
      department: String(fd.get("department") || "") || null,
      year: String(fd.get("year") || "") || null,
      motivation: String(fd.get("motivation") || "") || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Başvuru gönderilemedi. Lütfen tekrar dene.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-6 font-[var(--font-heading)] text-3xl font-bold">Başvurun alındı!</h1>
        <p className="mt-3 text-muted-foreground">
          En kısa sürede e-posta ile dönüş yapacağız. Bu arada Instagram'ımızı takip edebilirsin.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Anasayfaya Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-left">
        Üye Ol
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Topluluğumuza katılmak çok kolay. Aşağıdaki formu doldur, sana e-posta ile dönüş yapalım.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="full_name">Ad Soyad *</Label>
          <Input id="full_name" name="full_name" required maxLength={120} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta *</Label>
            <Input id="email" name="email" type="email" required maxLength={200} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" name="phone" type="tel" maxLength={30} />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="faculty">Fakülte</Label>
            <Input id="faculty" name="faculty" maxLength={120} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Bölüm</Label>
            <Input id="department" name="department" maxLength={120} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Sınıf</Label>
          <Input id="year" name="year" placeholder="örn. 2. sınıf" maxLength={30} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="motivation">Topluluğa neden katılmak istiyorsun?</Label>
          <Textarea id="motivation" name="motivation" rows={5} maxLength={1500} />
        </div>
        <Button type="submit" size="lg" disabled={submitting} className="font-[var(--font-heading)]">
          {submitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
        </Button>
      </form>
    </div>
  );
}
