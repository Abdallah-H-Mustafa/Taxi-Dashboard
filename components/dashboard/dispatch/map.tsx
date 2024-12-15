"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DispatchZone } from "@/types/dispatch-center";
import "leaflet/dist/leaflet.css";

interface DispatchMapProps {
  zones: DispatchZone[];
}

export function DispatchMap({ zones }: DispatchMapProps) {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Dispatch Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[40.7128, -74.0060]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {zones.map((zone) => (
              <Polygon
                key={zone.id}
                positions={zone.area.coordinates}
                pathOptions={{
                  color: zone.status === "active" ? "#10B981" : "#6B7280",
                  fillOpacity: 0.2,
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Active Drivers: {zone.assignedDrivers}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Trips: {zone.activeTrips}
                    </p>
                  </div>
                </Popup>
              </Polygon>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}