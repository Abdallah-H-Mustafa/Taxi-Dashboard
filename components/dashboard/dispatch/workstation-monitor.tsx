"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DispatchWorkstation } from "@/types/dispatch-center";

// Mock data - replace with actual API calls
const mockWorkstations: DispatchWorkstation[] = [
  {
    id: "ws1",
    operator: "John Doe",
    assignedZones: ["downtown", "midtown"],
    activeTrips: 12,
    status: "active",
    performance: {
      avgResponseTime: 45,
      tripsHandled: 156,
      satisfaction: 4.8,
    },
  },
];

export function WorkstationMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workstation Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockWorkstations.map((station) => (
            <div
              key={station.id}
              className="flex flex-col space-y-3 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{station.operator}</h4>
                  <p className="text-sm text-muted-foreground">
                    Station #{station.id}
                  </p>
                </div>
                <Badge
                  variant={
                    station.status === "active"
                      ? "success"
                      : station.status === "break"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {station.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Active Trips</p>
                  <p className="font-medium">{station.activeTrips}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Response</p>
                  <p className="font-medium">{station.performance.avgResponseTime}s</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Satisfaction</p>
                  <p className="font-medium">{station.performance.satisfaction}⭐</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {station.assignedZones.map((zone) => (
                  <Badge key={zone} variant="outline">
                    {zone}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}