"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BusVehicle } from "@/lib/stores/bus-vehicle-store";
import { Bus, Calendar, Fuel, Tool, Wheelchair, Bike } from "lucide-react";

interface BusVehicleProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: BusVehicle;
}

export function BusVehicleProfileDialog({
  open,
  onOpenChange,
  vehicle
}: BusVehicleProfileDialogProps) {
  const formatDate = (date: string | undefined) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Vehicle Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-12rem)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-muted-foreground">Fleet #: {vehicle.fleetNumber}</p>
              </div>
              <Badge
                variant={
                  vehicle.status === "active"
                    ? "success"
                    : vehicle.status === "maintenance"
                    ? "warning"
                    : "destructive"
                }
              >
                {vehicle.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Vehicle Info</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Year: {vehicle.year}</p>
                  <p>Capacity: {vehicle.capacity} passengers</p>
                  <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
                  <p>Fuel Type: {vehicle.fuelType}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Maintenance</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Last: {formatDate(vehicle.lastMaintenance)}</p>
                  <p>Next: {formatDate(vehicle.nextMaintenance)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tool className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Features & Accessibility</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Wheelchair className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {vehicle.accessibility.wheelchairAccess ? "Wheelchair Access" : "No Wheelchair Access"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {vehicle.accessibility.lowFloor ? "Low Floor" : "Standard Floor"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bike className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {vehicle.accessibility.bikeRack ? "Bike Rack" : "No Bike Rack"}
                  </span>
                </div>
              </div>
            </div>

            {vehicle.currentRoute && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Current Assignment</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Route: {vehicle.currentRoute}</p>
                  {vehicle.currentDriver && <p>Driver: {vehicle.currentDriver}</p>}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}