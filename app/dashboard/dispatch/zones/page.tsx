"use client";

import { Card } from "@/components/ui/card";
import { DispatchZones } from "@/components/dashboard/dispatch/zones";
import { DispatchMap } from "@/components/dashboard/dispatch/map";
import type { DispatchZone } from "@/types/dispatch-center";

// Mock data - replace with actual API calls
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
  {
    id: "z2",
    name: "Airport",
    area: {
      coordinates: [[40.6413, -73.7781], [40.6631, -73.7831]],
      center: [40.6522, -73.7806],
    },
    status: "active",
    assignedDrivers: 32,
    activeTrips: 24,
    company: "Airport Express",
  },
];

export default function DispatchZonesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Zone Management</h2>
      </div>
      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-8">
          <DispatchMap zones={mockZones} />
        </div>
        <div className="col-span-4">
          <DispatchZones zones={mockZones} />
        </div>
      </div>
    </div>
  );
}