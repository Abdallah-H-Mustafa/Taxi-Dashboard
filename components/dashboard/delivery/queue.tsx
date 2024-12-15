"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/lib/stores/trip-store";
import { format } from "date-fns";

export function DeliveryQueue() {
  const { deliveries, assignDelivery } = useTripStore();
  const pendingDeliveries = Array.from(deliveries.values()).filter(
    delivery => delivery.status === 'pending'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="p-4 border rounded-lg space-y-2"
            >
              <div className="flex justify-between items-center">
                <Badge variant="outline">Order #{delivery.id.slice(0, 6)}</Badge>
                <Badge>{delivery.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm space-y-1">
                  <p className="font-medium">Pickup</p>
                  <p className="text-muted-foreground truncate">
                    {delivery.pickup.address}
                  </p>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Dropoff</p>
                  <p className="text-muted-foreground truncate">
                    {delivery.dropoff.address}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {format(new Date(delivery.scheduledTime || new Date()), 'HH:mm')}
                </span>
                <span className="font-medium">${delivery.fare}</span>
              </div>
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline">Details</Button>
                <Button size="sm">Assign Driver</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}