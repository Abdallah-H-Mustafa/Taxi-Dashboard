"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TaxiZone } from "@/types/taxi-service";

interface TaxiZonesProps {
  zones: TaxiZone[];
}

export function TaxiZones({ zones }: TaxiZonesProps) {
  const getDemandBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive">High Demand</Badge>;
      case "medium":
        return <Badge variant="warning">Medium Demand</Badge>;
      default:
        return <Badge variant="secondary">Low Demand</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zone Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="flex flex-col space-y-2 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{zone.name}</span>
                {getDemandBadge(zone.demandLevel)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Drivers:</span>
                  <span className="ml-1 font-medium">{zone.assignedDrivers}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Trips:</span>
                  <span className="ml-1 font-medium">{zone.activeTrips}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}