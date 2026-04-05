import { useState, useEffect } from "react";
import type { Lang, MenuData, ThemeName } from "@/types";
import { themes } from "@/constants";
import { MenuItemCard } from "@/components/MenuItemCard";

interface CarouselProps {
  data: MenuData;
  theme: ThemeName;
  lang: Lang;
}

export function Carousel({ data, theme, lang }: CarouselProps) {
  const t = themes[theme];
  const allCats = Object.values(data).flatMap((sec) => sec.categories);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive((p) => (p + 1) % allCats.length), 8000);
    return () => clearInterval(iv);
  }, [allCats.length]);

  const cat = allCats[active];

  const columns = Math.min(cat.items.length, cat.items.length <= 3 ? 3 : cat.items.length <= 5 ? 5 : 4);

  return (
    <div style={{ padding: "16px 48px", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
        {allCats.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              border: "none",
              cursor: "pointer",
              background: "none",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: i === active ? 40 : 10,
                height: 10,
                borderRadius: 5,
                background: i === active ? t.gradient : `${t.text}22`,
                transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
              }}
            />
            {i === active && (
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: t.accent,
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {c.name}
              </span>
            )}
          </button>
        ))}
      </div>

      <div key={active} style={{ flex: 1, animation: "scaleIn 0.5s ease both", overflow: "hidden" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 900,
            color: t.text,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {cat.name}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 16,
            maxWidth: 1600,
            margin: "0 auto",
          }}
        >
          {cat.items.map((item, i) => (
            <MenuItemCard key={item.id} item={item} theme={theme} lang={lang} animDelay={i * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}
