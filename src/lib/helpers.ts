import type { Lang, MenuItem, TimeSlot } from "@/types";

export function getTimeSlot(): TimeSlot {
  const h = new Date().getHours();
  if (h >= 7 && h < 11) return { label: "Ontbijt", labelEN: "Breakfast", icon: "🌅", color: "#F59E0B" };
  if (h >= 11 && h < 17) return { label: "Lunch", labelEN: "Lunch", icon: "☀️", color: "#10B981" };
  return { label: "Diner", labelEN: "Dinner", icon: "🌙", color: "#8B5CF6" };
}

export function formatPrice(p: number): string {
  return `€${p.toFixed(2).replace(".", ",")}`;
}

export function getItemName(item: MenuItem, lang: Lang): string {
  if (lang === "EN") return item.nameEN;
  if (lang === "TR") return item.nameTR;
  return item.name;
}
