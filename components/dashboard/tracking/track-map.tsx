"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Import Leaflet CSS only on client side
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css');
}

// Fix for default markers in Next.js
const icon = typeof window !== 'undefined' ? require('leaflet').icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}) : null;

interface TrackMapProps {
  results: Array<{
    id: string;
    vehicleNumber: string;
    tripId: string;
    timestamp: string;
    coordinates: [number, number];
  }>;
}

export function TrackMap({ results }: TrackMapProps) {
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  if (typeof window === 'undefined') return null;

  return (
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
        {results.map((result) => (
          <Marker
            key={result.id}
            position={result.coordinates}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{result.vehicleNumber}</h3>
                <p className="text-sm text-muted-foreground">
                  Trip: {result.tripId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Time: {result.timestamp}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}