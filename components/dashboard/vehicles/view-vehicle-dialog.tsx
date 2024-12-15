"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Vehicle } from "@/types/vehicle";
import { Car, Calendar, Fuel, Tool, FileText } from "lucide-react";

interface ViewVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function ViewVehicleDialog({ open, onOpenChange, vehicle }: ViewVehicleDialogProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Vehicle Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-12rem)]">
          <div className="space-y-6 pr-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-muted-foreground">Registration: {vehicle.registrationNumber}</p>
              </div>
              <Badge
                variant={
                  vehicle.status === "active"
                    ? "success"
                    : vehicle.status === "maintenance"
                    ? "warning"
                    : "secondary"
                }
              >
                {vehicle.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Vehicle Info</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Year: {vehicle.year}</p>
                  <p>Type: {vehicle.type}</p>
                  <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
                  <p>Fuel Type: {vehicle.fuelType}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Service History</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Last Service: {vehicle.lastService ? formatDate(vehicle.lastService) : "—"}</p>
                  <p>Next Service: {vehicle.nextService ? formatDate(vehicle.nextService) : "—"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Insurance Details</span>
              </div>
              <div className="space-y-1 text-sm">
                <p>Provider: {vehicle.insurance.provider}</p>
                <p>Policy Number: {vehicle.insurance.policyNumber}</p>
                <p>Expiry Date: {formatDate(vehicle.insurance.expiryDate)}</p>
              </div>
            </div>

            {vehicle.maintenanceHistory.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tool className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Maintenance History</span>
                </div>
                <div className="space-y-2">
                  {vehicle.maintenanceHistory.map((record) => (
                    <div
                      key={record.id}
                      className="border rounded-lg p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{record.type}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(record.date)}
                        </span>
                      </div>
                      <p className="text-sm">{record.description}</p>
                      <p className="text-sm font-medium">
                        Cost: ${record.cost.toFixed(2)}
                      </p>
                    </div>
                  ))}
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