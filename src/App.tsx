import { useState, useEffect } from "react";
import type { DisplayMode, Lang, ThemeName } from "@/types";
import { themes, LANGS } from "@/constants";
import { MENU_DATA } from "@/data/menu";
import { Header, Ticker, ControlPanel, FullOverview, Carousel, FeaturedItems, SplitScreen, OrderQueue } from "@/components";

export function App() {
  const [mode, setMode] = useState<DisplayMode>("overview");
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [lang, setLang] = useState<Lang>("NL");
  const [showControls, setShowControls] = useState(true);
  const [time, setTime] = useState(new Date());
  const [langIdx, setLangIdx] = useState(0);
  const [autoLang, setAutoLang] = useState(false);

  const t = themes[theme];

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!autoLang) return;
    const iv = setInterval(() => {
      setLangIdx((p) => (p + 1) % LANGS.length);
    }, 30000);
    return () => clearInterval(iv);
  }, [autoLang]);

  useEffect(() => {
    if (autoLang) setLang(LANGS[langIdx]);
  }, [langIdx, autoLang]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: t.gradientSubtle,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: t.accentGlow,
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      <Header
        theme={theme}
        lang={lang}
        autoLang={autoLang}
        time={time}
        onSetLang={(l) => {
          setAutoLang(false);
          setLang(l);
        }}
        onToggleAutoLang={() => setAutoLang(!autoLang)}
      />

      <Ticker theme={theme} />

      <main style={{ flex: 1, position: "relative", zIndex: 5, overflow: "hidden" }}>
        {mode === "overview" && <FullOverview data={MENU_DATA} theme={theme} lang={lang} />}
        {mode === "carousel" && <Carousel data={MENU_DATA} theme={theme} lang={lang} />}
        {mode === "featured" && <FeaturedItems theme={theme} lang={lang} />}
        {mode === "split" && <SplitScreen data={MENU_DATA} theme={theme} lang={lang} />}
        {mode === "queue" && <OrderQueue theme={theme} />}
      </main>

      <ControlPanel
        theme={theme}
        mode={mode}
        showControls={showControls}
        onToggleControls={() => setShowControls(!showControls)}
        onSetMode={setMode}
        onSetTheme={setTheme}
      />
    </div>
  );
}
