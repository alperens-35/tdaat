import React from "react";

interface FlagIconProps {
  country: string;
  className?: string;
}

const flagEmojis: Record<string, string> = {
  tr: "🇹🇷",
  az: "🇦🇿",
  kz: "🇰🇿",
  kg: "🇰🇬",
  uz: "🇺🇿",
  tm: "🇹🇲",
};

export const FlagIcon: React.FC<FlagIconProps> = ({ country, className = "" }) => {
  const emoji = flagEmojis[country] ?? country.toUpperCase();
  return (
    <span className={`text-base leading-none ${className}`} role="img" aria-label={country}>
      {emoji}
    </span>
  );
};
