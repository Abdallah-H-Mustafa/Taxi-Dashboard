"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Users, Clock, DollarSign, Car } from "lucide-react";
import type { TaxiMetrics } from "@/types/taxi-service";

interface TaxiOverviewProps {
  metrics: TaxiMetrics;
}

export function TaxiOverview({ metrics }: TaxiOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Drivers"
        value={metrics.activeDrivers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Currently online drivers"
        trend={{ value: 8, label: "vs last hour" }}
      />
      <StatsCard
        title="Pending Requests"
        value={metrics.pendingRequests}
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Waiting for drivers"
        trend={{ value: -5, label: "vs last hour" }}
      />
      <StatsCard
        title="Completed Trips"
        value={metrics.completedTrips}
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        description="Total trips today"
        trend={{ value: 12, label: "vs yesterday" }}
      />
      <StatsCard
        title="Total Revenue"
        value={`$${metrics.totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Revenue today"
        trend={{ value: 15, label: "vs yesterday" }}
      />
    </div>
  );
}