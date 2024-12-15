"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Trip } from "@/types/trip";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface TripMapProps {
  trips: Trip[];
}

export function TripMap({ trips }: TripMapProps) {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
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
        {trips.map((trip) => (
          <div key={trip.id}>
            <Marker
              position={[trip.pickup.lat, trip.pickup.lng]}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">Pickup Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {trip.pickup.address}
                  </p>
                  <p className="text-sm">Trip ID: {trip.id}</p>
                </div>
              </Popup>
            </Marker>
            <Marker
              position={[trip.dropoff.lat, trip.dropoff.lng]}
              icon={icon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium">Dropoff Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {trip.dropoff.address}
                  </p>
                  <p className="text-sm">Trip ID: {trip.id}</p>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}