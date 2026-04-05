import type { Lang, MenuData, ThemeName } from "@/types";
import { themes } from "@/constants";
import { MenuItemCard } from "@/components/MenuItemCard";

interface FullOverviewProps {
  data: MenuData;
  theme: ThemeName;
  lang: Lang;
}

export function FullOverview({ data, theme, lang }: FullOverviewProps) {
  const t = themes[theme];
  const sections = Object.values(data);
  let idx = 0;

  return (
    <div
      style={{
        padding: "20px 40px",
        display: "grid",
        gridTemplateColumns: `repeat(${sections.length}, 1fr)`,
        gap: 40,
        height: "100%",
      }}
    >
      {sections.map((section) => (
        <div key={section.name} style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "fadeInUp 0.4s ease both",
            }}
          >
            <span style={{ fontSize: 24 }}>{section.icon}</span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 800,
                color: t.text,
              }}
            >
              {section.name}
            </h2>
            <span
              style={{
                flex: 1,
                height: 2,
                background: t.gradient,
                borderRadius: 2,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            {section.categories.map((cat) => (
              <div key={cat.name} style={{ animation: "fadeIn 0.5s ease both" }}>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.accent,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {cat.name}
                </h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {cat.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      theme={theme}
                      lang={lang}
                      layout="compact"
                      animDelay={idx++ * 30}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
