import { useState } from "react";
import { z } from "zod";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "İsim en az 2 karakter olmalı").max(100),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

type Props = {
  eventSlug: string;
  eventTitle: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary";
  triggerSize?: "default" | "sm" | "lg";
  triggerClassName?: string;
  fullWidth?: boolean;
};

export function EventRegistrationDialog({
  eventSlug,
  eventTitle,
  triggerLabel = "Kayıt Ol",
  triggerVariant = "default",
  triggerSize = "sm",
  triggerClassName,
  fullWidth = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", notes: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Form geçersiz");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("event_registrations").insert({
      event_slug: eventSlug,
      event_title: eventTitle,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }
    toast.success("Kaydın alındı! Etkinlikte görüşmek üzere.");
    setForm({ full_name: "", email: "", phone: "", notes: "" });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={`${fullWidth ? "w-full" : ""} font-[var(--font-heading)] ${triggerClassName ?? ""}`}
        >
          <UserPlus className="mr-1.5 h-3.5 w-3.5" /> {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[var(--font-heading)]">Etkinliğe Kayıt</DialogTitle>
          <DialogDescription>{eventTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reg-name">Ad Soyad *</Label>
            <Input
              id="reg-name"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
              maxLength={100}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-email">E-posta *</Label>
            <Input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              maxLength={255}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-phone">Telefon (opsiyonel)</Label>
            <Input
              id="reg-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={30}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-notes">Notun (opsiyonel)</Label>
            <Textarea
              id="reg-notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              maxLength={500}
              rows={3}
              placeholder="Bilmemizi istediğin bir şey..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full font-[var(--font-heading)]">
              {loading ? "Gönderiliyor..." : "Kaydımı Tamamla"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
