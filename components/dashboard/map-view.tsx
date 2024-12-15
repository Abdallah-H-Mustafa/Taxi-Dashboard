"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Driver } from "@/types/dashboard";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  drivers: Driver[];
}

export function MapView({ drivers }: MapViewProps) {
  useEffect(() => {
    // Fix for map container size in Next.js
    window.dispatchEvent(new Event("resize"));
  }, []);

  const center = { lat: 40.7128, lng: -74.0060 }; // New York City coordinates as default

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Live Driver Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {drivers.map((driver) => (
              driver.location && (
                <Marker
                  key={driver.id}
                  position={[driver.location.lat, driver.location.lng]}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{driver.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Status: {driver.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Rating: {driver.rating} ⭐
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}