import {
  Sprout,
  Tent,
  Feather,
  Music2,
  Frame,
  Trophy,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  nawruz: Sprout,
  "bozkir-kulturu": Tent,
  "hat-sanati": Feather,
  "asiklik-gelenegi": Music2,
  "carpet-weaving": Frame,
  buzkashi: Trophy,
};

interface CultureIconProps {
  id: string;
  size?: "sm" | "lg";
  className?: string;
}

export function CultureIcon({ id, size = "sm", className = "" }: CultureIconProps) {
  const Icon = iconMap[id] ?? Sparkles;
  const tile =
    size === "lg"
      ? "h-14 w-14 rounded-2xl"
      : "h-11 w-11 rounded-xl";
  const inner = size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <span
      className={`inline-flex items-center justify-center ${tile} bg-primary/10 ring-1 ring-primary/15 text-primary ${className}`}
      aria-hidden="true"
    >
      <Icon className={inner} strokeWidth={1.75} />
    </span>
  );
}
