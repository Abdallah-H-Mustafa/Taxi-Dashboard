"use client";

import { TaxiOverview } from "@/components/dashboard/taxi/overview";
import { TaxiMap } from "@/components/dashboard/taxi/map";
import { TaxiQueue } from "@/components/dashboard/taxi/queue";
import { TaxiZones } from "@/components/dashboard/taxi/zones";
import type { TaxiMetrics, TaxiZone } from "@/types/taxi-service";

// Mock data - replace with actual API calls
const mockMetrics: TaxiMetrics = {
  activeDrivers: 125,
  pendingRequests: 18,
  completedTrips: 456,
  totalRevenue: 8750,
  averageWaitTime: 4.5,
  busyAreas: ["Downtown", "Airport", "Shopping District"],
};

const mockZones: TaxiZone[] = [
  {
    id: "z1",
    name: "Downtown",
    area: {
      coordinates: [[40.7128, -74.0060], [40.7580, -73.9855]],
      center: [40.7328, -73.9960],
    },
    status: "active",
    assignedDrivers: 45,
    activeTrips: 18,
    demandLevel: "high",
  },
];

export default function TaxiServicePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Taxi Service</h2>
      </div>
      <TaxiOverview metrics={mockMetrics} />
      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-8">
          <TaxiMap zones={mockZones} />
        </div>
        <div className="col-span-4 space-y-4">
          <TaxiQueue />
          <TaxiZones zones={mockZones} />
        </div>
      </div>
    </div>
  );
}