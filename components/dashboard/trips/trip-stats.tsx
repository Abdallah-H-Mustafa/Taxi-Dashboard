"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Car, Clock, DollarSign, Users } from "lucide-react";

export function TripStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Trips"
        value="24"
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        description="Currently in progress"
        trend={{ value: 8, label: "vs last hour" }}
      />
      <StatsCard
        title="Average Time"
        value="18 min"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Per trip"
        trend={{ value: -2, label: "vs average" }}
      />
      <StatsCard
        title="Total Passengers"
        value="156"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Today"
        trend={{ value: 12, label: "vs yesterday" }}
      />
      <StatsCard
        title="Revenue"
        value="$2,845"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Today's earnings"
        trend={{ value: 15, label: "vs yesterday" }}
      />
    </div>
  );
}