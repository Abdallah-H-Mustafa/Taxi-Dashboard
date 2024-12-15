"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Bus, Users, Clock, MapPin } from "lucide-react";

export function BusOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Buses"
        value="24"
        icon={<Bus className="h-4 w-4 text-muted-foreground" />}
        description="Currently in service"
        trend={{ value: 8, label: "vs last hour" }}
      />
      <StatsCard
        title="Total Passengers"
        value="1,245"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Today's ridership"
        trend={{ value: 12, label: "vs yesterday" }}
      />
      <StatsCard
        title="Average Wait"
        value="4.5 min"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Current wait time"
        trend={{ value: -2, label: "vs last hour" }}
      />
      <StatsCard
        title="Active Routes"
        value="8"
        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
        description="Routes in service"
        trend={{ value: 0, label: "no change" }}
      />
    </div>
  );
}