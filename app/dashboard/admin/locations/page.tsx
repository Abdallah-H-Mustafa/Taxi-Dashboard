"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LocationMap } from "@/components/dashboard/admin/location-map";
import { LocationList } from "@/components/dashboard/admin/location-list";
import { LocationStats } from "@/components/dashboard/admin/location-stats";
import type { AdminLocation } from "@/types/admin-management";

// Mock data - replace with actual API calls
const mockLocations: AdminLocation[] = [
  {
    id: "1",
    name: "Downtown Dispatch Center",
    address: "123 Main St, City Center",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    zones: ["downtown", "midtown"],
    activeDrivers: 45,
    activeTrips: 28,
  },
  {
    id: "2",
    name: "Airport Operations",
    address: "Terminal 4, International Airport",
    coordinates: { lat: 40.6413, lng: -73.7781 },
    zones: ["airport", "airport-express"],
    activeDrivers: 32,
    activeTrips: 24,
  },
];

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Location Management</h2>
      </div>
      <LocationStats locations={mockLocations} />
      <div className="grid gap-4 grid-cols-12">
        <Card className="col-span-8">
          <LocationMap 
            locations={mockLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </Card>
        <div className="col-span-4">
          <LocationList
            locations={mockLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </div>
      </div>
    </div>
  );
}