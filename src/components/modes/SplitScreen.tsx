import { useState, useEffect } from "react";
import type { Lang, MenuData, ThemeName } from "@/types";
import { themes } from "@/constants";
import { FEATURED } from "@/data/featured";
import { formatPrice, getItemName } from "@/lib";
import { MenuItemCard } from "@/components/MenuItemCard";

interface SplitScreenProps {
  data: MenuData;
  theme: ThemeName;
  lang: Lang;
}

const QR_FILLED = [0, 1, 2, 4, 5, 6, 10, 14, 18, 19, 20, 22, 23, 24, 3, 8, 12, 16];

export function SplitScreen({ data, theme, lang }: SplitScreenProps) {
  const t = themes[theme];
  const cats = data.food.categories;
  const [promoIdx, setPromoIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setPromoIdx((p) => (p + 1) % FEATURED.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const promo = FEATURED[promoIdx];
  let idx = 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% - 100px)", gap: 0 }}>
      <div style={{ padding: "24px 32px", overflow: "hidden" }}>
        {cats.map((cat) => (
          <div key={cat.name} style={{ marginBottom: 28 }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: t.text,
                marginBottom: 12,
              }}
            >
              {cat.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} theme={theme} lang={lang} layout="list" animDelay={idx++ * 50} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          borderLeft: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          background: t.gradientSubtle,
          textAlign: "center",
        }}
      >
        <div key={promoIdx} style={{ animation: "fadeIn 0.5s ease both" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: t.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {promo.featured}
          </span>
          <div style={{ fontSize: 96, margin: "20px 0", animation: "float 3s ease-in-out infinite" }}>{promo.img}</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 38,
              fontWeight: 900,
              color: t.text,
              marginBottom: 10,
            }}
          >
            {getItemName(promo, lang)}
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: t.textMuted,
              marginBottom: 20,
            }}
          >
            {promo.desc}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
            {promo.oldPrice && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 22,
                  color: t.textMuted,
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(promo.oldPrice)}
              </span>
            )}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 36,
                fontWeight: 700,
                color: promo.oldPrice ? t.sold : t.accent,
              }}
            >
              {formatPrice(promo.price)}
            </span>
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 20,
              borderRadius: 16,
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                background: "#fff",
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                gridTemplateRows: "repeat(5,1fr)",
                gap: 2,
                padding: 6,
              }}
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: QR_FILLED.includes(i) ? "#000" : "#fff",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: t.textMuted }}>
              Scan om te bestellen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
