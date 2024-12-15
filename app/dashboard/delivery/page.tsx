"use client";

import { Card } from "@/components/ui/card";
import { DeliveryMap } from "@/components/dashboard/delivery/map";
import { DeliveryQueue } from "@/components/dashboard/delivery/queue";
import { DeliveryStats } from "@/components/dashboard/delivery/stats";
import { DeliveryDrivers } from "@/components/dashboard/delivery/drivers";
import type { DeliveryOrder } from "@/types/trip";

export default function DeliveryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Management</h2>
      </div>
      <DeliveryStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <DeliveryMap />
        </Card>
        <div className="col-span-3 space-y-4">
          <DeliveryQueue />
          <DeliveryDrivers />
        </div>
      </div>
    </div>
  );
}