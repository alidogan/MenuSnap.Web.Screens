export interface MenuItem {
  id: number;
  name: string;
  nameEN: string;
  nameTR: string;
  desc: string;
  price: number;
  oldPrice: number | null;
  img: string;
  popular: boolean;
  available: boolean;
  tags: string[];
}

export interface Category {
  name: string;
  items: MenuItem[];
}

export interface MenuSection {
  name: string;
  icon: string;
  categories: Category[];
}

export type MenuData = Record<string, MenuSection>;

export interface FeaturedItem extends MenuItem {
  featured: string;
}

export interface OrderItem {
  number: number;
  status: "ready" | "preparing" | "new";
  name: string;
}

export interface ThemeColors {
  bg: string;
  bgCard: string;
  bgCardHover: string;
  text: string;
  textMuted: string;
  accent: string;
  accentGlow: string;
  border: string;
  gradient: string;
  gradientSubtle: string;
  sold: string;
  success: string;
  popular: string;
  tagBg: string;
  seasonal?: string;
}

export type ThemeName = "dark" | "light" | "christmas" | "summer" | "ramadan";

export type Lang = "NL" | "EN" | "TR";

export type DisplayMode = "overview" | "carousel" | "featured" | "split" | "queue";

export interface ModeOption {
  id: DisplayMode;
  label: string;
  icon: string;
}

export interface ThemeOption {
  id: ThemeName;
  label: string;
  icon: string;
}

export interface TimeSlot {
  label: string;
  labelEN: string;
  icon: string;
  color: string;
}
