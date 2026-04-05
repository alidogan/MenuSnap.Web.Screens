import type { DisplayMode, ThemeName } from "@/types";
import { themes, MODES, THEME_LIST } from "@/constants";

interface ControlPanelProps {
  theme: ThemeName;
  mode: DisplayMode;
  showControls: boolean;
  onToggleControls: () => void;
  onSetMode: (mode: DisplayMode) => void;
  onSetTheme: (theme: ThemeName) => void;
}

export function ControlPanel({ theme, mode, showControls, onToggleControls, onSetMode, onSetTheme }: ControlPanelProps) {
  const t = themes[theme];

  return (
    <>
      <button
        onClick={onToggleControls}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          width: 48,
          height: 48,
          borderRadius: 14,
          background: t.gradient,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: "#fff",
          boxShadow: `0 4px 20px ${t.accentGlow}`,
          transition: "transform 0.3s",
          transform: showControls ? "rotate(45deg)" : "rotate(0)",
        }}
      >
        ⚙
      </button>

      {showControls && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            zIndex: 99,
            background: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(10,10,15,0.95)",
            backdropFilter: "blur(24px)",
            border: `1px solid ${t.border}`,
            borderRadius: 20,
            padding: 24,
            width: 320,
            animation: "scaleIn 0.3s ease both",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              fontWeight: 700,
              color: t.text,
              marginBottom: 18,
            }}
          >
            📺 TV Configuratie
          </h3>

          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
                display: "block",
              }}
            >
              Display Mode
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSetMode(m.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: mode === m.id ? t.accentGlow : "transparent",
                    border: `1px solid ${mode === m.id ? t.accent + "44" : "transparent"}`,
                    color: mode === m.id ? t.accent : t.text,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
                display: "block",
              }}
            >
              Thema
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {THEME_LIST.map((th) => (
                <button
                  key={th.id}
                  onClick={() => onSetTheme(th.id)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    background: theme === th.id ? t.accentGlow : t.bgCard,
                    border: `1px solid ${theme === th.id ? t.accent + "44" : t.border}`,
                    color: theme === th.id ? t.accent : t.text,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span>{th.icon}</span>
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: "12px 16px",
              borderRadius: 12,
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: t.textMuted,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                TV Code
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  color: t.accent,
                  letterSpacing: "0.1em",
                }}
              >
                ABC-1234
              </div>
            </div>
            <div style={{ fontSize: 10, color: t.textMuted, textAlign: "right" }}>
              <div>tv.menusnap.com</div>
              <div style={{ color: t.success, fontWeight: 600 }}>● Online</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
