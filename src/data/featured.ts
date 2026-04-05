import type { FeaturedItem } from "@/types";
import { MENU_DATA } from "./menu";

export const FEATURED: FeaturedItem[] = [
  { ...MENU_DATA.food.categories[1].items[1], featured: "Chef's Special" },
  { ...MENU_DATA.food.categories[0].items[1], featured: "Dagdeal — 17% korting!" },
  { ...MENU_DATA.drinks.categories[1].items[2], featured: "Zomerhit" },
  { ...MENU_DATA.food.categories[1].items[2], featured: "Pasta Week!" },
];
