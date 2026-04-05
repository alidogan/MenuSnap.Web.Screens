import type { ThemeName } from "@/types";
import { themes } from "@/constants";

interface TickerProps {
  theme: ThemeName;
}

export function Ticker({ theme }: TickerProps) {
  const t = themes[theme];

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        background: t.accentGlow,
        borderBottom: `1px solid ${t.border}`,
        overflow: "hidden",
        height: 36,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 30s linear infinite",
        }}
      >
        {[0, 1].map((ri) => (
          <span key={ri} style={{ display: "flex", alignItems: "center", gap: 32, paddingRight: 32 }}>
            <span style={{ color: t.accent, fontWeight: 700, fontSize: 13 }}>
              🔥 Pasta Week — alle pasta's 15% korting!
            </span>
            <span style={{ color: t.textMuted, fontSize: 12 }}>•</span>
            <span style={{ color: t.text, fontSize: 13 }}>☀️ Warm weer? Probeer onze verse huislimonade!</span>
            <span style={{ color: t.textMuted, fontSize: 12 }}>•</span>
            <span style={{ color: t.accent, fontWeight: 700, fontSize: 13 }}>
              ⭐ Nieuw: Iced Matcha Latte nu beschikbaar
            </span>
            <span style={{ color: t.textMuted, fontSize: 12 }}>•</span>
            <span style={{ color: t.text, fontSize: 13 }}>📱 Scan de QR code om te bestellen via je telefoon</span>
            <span style={{ color: t.textMuted, fontSize: 12 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
