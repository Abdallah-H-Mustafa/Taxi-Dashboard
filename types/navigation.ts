import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
  color?: string;
}