import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "İletişim — TDAAT" },
      {
        name: "description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu ile iletişime geçin. Sorularınız, önerileriniz ve işbirliği teklifleriniz için buradayız.",
      },
      {
        property: "og:title",
        content: "İletişim — TDAAT",
      },
      {
        property: "og:description",
        content:
          "Türk Dünyası Akademik Araştırmalar Topluluğu ile iletişime geçin. Sorularınız, önerileriniz ve işbirliği teklifleriniz için buradayız.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            İletişim
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Soruların, önerilerin veya işbirliği tekliflerin mi var? Bize ulaş,
            en kısa sürede dönüş yapalım.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="w-full border-y border-border/50 bg-accent/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-foreground">
                Bize Ulaşın
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Etkinlik önerileri, sponsorluk talepleri, topluluk üyeliği veya
                herhangi bir konuda bize yazabilirsin.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-sm font-semibold text-foreground">
                      E-posta
                    </h3>
                    <p className="text-sm text-muted-foreground">hello@tdaat.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-heading)] text-sm font-semibold text-foreground">
                      Lokasyon
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      İzmir, Türkiye
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-border/60 bg-background p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                  <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-foreground">
                    Mesajın Gönderildi!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    En kısa sürede sana dönüş yapacağız.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input id="name" placeholder="Adın ve soyadın" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input id="subject" placeholder="Mesajının konusu" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea
                      id="message"
                      placeholder="Mesajını buraya yaz..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full font-[var(--font-heading)]">
                    <Send className="mr-2 h-4 w-4" />
                    Gönder
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
