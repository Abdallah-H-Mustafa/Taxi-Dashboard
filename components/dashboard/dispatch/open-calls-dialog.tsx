"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTripQueueStore } from "@/lib/stores/trip-queue-store";
import { useAddressStore } from "@/lib/stores/address-store";
import { useZoneStore } from "@/lib/stores/zone-store";
import { Clock, MapPin, Phone, User } from "lucide-react";

interface OpenCallsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpenCallsDialog({ open, onOpenChange }: OpenCallsDialogProps) {
  const { trips } = useTripQueueStore();
  const { addresses } = useAddressStore();
  const { zones } = useZoneStore();
  
  // Get commercial addresses that are marked for open calls
  const commercialAddresses = addresses.filter(addr => {
    if (!addr.commercialName) return false;
    const addressZones = addr.zones.split(" | ");
    return addressZones.some(zoneNumber => {
      const zone = zones.find(z => z.number === zoneNumber);
      return zone?.isOpenCall;
    });
  });

  // Filter only open call trips
  const openCallTrips = trips.filter(trip => 
    trip.zones.includes('OPEN_CALL') && 
    trip.status === 'pending'
  );

  // Group addresses into a 6-column grid layout
  const gridAddresses = [
    // First row
    ["1107", "343 DJ", "Beer Wine", "Franco Center", "Legion", "Park Place"],
    // Second row
    ["1501", "924 First", "CHART ROOM", "Fresh Food", "Library", "Police"],
    // Third row
    ["1528-A", "924 Second", "CIBC BANK", "FROB", "Mall", "Post Office"],
    // Fourth row
    ["1528-D", "Astro Pharmacy", "Discovery", "Gas Bar", "Market", "Restaurant"],
    // Fifth row
    ["1700-Bar", "Astro Post", "ELKS LOUNGE", "Hospital", "Medical", "School"],
    // Sixth row
    ["2227 QUICK", "BAFFIN GAS BAR", "FIRST NATION", "Hotel", "Movie Theater", "Shopping Center"]
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader className="flex items-center justify-between flex-row">
          <DialogTitle>Open Calls</DialogTitle>
          <Badge variant="destructive" className="animate-pulse">
            {openCallTrips.length} Active
          </Badge>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            {/* Grid of location buttons */}
            <div className="grid grid-cols-6 gap-2">
              {gridAddresses.flat().map((location) => {
                const matchingAddress = commercialAddresses.find(addr => 
                  addr.commercialName === location ||
                  addr.streetAddress.includes(location)
                );
                
                const hasOpenCall = openCallTrips.some(trip => 
                  trip.pickupAddress === (matchingAddress?.streetAddress || location)
                );

                return (
                  <Button
                    key={location}
                    variant={hasOpenCall ? "default" : "outline"}
                    className={`h-16 text-sm font-medium ${
                      hasOpenCall ? 'bg-primary animate-pulse' : ''
                    }`}
                  >
                    {location}
                  </Button>
                );
              })}
            </div>

            {/* Active open calls details */}
            {openCallTrips.length > 0 && (
              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-lg">Active Open Calls</h3>
                <div className="grid gap-4">
                  {openCallTrips.map((trip) => {
                    const matchingAddress = addresses.find(addr => 
                      addr.streetAddress === trip.pickupAddress
                    );

                    return (
                      <div
                        key={trip.id}
                        className="border rounded-lg p-4 space-y-3 bg-accent/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">#{trip.id}</Badge>
                            <Badge>{trip.type}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(trip.createdAt).toLocaleTimeString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{trip.customerName || 'Anonymous'}</span>
                            </div>
                            {trip.customerPhone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{trip.customerPhone}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                {matchingAddress?.commercialName && (
                                  <div className="font-medium">{matchingAddress.commercialName}</div>
                                )}
                                <div className="text-muted-foreground">{trip.pickupAddress}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{trip.dropoffAddress}</span>
                            </div>
                          </div>
                        </div>

                        {trip.note && (
                          <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                            {trip.note}
                          </div>
                        )}

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Assign Driver
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}