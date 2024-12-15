"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBusVehicleStore } from "@/lib/stores/bus-vehicle-store";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function BusMap() {
  const { vehicles } = useBusVehicleStore();
  const activeVehicles = Array.from(vehicles.values()).filter(v => v.status === 'active');

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Bus Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[63.7467, -68.5170]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeVehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={[63.7467, -68.5170]} // Replace with actual vehicle location
                icon={icon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">Bus #{vehicle.fleetNumber}</h3>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.make} {vehicle.model}
                    </p>
                    {vehicle.currentRoute && (
                      <p className="text-sm">Route: {vehicle.currentRoute}</p>
                    )}
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