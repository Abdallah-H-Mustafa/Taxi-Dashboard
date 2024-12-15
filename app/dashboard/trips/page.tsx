"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripList } from "@/components/dashboard/trips/trip-list";
import { TripFilters } from "@/components/dashboard/trips/trip-filters";
import { TripStats } from "@/components/dashboard/trips/trip-stats";
import { TripMap } from "@/components/dashboard/trips/trip-map";
import { Button } from "@/components/ui/button";
import { X, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/lib/stores/trip-store";

// Mock data for testing
const mockTrips = [
  {
    id: "T1",
    passengerId: "P1",
    driverId: "D1",
    pickup: {
      address: "123 Main St",
      lat: 63.7467,
      lng: -68.5170,
    },
    dropoff: {
      address: "456 Oak Ave",
      lat: 63.7500,
      lng: -68.5100,
    },
    status: "completed" as const,
    fare: 25.50,
    distance: 3.2,
    duration: 15,
    scheduledTime: new Date().toISOString(),
    paymentMethod: "cash" as const,
    paymentStatus: "completed" as const,
  },
  {
    id: "T2",
    passengerId: "P2",
    pickup: {
      address: "789 Pine St",
      lat: 63.7480,
      lng: -68.5150,
    },
    dropoff: {
      address: "321 Elm St",
      lat: 63.7490,
      lng: -68.5160,
    },
    status: "pending" as const,
    fare: 18.75,
    distance: 2.1,
    duration: 12,
    scheduledTime: new Date().toISOString(),
    paymentMethod: "cash" as const,
    paymentStatus: "pending" as const,
  }
];

export default function TripsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [view, setView] = useState<"list" | "map">("list");
  const [isMinimized, setIsMinimized] = useState(false);
  const { setTrips } = useTripStore();

  // Initialize with mock data
  useState(() => {
    setTrips(mockTrips);
  });

  const trips = mockTrips;
  const activeTrips = trips.filter(t => t.status === "in_progress");
  const completedTrips = trips.filter(t => t.status === "completed");
  const cancelledTrips = trips.filter(t => t.status === "cancelled");

  const handleClose = () => {
    router.back();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Trip Management</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trip Management</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TripStats />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Trips</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TripFilters onViewChange={setView} view={view} />
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              {view === "list" ? (
                <TripList trips={trips} />
              ) : (
                <TripMap trips={trips} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="p-6">
              {view === "list" ? (
                <TripList trips={activeTrips} />
              ) : (
                <TripMap trips={activeTrips} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-6">
              {view === "list" ? (
                <TripList trips={completedTrips} />
              ) : (
                <TripMap trips={completedTrips} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardContent className="p-6">
              {view === "list" ? (
                <TripList trips={cancelledTrips} />
              ) : (
                <TripMap trips={cancelledTrips} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}