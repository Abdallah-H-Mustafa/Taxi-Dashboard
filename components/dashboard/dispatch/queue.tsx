"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Edit2, User, Phone } from "lucide-react";
import { useTripQueueStore } from "@/lib/stores/trip-queue-store";
import { useState } from "react";
import { TripDetailsDialog } from "./trip-details-dialog";
import { cn } from "@/lib/utils";

export function DispatchQueue() {
  const { trips, assignVehicle } = useTripQueueStore();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const handleVehicleAssign = (tripId: string, vehicleNumber: string) => {
    assignVehicle(tripId, vehicleNumber);
  };

  const selectedTripDetails = trips.find(trip => trip.id === selectedTrip);

  const isOpenCall = (trip: typeof trips[0]) => {
    return trip.zones.includes('OPEN_CALL');
  };

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardContent className="p-3 h-full">
        <ScrollArea className="h-full pr-4">
          <div className="w-full">
            <table className="w-full text-xs">
              <thead>
                <tr className="sticky top-0 bg-background border-b">
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Trip ID</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Type</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Created</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Pickup</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Dropoff</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Customer</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Contact</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Zones</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Vehicle Type</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Vehicle #</th>
                  <th className="text-left py-1.5 px-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr 
                    key={trip.id} 
                    className={cn(
                      "border-b hover:bg-muted/50 transition-colors",
                      isOpenCall(trip) && "bg-green-500/10 hover:bg-green-500/20"
                    )}
                  >
                    <td className="py-1.5 px-2">
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {trip.id}
                      </Badge>
                    </td>
                    <td className="py-1.5 px-2">
                      <Badge className="text-[10px]">{trip.type}</Badge>
                    </td>
                    <td className="py-1.5 px-2">{trip.createdAt}</td>
                    <td className="py-1.5 px-2 max-w-[150px] truncate">
                      {trip.pickupAddress}
                    </td>
                    <td className="py-1.5 px-2 max-w-[150px] truncate">
                      {trip.dropoffAddress}
                    </td>
                    <td className="py-1.5 px-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span>{trip.customerName || "—"}</span>
                      </div>
                    </td>
                    <td className="py-1.5 px-2">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{trip.customerPhone || "—"}</span>
                      </div>
                    </td>
                    <td className="py-1.5 px-2">
                      <div className="flex gap-1">
                        {trip.zones.map((zone) => (
                          <Badge 
                            key={zone} 
                            variant="secondary" 
                            className={cn(
                              "text-[10px]",
                              zone === 'OPEN_CALL' && "bg-green-500/20 text-green-700 hover:bg-green-500/30"
                            )}
                          >
                            {zone}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-1.5 px-2">
                      <Badge variant="outline" className="text-[10px]">{trip.vehicleType}</Badge>
                    </td>
                    <td className="py-1.5 px-2">
                      <Input
                        className="h-6 w-16 text-xs"
                        placeholder="#"
                        value={trip.vehicleNumber}
                        onChange={(e) => handleVehicleAssign(trip.id, e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleVehicleAssign(trip.id, (e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => setSelectedTrip(trip.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>

      {selectedTripDetails && (
        <TripDetailsDialog
          open={!!selectedTrip}
          onOpenChange={(open) => !open && setSelectedTrip(null)}
          trip={selectedTripDetails}
        />
      )}
    </Card>
  );
}