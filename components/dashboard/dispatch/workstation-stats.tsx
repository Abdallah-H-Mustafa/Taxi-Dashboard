"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Users, Activity, Clock, AlertTriangle } from "lucide-react";
import type { DispatchWorkstation } from "@/types/dispatch-center";

interface WorkstationStatsProps {
  workstations: DispatchWorkstation[];
}

export function WorkstationStats({ workstations }: WorkstationStatsProps) {
  const activeWorkstations = workstations.filter(ws => ws.status === "active").length;
  const totalTrips = workstations.reduce((sum, ws) => sum + ws.activeTrips, 0);
  const avgResponseTime = workstations.reduce((sum, ws) => sum + ws.performance.avgResponseTime, 0) / workstations.length;
  const avgSatisfaction = workstations.reduce((sum, ws) => sum + ws.performance.satisfaction, 0) / workstations.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Workstations"
        value={activeWorkstations}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Currently active operators"
      />
      <StatsCard
        title="Active Trips"
        value={totalTrips}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        description="Trips being handled"
      />
      <StatsCard
        title="Avg Response Time"
        value={`${avgResponseTime.toFixed(1)}s`}
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Average operator response"
      />
      <StatsCard
        title="Satisfaction"
        value={`${avgSatisfaction.toFixed(1)}⭐`}
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        description="Average rating"
      />
    </div>
  );
}