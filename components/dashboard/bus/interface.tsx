"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BusMap } from "./map";
import { BusQueue } from "./queue";
import { BusDriverListDialog } from "./driver-list-dialog";
import { BusVehicleListDialog } from "./vehicle-list-dialog";
import { BusHeader } from "./header";
import { BusStatusList } from "./status-list";
import { BusOverview } from "./overview";
import { BusRouteDialog } from "./route-dialog";
import { BusScheduleDialog } from "./schedule-dialog";
import { BusBookingInterface } from "./booking-interface";
import { useBusTripStore } from "@/lib/stores/bus-trip-store";

export function BusInterface() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDriverListOpen, setIsDriverListOpen] = useState(false);
  const [isVehicleListOpen, setIsVehicleListOpen] = useState(false);
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const { trips } = useBusTripStore();

  // Convert Map to Array and filter
  const tripsArray = Array.from(trips.values());
  const regularTrips = tripsArray.filter(trip => trip.status === 'scheduled');

  const handleIconClick = (action: string) => {
    switch (action) {
      case "map":
        setIsMapOpen(true);
        break;
      case "drivers":
        setIsDriverListOpen(true);
        break;
      case "vehicles":
        setIsVehicleListOpen(true);
        break;
      case "routes":
        setIsRouteDialogOpen(true);
        break;
      case "schedule":
        setIsScheduleDialogOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BusHeader 
        onMapOpen={() => setIsMapOpen(true)}
        onDriverListOpen={() => setIsDriverListOpen(true)}
        onVehicleListOpen={() => setIsVehicleListOpen(true)}
        onIconClick={handleIconClick}
      />

      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <BusBookingInterface />
          </div>

          <div className="col-span-7">
            <BusQueue />
          </div>

          <div className="col-span-2">
            <BusStatusList trips={regularTrips} />
          </div>
        </div>
      </div>

      <BusDriverListDialog
        open={isDriverListOpen}
        onOpenChange={setIsDriverListOpen}
      />

      <BusVehicleListDialog
        open={isVehicleListOpen}
        onOpenChange={setIsVehicleListOpen}
      />

      <BusRouteDialog 
        open={isRouteDialogOpen}
        onOpenChange={setIsRouteDialogOpen}
      />

      <BusScheduleDialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      />
    </div>
  );
}