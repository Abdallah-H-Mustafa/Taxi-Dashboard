"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Users, Clock, AlertTriangle, Activity } from "lucide-react";
import type { DispatchMetrics } from "@/types/dispatch-center";

interface DispatchOverviewProps {
  metrics: DispatchMetrics;
}

export function DispatchOverview({ metrics }: DispatchOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Drivers"
        value={metrics.totalActiveDrivers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Currently online drivers"
        trend={{ value: 8, label: "vs last hour" }}
      />
      <StatsCard
        title="Active Trips"
        value={metrics.totalActiveTrips}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        description="Trips in progress"
        trend={{ value: 12, label: "vs last hour" }}
      />
      <StatsCard
        title="Average Wait"
        value={`${metrics.averageWaitTime} min`}
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Customer wait time"
        trend={{ value: -15, label: "vs last hour" }}
      />
      <StatsCard
        title="Critical Alerts"
        value={metrics.criticalAlerts}
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        description="Require attention"
        trend={{ value: 2, label: "new alerts" }}
      />
    </div>
  );
}