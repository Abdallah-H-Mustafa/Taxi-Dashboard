"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminLocation } from "@/types/admin-management";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationMapProps {
  locations: AdminLocation[];
  selectedLocation: string | null;
  onLocationSelect: (locationId: string) => void;
}

export function LocationMap({ 
  locations,
  selectedLocation,
  onLocationSelect
}: LocationMapProps) {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const center = locations[0]?.coordinates || { lat: 40.7128, lng: -74.0060 };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.coordinates.lat, location.coordinates.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => onLocationSelect(location.id),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {location.address}
                    </p>
                    <div className="mt-2 text-sm">
                      <p>Active Drivers: {location.activeDrivers}</p>
                      <p>Active Trips: {location.activeTrips}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}