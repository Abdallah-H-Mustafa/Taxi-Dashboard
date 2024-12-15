"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoneDrawingManager } from "@/lib/map/zone-drawing";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function MapController({
  onMapReady,
  drawingManager,
}: {
  onMapReady: (map: L.Map) => void;
  drawingManager: React.MutableRefObject<ZoneDrawingManager | null>;
}) {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);

    // Initialize drawing manager
    if (!drawingManager.current) {
      drawingManager.current = new ZoneDrawingManager({
        color: "#4CAF50",
        fillOpacity: 0.2,
        weight: 2
      });
      drawingManager.current.initialize(map);
    }

    return () => {
      if (drawingManager.current) {
        drawingManager.current.destroy();
        drawingManager.current = null;
      }
    };
  }, [map, onMapReady, drawingManager]);

  return null;
}

interface ZoneMapProps {
  onZoneDrawn?: (coordinates: [number, number][]) => void;
  initialZone?: [number, number][];
  zoneColor?: string;
}

export function ZoneMap({ onZoneDrawn, initialZone, zoneColor = "#4CAF50" }: ZoneMapProps) {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const drawingManagerRef = useRef<ZoneDrawingManager | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleMapReady = (map: L.Map) => {
    mapRef.current = map;

    map.on('draw:created', (e: any) => {
      if (!drawingManagerRef.current) return;

      const coordinates = drawingManagerRef.current.getDrawnCoordinates();
      if (coordinates && coordinates.length > 0) {
        if (drawingManagerRef.current.validateZone(coordinates)) {
          onZoneDrawn?.(coordinates);
          setIsDrawingMode(false);
        } else {
          toast.error("Invalid zone shape. Please try again.");
          drawingManagerRef.current.clearDrawings();
        }
      }
    });

    // Add initial zone if provided
    if (initialZone && drawingManagerRef.current) {
      try {
        drawingManagerRef.current.addZone(initialZone);
      } catch (error) {
        console.error('Error adding initial zone:', error);
      }
    }
  };

  const toggleDrawingMode = () => {
    if (!drawingManagerRef.current) return;

    setIsDrawingMode(!isDrawingMode);
    if (!isDrawingMode) {
      drawingManagerRef.current.clearDrawings();
      drawingManagerRef.current.enableDrawing();
    } else {
      drawingManagerRef.current.disableDrawing();
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Zone Map</CardTitle>
        <Button
          variant={isDrawingMode ? "default" : "outline"}
          onClick={toggleDrawingMode}
        >
          {isDrawingMode ? "Cancel Drawing" : "Draw Zone"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] rounded-lg overflow-hidden">
          <MapContainer
            center={[63.7467, -68.5170]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController 
              onMapReady={handleMapReady}
              drawingManager={drawingManagerRef}
            />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}