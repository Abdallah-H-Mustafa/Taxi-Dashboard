"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { toast } from "sonner";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface BusRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BusStop {
  id: string;
  name: string;
  coordinates: [number, number];
  estimatedTime: string;
}

export function BusRouteDialog({ open, onOpenChange }: BusRouteDialogProps) {
  const [routeName, setRouteName] = useState("");
  const [routeNumber, setRouteNumber] = useState("");
  const [stops, setStops] = useState<BusStop[]>([
    { id: "1", name: "Downtown Station", coordinates: [63.7467, -68.5170], estimatedTime: "09:00" },
    { id: "2", name: "Mall Station", coordinates: [63.7500, -68.5100], estimatedTime: "09:15" },
    { id: "3", name: "Airport Terminal", coordinates: [63.7450, -68.5200], estimatedTime: "09:30" }
  ]);

  const handleSave = () => {
    if (!routeName || !routeNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Save route logic here
    toast.success("Route saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Manage Bus Route</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Route Name</Label>
              <Input
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="e.g., Downtown Express"
              />
            </div>
            <div className="space-y-2">
              <Label>Route Number</Label>
              <Input
                value={routeNumber}
                onChange={(e) => setRouteNumber(e.target.value)}
                placeholder="e.g., R1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Route Map</Label>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapContainer
                center={[63.7467, -68.5170]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Draw route line */}
                <Polyline
                  positions={stops.map(stop => stop.coordinates)}
                  color="#3B82F6"
                  weight={3}
                />

                {/* Show stops */}
                {stops.map((stop) => (
                  <Marker
                    key={stop.id}
                    position={stop.coordinates}
                    icon={icon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-medium">{stop.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Estimated Time: {stop.estimatedTime}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Stops</Label>
            <div className="border rounded-lg divide-y">
              {stops.map((stop, index) => (
                <div key={stop.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stop.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stop #{index + 1} • {stop.estimatedTime}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Route</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}