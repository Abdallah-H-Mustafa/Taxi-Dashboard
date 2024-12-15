"use client";

import { Card } from "@/components/ui/card";
import { DispatchQueue } from "@/components/dashboard/dispatch/queue";
import { DispatchMap } from "@/components/dashboard/dispatch/map";
import { WorkstationMonitor } from "@/components/dashboard/dispatch/workstation-monitor";
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
];

export default function DispatchTripsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Active Trips</h2>
      </div>
      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-8">
          <DispatchMap zones={mockZones} />
        </div>
        <div className="col-span-4 space-y-4">
          <DispatchQueue />
          <WorkstationMonitor />
        </div>
      </div>
    </div>
  );
}