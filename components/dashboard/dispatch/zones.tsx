"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DispatchZone } from "@/types/dispatch-center";

interface DispatchZonesProps {
  zones: DispatchZone[];
}

export function DispatchZones({ zones }: DispatchZonesProps) {
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
                <Badge variant={zone.status === "active" ? "success" : "secondary"}>
                  {zone.status}
                </Badge>
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
              <div className="text-sm text-muted-foreground">
                {zone.company}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}