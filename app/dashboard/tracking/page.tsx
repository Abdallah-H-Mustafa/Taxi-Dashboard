"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackFilters } from "@/components/dashboard/tracking/track-filters";
import { TrackResults } from "@/components/dashboard/tracking/track-results";
import { TrackMap } from "@/components/dashboard/tracking/track-map";
import { Button } from "@/components/ui/button";
import { X, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - replace with actual API calls
const mockResults = [
  {
    id: "1",
    vehicleNumber: "CAB001",
    driverName: "John Doe",
    tripId: "T123",
    pickup: "123 Main St",
    dropoff: "456 Oak Ave",
    status: "completed",
    timestamp: "10:30 AM",
    coordinates: [63.7467, -68.5170] as [number, number]
  },
  {
    id: "2",
    vehicleNumber: "CAB002",
    driverName: "Jane Smith",
    tripId: "T124",
    pickup: "789 Pine St",
    dropoff: "321 Elm St",
    status: "in_progress",
    timestamp: "10:45 AM",
    coordinates: [63.7500, -68.5100] as [number, number]
  }
];

export default function TrackingPage() {
  const router = useRouter();
  const [trackBy, setTrackBy] = useState<'vehicle' | 'trip'>('vehicle');
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [tripId, setTripId] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [results, setResults] = useState(mockResults);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    router.back();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Track History</span>
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
        <h2 className="text-3xl font-bold tracking-tight">Track History</h2>
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

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <TrackFilters
              trackBy={trackBy}
              vehicleNumber={vehicleNumber}
              tripId={tripId}
              fromDate={fromDate}
              toDate={toDate}
              status={status}
              isLoading={isLoading}
              onTrackByChange={setTrackBy}
              onVehicleNumberChange={setVehicleNumber}
              onTripIdChange={setTripId}
              onFromDateChange={setFromDate}
              onToDateChange={setToDate}
              onStatusChange={setStatus}
              onSearch={handleSearch}
            />
          </CardContent>
        </Card>

        <div className="md:col-span-9 space-y-4">
          <Card>
            <CardContent className="p-6">
              <TrackMap results={results} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <TrackResults results={results} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}