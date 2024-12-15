"use client";

import { Card } from "@/components/ui/card";
import { WorkstationMonitor } from "@/components/dashboard/dispatch/workstation-monitor";
import { WorkstationStats } from "@/components/dashboard/dispatch/workstation-stats";
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
  {
    id: "ws2",
    operator: "Jane Smith",
    assignedZones: ["airport", "suburban-east"],
    activeTrips: 8,
    status: "active",
    performance: {
      avgResponseTime: 38,
      tripsHandled: 142,
      satisfaction: 4.9,
    },
  },
];

export default function WorkstationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Workstation Management</h2>
      </div>
      <WorkstationStats workstations={mockWorkstations} />
      <Card className="p-6">
        <WorkstationMonitor />
      </Card>
    </div>
  );
}