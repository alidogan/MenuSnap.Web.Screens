import { useState, useEffect } from "react";
import type { Lang, ThemeName } from "@/types";
import { themes } from "@/constants";
import { FEATURED } from "@/data/featured";
import { formatPrice, getItemName } from "@/lib";

interface FeaturedItemsProps {
  theme: ThemeName;
  lang: Lang;
}

export function FeaturedItems({ theme, lang }: FeaturedItemsProps) {
  const t = themes[theme];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive((p) => (p + 1) % FEATURED.length), 6000);
    return () => clearInterval(iv);
  }, []);

  const item = FEATURED[active];

  return (
    <div
      style={{
        padding: "40px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100% - 140px)",
        textAlign: "center",
      }}
    >
      <div key={active} style={{ animation: "scaleIn 0.6s ease both", maxWidth: 700 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            color: t.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
            background: t.tagBg,
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: 30,
          }}
        >
          {item.featured}
        </div>
        <div style={{ fontSize: 100, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>{item.img}</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 56,
            fontWeight: 900,
            color: t.text,
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          {getItemName(item, lang)}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 20,
            color: t.textMuted,
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {item.desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          {item.oldPrice && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                color: t.textMuted,
                textDecoration: "line-through",
              }}
            >
              {formatPrice(item.oldPrice)}
            </span>
          )}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 48,
              fontWeight: 700,
              color: item.oldPrice ? t.sold : t.accent,
            }}
          >
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
        {FEATURED.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              border: `2px solid ${i === active ? t.accent : t.border}`,
              background: i === active ? t.accentGlow : t.bgCard,
              cursor: "pointer",
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              transform: i === active ? "scale(1.1)" : "scale(1)",
            }}
          >
            {f.img}
          </button>
        ))}
      </div>
    </div>
  );
}
