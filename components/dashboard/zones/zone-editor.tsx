"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Zone } from "@/types/zone-management";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface ZoneEditorProps {
  zone?: Zone;
  onZoneUpdate: (coordinates: [number, number][]) => void;
}

export function ZoneEditor({ zone, onZoneUpdate }: ZoneEditorProps) {
  const featureGroupRef = useRef<any>(null);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const coordinates = layer.getLatLngs()[0].map((latLng: any) => [
      latLng.lat,
      latLng.lng,
    ]);
    onZoneUpdate(coordinates);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zone Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={zone?.area.center || [40.7128, -74.0060]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                onCreated={handleCreated}
                draw={{
                  rectangle: true,
                  polygon: true,
                  circle: false,
                  circlemarker: false,
                  marker: false,
                  polyline: false,
                }}
              />
            </FeatureGroup>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}