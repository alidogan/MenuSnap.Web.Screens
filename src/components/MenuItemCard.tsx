import type { Lang, MenuItem, ThemeName } from "@/types";
import { themes } from "@/constants";
import { formatPrice, getItemName } from "@/lib";

interface MenuItemCardProps {
  item: MenuItem;
  theme: ThemeName;
  lang: Lang;
  layout?: "grid" | "list" | "compact";
  animDelay?: number;
}

export function MenuItemCard({ item, theme, lang, layout = "grid", animDelay = 0 }: MenuItemCardProps) {
  const t = themes[theme];
  const isUnavail = !item.available;
  const hasDeal = item.oldPrice != null;

  if (layout === "compact") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          padding: "5px 0",
          opacity: isUnavail ? 0.35 : 1,
          animation: `fadeIn 0.4s ease both`,
          animationDelay: `${animDelay}ms`,
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, filter: isUnavail ? "grayscale(1)" : "none", alignSelf: "center" }}>
          {item.img}
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14,
            fontWeight: 600,
            color: t.text,
            textDecoration: isUnavail ? "line-through" : "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {getItemName(item, lang)}
        </span>
        {item.popular && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 5px",
              borderRadius: 20,
              background: `${t.popular}22`,
              color: t.popular,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
            ★
          </span>
        )}
        {hasDeal && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 5px",
              borderRadius: 20,
              background: `${t.sold}22`,
              color: t.sold,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "center",
            }}
          >
            DEAL
          </span>
        )}
        <span
          style={{
            flex: 1,
            borderBottom: `1px dotted ${t.border}`,
            minWidth: 20,
            alignSelf: "center",
            marginBottom: 2,
          }}
        />
        {hasDeal && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: t.textMuted,
              textDecoration: "line-through",
              flexShrink: 0,
            }}
          >
            {formatPrice(item.oldPrice!)}
          </span>
        )}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: hasDeal ? t.sold : t.accent,
            flexShrink: 0,
          }}
        >
          {isUnavail ? "Uitverkocht" : formatPrice(item.price)}
        </span>
      </div>
    );
  }

  const isGrid = layout === "grid";

  return (
    <div
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: isGrid ? "20px" : "14px 20px",
        display: "flex",
        flexDirection: isGrid ? "column" : "row",
        alignItems: isGrid ? "flex-start" : "center",
        gap: isGrid ? 10 : 16,
        position: "relative",
        opacity: isUnavail ? 0.35 : 1,
        animation: `fadeInUp 0.5s ease both`,
        animationDelay: `${animDelay}ms`,
        transition: "background 0.3s, transform 0.3s",
        overflow: "hidden",
      }}
    >
      {isGrid && hasDeal && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: t.gradient,
            borderRadius: "16px 16px 0 0",
          }}
        />
      )}

      <div
        style={{
          fontSize: isGrid ? 44 : 32,
          lineHeight: 1,
          filter: isUnavail ? "grayscale(1)" : "none",
          ...(isGrid ? {} : { flexShrink: 0 }),
        }}
      >
        {item.img}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isGrid ? 17 : 16,
              fontWeight: 700,
              color: t.text,
              textDecoration: isUnavail ? "line-through" : "none",
              lineHeight: 1.3,
            }}
          >
            {getItemName(item, lang)}
          </span>
          {item.popular && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 20,
                background: `${t.popular}22`,
                color: t.popular,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                animation: "pulse 2s infinite",
              }}
            >
              ★ Popular
            </span>
          )}
          {hasDeal && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 20,
                background: `${t.sold}22`,
                color: t.sold,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              DEAL
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: t.textMuted,
            lineHeight: 1.4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: isGrid ? "normal" : "nowrap",
          }}
        >
          {item.desc}
        </p>
        {item.tags?.filter((tg) => tg !== "deal").length > 0 && (
          <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
            {item.tags
              .filter((tg) => tg !== "deal")
              .map((tg) => (
                <span
                  key={tg}
                  style={{
                    fontSize: 10,
                    padding: "2px 7px",
                    borderRadius: 6,
                    background: t.tagBg,
                    color: t.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {tg}
                </span>
              ))}
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: isGrid ? "left" : "right",
          flexShrink: 0,
          ...(isGrid ? { width: "100%", display: "flex", alignItems: "center", gap: 8, marginTop: 4 } : {}),
        }}
      >
        {hasDeal && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: t.textMuted,
              textDecoration: "line-through",
            }}
          >
            {formatPrice(item.oldPrice!)}
          </span>
        )}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isGrid ? 20 : 18,
            fontWeight: 700,
            color: hasDeal ? t.sold : t.accent,
            letterSpacing: "-0.02em",
          }}
        >
          {isUnavail ? "Uitverkocht" : formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
}
