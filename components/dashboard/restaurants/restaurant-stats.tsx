"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Store, ShoppingBag, Clock, DollarSign } from "lucide-react";

export function RestaurantStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Restaurants"
        value="48"
        icon={<Store className="h-4 w-4 text-muted-foreground" />}
        description="Restaurants currently open"
        trend={{ value: 5, label: "vs last hour" }}
      />
      <StatsCard
        title="Pending Orders"
        value="32"
        icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        description="Orders waiting to be accepted"
        trend={{ value: -8, label: "vs last hour" }}
      />
      <StatsCard
        title="Average Prep Time"
        value="24 min"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Average order preparation time"
        trend={{ value: -3, label: "vs yesterday" }}
      />
      <StatsCard
        title="Total Sales"
        value="$4,289"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Total sales today"
        trend={{ value: 12, label: "vs yesterday" }}
      />
    </div>
  );
}