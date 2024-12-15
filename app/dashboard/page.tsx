"use client";

import { Overview } from "@/components/dashboard/overview";
import { ActiveDrivers } from "@/components/dashboard/active-drivers";
import { TripManagement } from "@/components/dashboard/trip-management";
import { MapView } from "@/components/dashboard/map-view";
import type { Driver, Trip } from "@/types/dashboard";

// Temporary mock data - replace with actual API calls
const mockStats = {
  activeDrivers: 24,
  pendingTrips: 12,
  completedTrips: 156,
  totalRevenue: 8459,
};

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "John Doe",
    status: "available",
    location: { lat: 40.7128, lng: -74.0060 },
    rating: 4.8,
    totalTrips: 342,
    acceptanceRate: 0.95,
  },
  {
    id: "2",
    name: "Jane Smith",
    status: "busy",
    location: { lat: 40.7580, lng: -73.9855 },
    rating: 4.9,
    totalTrips: 523,
    acceptanceRate: 0.98,
  },
];

const mockTrips: Trip[] = [
  {
    id: "t1",
    driverId: "1",
    status: "active",
    pickup: {
      address: "123 Main St, New York, NY",
      location: { lat: 40.7128, lng: -74.0060 },
    },
    dropoff: {
      address: "456 Park Ave, New York, NY",
      location: { lat: 40.7580, lng: -73.9855 },
    },
    price: 25.50,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    driverId: "2",
    status: "pending",
    pickup: {
      address: "789 Broadway, New York, NY",
      location: { lat: 40.7484, lng: -73.9857 },
    },
    dropoff: {
      address: "321 5th Ave, New York, NY",
      location: { lat: 40.7484, lng: -73.9857 },
    },
    price: 18.75,
    createdAt: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <Overview stats={mockStats} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <h3 className="text-xl font-semibold mb-4">Active Drivers</h3>
            <ActiveDrivers drivers={mockDrivers} />
          </div>
          <div className="col-span-3">
            <TripManagement trips={mockTrips} />
          </div>
        </div>
        <MapView drivers={mockDrivers} />
      </div>
    </div>
  );
}