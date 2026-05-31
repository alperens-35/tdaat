import React from "react";

interface FlagIconProps {
  country: string;
  className?: string;
}

/**
 * Flat, professional SVG flags for the Turkic world.
 * viewBox is 60x40 (3:2 ratio) for consistency.
 */
export const FlagIcon: React.FC<FlagIconProps> = ({ country, className = "" }) => {
  const wrapperClass = `inline-block overflow-hidden rounded-[2px] ring-1 ring-black/10 shadow-sm ${className}`;
  const style: React.CSSProperties = { width: 28, height: 18, display: "inline-block" };

  switch (country) {
    case "tr":
      // Türkiye: kırmızı zemin, ay-yıldız sola yakın
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="40" fill="#E30A17" />
          {/* Crescent: large white circle minus offset red circle */}
          <circle cx="22.5" cy="20" r="8" fill="#FFFFFF" />
          <circle cx="24.7" cy="20" r="6.4" fill="#E30A17" />
          {/* Five-pointed star */}
          <polygon
            fill="#FFFFFF"
            points="33.5,20 36.13,20.85 36.13,23.62 37.75,21.39 40.38,22.24 38.76,20 40.38,17.76 37.75,18.61 36.13,16.38 36.13,19.15"
          />
        </svg>
      );

    case "az":
      // Azerbaycan: mavi-kırmızı-yeşil yatay, beyaz ay-yıldız ortada
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="13.33" y="0" fill="#00B5E2" />
          <rect width="60" height="13.34" y="13.33" fill="#E4002B" />
          <rect width="60" height="13.33" y="26.67" fill="#00AF66" />
          <circle cx="28" cy="20" r="4.2" fill="#FFFFFF" />
          <circle cx="29.4" cy="20" r="3.4" fill="#E4002B" />
          <polygon
            fill="#FFFFFF"
            points="34.5,20 36.2,20.55 36.2,22.35 37.25,20.9 38.95,21.45 37.9,20 38.95,18.55 37.25,19.1 36.2,17.65 36.2,19.45"
          />
        </svg>
      );

    case "kz":
      // Kazakistan: açık mavi zemin, sarı güneş + uçan kartal
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="40" fill="#00AFCA" />
          {/* Sun rays - simplified ring of small triangles */}
          <g fill="#FEC50C">
            <circle cx="30" cy="18" r="5" />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 16;
              const x1 = 30 + Math.cos(a) * 6;
              const y1 = 18 + Math.sin(a) * 6;
              const x2 = 30 + Math.cos(a) * 9;
              const y2 = 18 + Math.sin(a) * 9;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FEC50C" strokeWidth="0.9" />;
            })}
          </g>
          {/* Stylized eagle silhouette */}
          <path
            d="M20 28 Q25 25 30 27 Q35 25 40 28 Q35 27 30 28 Q25 27 20 28 Z"
            fill="#FEC50C"
          />
        </svg>
      );

    case "kg":
      // Kırgızistan: kırmızı zemin, sarı güneş, ortada tunduk
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="40" fill="#E8112D" />
          {/* Sun with 40 simplified rays (using ring of lines) */}
          <g stroke="#FFEF00" strokeWidth="1">
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 20;
              const x1 = 30 + Math.cos(a) * 7;
              const y1 = 20 + Math.sin(a) * 7;
              const x2 = 30 + Math.cos(a) * 10.5;
              const y2 = 20 + Math.sin(a) * 10.5;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="30" cy="20" r="6.5" fill="#FFEF00" />
          {/* Tunduk: simplified crosshatch */}
          <g stroke="#E8112D" strokeWidth="0.8" fill="none">
            <circle cx="30" cy="20" r="3" />
            <line x1="27" y1="20" x2="33" y2="20" />
            <line x1="30" y1="17" x2="30" y2="23" />
            <line x1="28" y1="18" x2="32" y2="22" />
            <line x1="32" y1="18" x2="28" y2="22" />
          </g>
        </svg>
      );

    case "uz":
      // Özbekistan: turkuaz-beyaz-yeşil, ince kırmızı çizgiler, ay-yıldız
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="13.33" y="0" fill="#0099B5" />
          <rect width="60" height="13.34" y="13.33" fill="#FFFFFF" />
          <rect width="60" height="13.33" y="26.67" fill="#1EB53A" />
          <rect width="60" height="0.8" y="12.93" fill="#CE1126" />
          <rect width="60" height="0.8" y="26.27" fill="#CE1126" />
          {/* Crescent */}
          <circle cx="14" cy="6.6" r="3.4" fill="#FFFFFF" />
          <circle cx="15.4" cy="6.6" r="2.8" fill="#0099B5" />
          {/* Stars - simplified small dots */}
          <g fill="#FFFFFF">
            <circle cx="20" cy="5" r="0.7" />
            <circle cx="23" cy="5" r="0.7" />
            <circle cx="20" cy="8" r="0.7" />
            <circle cx="23" cy="8" r="0.7" />
            <circle cx="26" cy="8" r="0.7" />
          </g>
        </svg>
      );

    case "tm":
      // Türkmenistan: yeşil zemin, kırmızı şerit (sola yakın), ay-yıldız
      return (
        <svg viewBox="0 0 60 40" className={wrapperClass} style={style} preserveAspectRatio="xMidYMid slice">
          <rect width="60" height="40" fill="#00843D" />
          {/* Carpet stripe */}
          <rect x="6" width="6" height="40" fill="#CC0000" />
          <rect x="6" width="6" height="40" fill="url(#tmPattern)" opacity="0.6" />
          <defs>
            <pattern id="tmPattern" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#CC0000" />
              <path d="M0 3 L3 0 L6 3 L3 6 Z" fill="#FFFFFF" opacity="0.3" />
            </pattern>
          </defs>
          {/* Crescent */}
          <circle cx="32" cy="20" r="5" fill="#FFFFFF" />
          <circle cx="33.6" cy="20" r="4" fill="#00843D" />
          {/* Five small stars */}
          <g fill="#FFFFFF">
            <circle cx="40" cy="15" r="0.8" />
            <circle cx="43" cy="17.5" r="0.8" />
            <circle cx="43" cy="22.5" r="0.8" />
            <circle cx="40" cy="25" r="0.8" />
            <circle cx="37.5" cy="22" r="0.8" />
          </g>
        </svg>
      );

    default:
      return (
        <span className={className} role="img" aria-label={country}>
          {country}
        </span>
      );
  }
};
