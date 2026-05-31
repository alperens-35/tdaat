import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS, useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label={t("lang.label")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden text-xs font-medium uppercase sm:inline">{current.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className={l.code === lang ? "bg-accent" : ""}
          >
            <span className="mr-2 text-base leading-none">{l.flag}</span>
            <span className="flex-1">{l.native}</span>
            <span className="text-xs uppercase text-muted-foreground">{l.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
