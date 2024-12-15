"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueuedTrip } from "@/lib/stores/trip-queue-store";
import { Calendar, Clock, MapPin, Phone, User, Car, FileText } from "lucide-react";

interface TripDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: QueuedTrip;
}

export function TripDetailsDialog({ open, onOpenChange, trip }: TripDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-12rem)]">
          <div className="space-y-6 pr-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Customer Information</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{trip.customerName || "Not provided"}</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{trip.customerPhone || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Trip Locations</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p>{trip.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Dropoff</p>
                      <p>{trip.dropoffAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Timing</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Created: {trip.createdAt}</p>
                    {trip.scheduledTime && (
                      <p>Scheduled: {new Date(trip.scheduledTime).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Vehicle Details</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Type: {trip.vehicleType || "Not specified"}</p>
                    <p>Number: {trip.vehicleNumber || "Not assigned"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Trip Status</p>
                  <div className="space-y-2">
                    <Badge variant="outline">{trip.type}</Badge>
                    <Badge 
                      variant={
                        trip.status === "assigned" 
                          ? "success" 
                          : trip.status === "cancelled" 
                          ? "destructive" 
                          : "secondary"
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Zones</p>
                  <div className="flex flex-wrap gap-1">
                    {trip.zones.map((zone) => (
                      <Badge key={zone} variant="secondary">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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