import type { Lang, ThemeName } from "@/types";
import { themes, LANGS } from "@/constants";
import { getTimeSlot } from "@/lib";

interface HeaderProps {
  theme: ThemeName;
  lang: Lang;
  autoLang: boolean;
  time: Date;
  onSetLang: (lang: Lang) => void;
  onToggleAutoLang: () => void;
}

export function Header({ theme, lang, autoLang, time, onSetLang, onToggleAutoLang }: HeaderProps) {
  const t = themes[theme];
  const slot = getTimeSlot();

  const timeStr = time.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });

  return (
    <header
      style={{
        position: "relative",
        zIndex: 10,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${t.border}`,
        backdropFilter: "blur(20px)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: t.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            boxShadow: `0 4px 20px ${t.accentGlow}`,
          }}
        >
          M
        </div>
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 800,
              lineHeight: 1.2,
              background: t.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MenuSnap
            {t.seasonal && <span style={{ WebkitTextFillColor: "initial", marginLeft: 6 }}>{t.seasonal}</span>}
          </h1>
          <span
            style={{
              fontSize: 11,
              color: t.textMuted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Digital Menu Board
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 18px",
            borderRadius: 30,
            background: `${slot.color}18`,
            border: `1px solid ${slot.color}33`,
          }}
        >
          <span style={{ fontSize: 18 }}>{slot.icon}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: slot.color }}>
            {slot.label}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 30,
            background: t.bgCard,
            border: `1px solid ${t.border}`,
          }}
        >
          <span style={{ fontSize: 18 }}>🌤</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              color: t.text,
            }}
          >
            22°C
          </span>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => onSetLang(l)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: `1px solid ${lang === l ? t.accent : t.border}`,
                background: lang === l ? t.accentGlow : "transparent",
                color: lang === l ? t.accent : t.textMuted,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={onToggleAutoLang}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${autoLang ? t.success : t.border}`,
              background: autoLang ? `${t.success}22` : "transparent",
              color: autoLang ? t.success : t.textMuted,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            title="Auto-rotate languages"
          >
            ⟳
          </button>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 26,
              fontWeight: 700,
              color: t.text,
              lineHeight: 1,
            }}
          >
            {timeStr}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: t.textMuted,
              textTransform: "capitalize",
            }}
          >
            {dateStr}
          </div>
        </div>
      </div>
    </header>
  );
}
