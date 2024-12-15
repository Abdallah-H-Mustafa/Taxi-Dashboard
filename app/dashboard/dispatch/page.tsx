"use client";

import { DispatchOverview } from "@/components/dashboard/dispatch/overview";
import { DispatchMap } from "@/components/dashboard/dispatch/map";
import { DispatchQueue } from "@/components/dashboard/dispatch/queue";
import { DispatchZones } from "@/components/dashboard/dispatch/zones";
import type { DispatchMetrics, DispatchZone } from "@/types/dispatch-center";

// Mock data - replace with actual API calls
const mockMetrics: DispatchMetrics = {
  totalActiveDrivers: 185,
  totalActiveTrips: 78,
  averageWaitTime: 4.5,
  averageResponseTime: 2.8,
  busyZones: ["downtown", "airport", "suburban-west"],
  criticalAlerts: 2,
};

const mockZones: DispatchZone[] = [
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
    company: "Metro Transit",
  },
  // Add more zones as needed
];

export default function DispatchCenterPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dispatch Center</h2>
      </div>
      <DispatchOverview metrics={mockMetrics} />
      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-8">
          <DispatchMap zones={mockZones} />
        </div>
        <div className="col-span-4 space-y-4">
          <DispatchQueue />
          <DispatchZones zones={mockZones} />
        </div>
      </div>
    </div>
  );
}