"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Building2, Users, Car, MapPin } from "lucide-react";
import type { AdminLocation } from "@/types/admin-management";

interface LocationStatsProps {
  locations: AdminLocation[];
}

export function LocationStats({ locations }: LocationStatsProps) {
  const totalDrivers = locations.reduce((sum, loc) => sum + loc.activeDrivers, 0);
  const totalTrips = locations.reduce((sum, loc) => sum + loc.activeTrips, 0);
  const totalZones = locations.reduce((sum, loc) => sum + loc.zones.length, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Locations"
        value={locations.length}
        icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
        description="Active dispatch centers"
      />
      <StatsCard
        title="Active Drivers"
        value={totalDrivers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Across all locations"
      />
      <StatsCard
        title="Active Trips"
        value={totalTrips}
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        description="Currently in progress"
      />
      <StatsCard
        title="Total Zones"
        value={totalZones}
        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
        description="Operational areas"
      />
    </div>
  );
}