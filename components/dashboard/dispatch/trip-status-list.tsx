"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QueuedTrip } from "@/lib/stores/trip-queue-store";
import { useState } from "react";

interface TripStatusListProps {
  trips: QueuedTrip[];
}

export function TripStatusList({ trips }: TripStatusListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 10;
  const totalPages = Math.ceil(trips.length / tripsPerPage);
  
  const paginatedTrips = trips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <div className="p-3">
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Vehicle #</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-5">Address</div>
          </div>

          <div className="space-y-2">
            {paginatedTrips.map((trip, index) => (
              <div key={trip.id} className="grid grid-cols-12 gap-2 text-xs hover:bg-muted/50 p-1 rounded">
                <div className="col-span-1">{(currentPage - 1) * tripsPerPage + index + 1}</div>
                <div className="col-span-3 font-mono">{trip.vehicleNumber || "—"}</div>
                <div className="col-span-3">Ongoing Trip</div>
                <div className="col-span-5 truncate">{trip.pickupAddress}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2">
          <div className="text-xs text-muted-foreground">
            Trips per page: ({trips.length})
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}