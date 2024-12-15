"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { AdminLocation } from "@/types/admin-management";

interface LocationListProps {
  locations: AdminLocation[];
  selectedLocation: string | null;
  onLocationSelect: (locationId: string) => void;
}

export function LocationList({
  locations,
  selectedLocation,
  onLocationSelect,
}: LocationListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispatch Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedLocation === location.id
                  ? "border-primary bg-accent"
                  : "hover:border-primary"
              }`}
              onClick={() => onLocationSelect(location.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{location.name}</h3>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {location.address}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {location.zones.map((zone) => (
                  <Badge key={zone} variant="secondary">
                    {zone}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Active Drivers:</span>
                  <span className="ml-1 font-medium">
                    {location.activeDrivers}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Active Trips:</span>
                  <span className="ml-1 font-medium">{location.activeTrips}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}