"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NavSection } from "./nav-section";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Car, 
  Store,
  Bus,
  Package,
  FileText,
  UserCog,
  Map,
  ChevronLeft,
  ChevronRight,
  Building,
  Briefcase,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/types/navigation";

export function SidebarNav() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    logoutAdmin();
    router.push("/login");
  };

  const mainRoutes: NavItem[] = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      variant: pathname === "/dashboard" ? "default" : "ghost",
      href: "/dashboard",
      color: "text-blue-500"
    }
  ];

  const serviceRoutes: NavItem[] = [
    {
      title: "Taxi Service",
      icon: Car,
      variant: pathname === "/dashboard/companies" ? "default" : "ghost",
      href: "/dashboard/companies",
      color: "text-yellow-500",
    },
    {
      title: "Bus Service",
      icon: Bus,
      variant: pathname === "/dashboard/bus" ? "default" : "ghost",
      href: "/dashboard/bus",
      color: "text-green-500",
    },
    {
      title: "Delivery",
      icon: Package,
      variant: pathname === "/dashboard/delivery" ? "default" : "ghost",
      href: "/dashboard/delivery",
      color: "text-orange-500",
    },
    {
      title: "Businesses",
      icon: Store,
      variant: pathname.startsWith("/dashboard/businesses") ? "default" : "ghost",
      href: "/dashboard/businesses",
      color: "text-purple-500",
    },
    {
      title: "Business Companies",
      icon: Briefcase,
      variant: pathname === "/dashboard/businesses/companies" ? "default" : "ghost",
      href: "/dashboard/businesses/companies",
      color: "text-indigo-500",
    }
  ];

  const adminRoutes: NavItem[] = [
    {
      title: "Admins",
      icon: UserCog,
      variant: pathname === "/dashboard/admins" ? "default" : "ghost",
      href: "/dashboard/admins",
      color: "text-violet-500",
    },
    {
      title: "Locations",
      icon: Map,
      variant: pathname === "/dashboard/admin/locations" ? "default" : "ghost",
      href: "/dashboard/admin/locations",
      color: "text-rose-500",
    },
    {
      title: "Reports",
      icon: FileText,
      variant: pathname === "/dashboard/reports" ? "default" : "ghost",
      href: "/dashboard/reports",
      color: "text-amber-500",
    }
  ];

  const userRoutes: NavItem[] = [
    {
      title: "Profile",
      icon: User,
      variant: "ghost",
      href: "/dashboard/profile",
      color: "text-teal-500",
    },
    {
      title: "Logout",
      icon: LogOut,
      variant: "ghost",
      href: "#",
      color: "text-red-500",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-2 z-20 rounded-full bg-muted"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <motion.div
          animate={{ width: expanded ? "16rem" : "4rem" }}
          className="flex flex-col gap-4 py-4 transition-all duration-300"
        >
          <NavSection title="Main" routes={mainRoutes} expanded={expanded} />
          <NavSection title="Services" routes={serviceRoutes} expanded={expanded} />
          <NavSection title="Administration" routes={adminRoutes} expanded={expanded} />
          <NavSection title="Account" routes={userRoutes} expanded={expanded} />
        </motion.div>
      </ScrollArea>
    </div>
  );
}