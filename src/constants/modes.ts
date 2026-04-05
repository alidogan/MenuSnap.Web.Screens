import type { ModeOption, ThemeOption } from "@/types";

export const MODES: ModeOption[] = [
  { id: "overview", label: "Full Overview", icon: "▦" },
  { id: "carousel", label: "Carousel", icon: "◎" },
  { id: "featured", label: "Featured", icon: "★" },
  { id: "split", label: "Split Screen", icon: "◫" },
  { id: "queue", label: "Order Queue", icon: "▤" },
];

export const THEME_LIST: ThemeOption[] = [
  { id: "dark", label: "Dark", icon: "🌑" },
  { id: "light", label: "Light", icon: "☀️" },
  { id: "christmas", label: "Kerst", icon: "🎄" },
  { id: "summer", label: "Zomer", icon: "🏖" },
  { id: "ramadan", label: "Ramadan", icon: "🌙" },
];
