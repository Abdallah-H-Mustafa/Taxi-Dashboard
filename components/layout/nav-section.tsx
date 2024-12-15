"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

interface NavSectionProps {
  title: string;
  routes: NavItem[];
  expanded: boolean;
}

export function NavSection({ title, routes, expanded }: NavSectionProps) {
  if (!routes?.length) return null;

  return (
    <div className="px-3 py-2">
      <h2 
        className={cn(
          "mb-2 px-4 text-lg font-semibold transition-all",
          !expanded && "opacity-0"
        )}
      >
        {title}
      </h2>
      <div className="space-y-1">
        {routes.map((route) => {
          if (!route?.icon) return null;
          const IconComponent = route.icon;
          
          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.variant}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  route.color,
                  !expanded && "justify-center px-2"
                )}
              >
                <IconComponent className="h-4 w-4" />
                {expanded && <span className="ml-2">{route.title}</span>}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}