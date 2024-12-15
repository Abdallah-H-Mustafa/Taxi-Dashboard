"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit2, User, Bus, Clock } from "lucide-react";
import { useBusTripStore } from "@/lib/stores/bus-trip-store";
import { cn } from "@/lib/utils";

export function BusQueue() {
  const { trips, updateTrip } = useBusTripStore();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const handleVehicleAssign = (tripId: string, vehicleNumber: string) => {
    updateTrip(tripId, { vehicleId: vehicleNumber });
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Trip ID</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Route</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Time</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Bus #</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Driver</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Status</th>
                <th className="text-left py-1.5 px-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(trips.values()).map((trip) => (
                <tr 
                  key={trip.id} 
                  className={cn(
                    "border-b hover:bg-muted/50 transition-colors",
                    selectedTrip === trip.id && "bg-muted"
                  )}
                >
                  <td className="py-1.5 px-2">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {trip.id}
                    </Badge>
                  </td>
                  <td className="py-1.5 px-2">{trip.routeId}</td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {trip.startTime}
                    </div>
                  </td>
                  <td className="py-1.5 px-2">
                    <Input
                      className="h-6 w-16 text-xs"
                      placeholder="#"
                      value={trip.vehicleId}
                      onChange={(e) => handleVehicleAssign(trip.id, e.target.value)}
                    />
                  </td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {trip.driverId || "—"}
                    </div>
                  </td>
                  <td className="py-1.5 px-2">
                    <Badge variant={
                      trip.status === "completed" 
                        ? "success" 
                        : trip.status === "cancelled" 
                        ? "destructive" 
                        : "secondary"
                    }>
                      {trip.status}
                    </Badge>
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
      </CardContent>
    </Card>
  );
}