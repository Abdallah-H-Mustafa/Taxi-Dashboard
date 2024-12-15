"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaxiZone } from "@/types/taxi-service";
import "leaflet/dist/leaflet.css";

interface TaxiMapProps {
  zones: TaxiZone[];
}

export function TaxiMap({ zones }: TaxiMapProps) {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const getDemandColor = (level: string) => {
    switch (level) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      default:
        return "#10b981";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Taxi Map</CardTitle>
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
                  color: getDemandColor(zone.demandLevel),
                  fillOpacity: 0.2,
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Demand Level: {zone.demandLevel}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Drivers: {zone.assignedDrivers}
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