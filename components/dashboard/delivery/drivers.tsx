"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDriverStore } from "@/lib/stores/driver-store";

export function DeliveryDrivers() {
  const { drivers } = useDriverStore();
  const activeDrivers = Array.from(drivers.values()).filter(
    driver => driver.status === 'available' || driver.status === 'busy'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Drivers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeDrivers.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {driver.firstName} {driver.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Vehicle: {driver.vehicle?.make} {driver.vehicle?.model}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={driver.status === 'available' ? 'success' : 'warning'}
                >
                  {driver.status}
                </Badge>
                {driver.currentDelivery && (
                  <span className="text-xs text-muted-foreground">
                    Order #{driver.currentDelivery}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}