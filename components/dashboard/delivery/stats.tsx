"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Package, Clock, DollarSign, Truck } from "lucide-react";

export function DeliveryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Deliveries"
        value="24"
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
        description="Currently in progress"
        trend={{ value: 8, label: "vs last hour" }}
      />
      <StatsCard
        title="Average Time"
        value="32 min"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Per delivery"
        trend={{ value: -5, label: "vs yesterday" }}
      />
      <StatsCard
        title="Active Drivers"
        value="18"
        icon={<Truck className="h-4 w-4 text-muted-foreground" />}
        description="On delivery"
        trend={{ value: 2, label: "vs last hour" }}
      />
      <StatsCard
        title="Total Revenue"
        value="$2,845"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Today's earnings"
        trend={{ value: 12, label: "vs yesterday" }}
      />
    </div>
  );
}