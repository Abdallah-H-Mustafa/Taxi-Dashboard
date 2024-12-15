"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { ColorPicker } from "@/components/ui/color-picker";
import { useZoneStore } from "@/lib/stores/zone-store";
import { geocodeTown } from "@/lib/services/geocoding";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface AddZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddZoneDialog({ open, onOpenChange }: AddZoneDialogProps) {
  const [townName, setTownName] = useState("");
  const [zoneNumber, setZoneNumber] = useState("");
  const [isMainZone, setIsMainZone] = useState(true);
  const [parentZoneNumber, setParentZoneNumber] = useState("");
  const [isOpenCall, setIsOpenCall] = useState(false);
  const [zoneColor, setZoneColor] = useState("#4CAF50");
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([63.7467, -68.5170]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isSearching, setIsSearching] = useState(false);

  const { zones, addZone } = useZoneStore();
  const mainZones = zones.filter(z => z.isMainZone);
  const debouncedTownName = useDebounce(townName, 1000);

  // Find parent zone for display
  const parentZone = !isMainZone ? zones.find(z => z.number === parentZoneNumber) : null;

  const updateMapLocation = useCallback(async (name: string) => {
    if (name.length < 3 || isSearching) return;
    
    setIsSearching(true);
    try {
      const location = await geocodeTown(name);
      if (location) {
        setMapCenter([location.lat, location.lng]);
        setMapZoom(13);
      }
    } catch (error) {
      console.error('Error updating map location:', error);
    } finally {
      setIsSearching(false);
    }
  }, [isSearching]);

  useEffect(() => {
    if (debouncedTownName) {
      updateMapLocation(debouncedTownName);
    }
  }, [debouncedTownName, updateMapLocation]);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const coords = layer.getLatLngs()[0].map((latLng: any) => [
      latLng.lat,
      latLng.lng,
    ]);
    setCoordinates(coords);
  };

  const handleSubmit = () => {
    if (!townName || !zoneNumber || !coordinates.length) {
      toast.error("Please fill in all required fields and draw the zone");
      return;
    }

    if (!isMainZone && !parentZoneNumber) {
      toast.error("Please select a parent zone for the sub-zone");
      return;
    }

    addZone({
      name: townName,
      number: zoneNumber,
      isMainZone,
      parentZoneNumber: isMainZone ? undefined : parentZoneNumber,
      isOpenCall,
      color: zoneColor,
      coordinates,
    });

    toast.success("Zone added successfully");
    onOpenChange(false);

    // Reset form
    setTownName("");
    setZoneNumber("");
    setIsMainZone(true);
    setParentZoneNumber("");
    setIsOpenCall(false);
    setZoneColor("#4CAF50");
    setCoordinates([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Zone</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="townName">Town Name</Label>
              <Input
                id="townName"
                placeholder="e.g., Iqaluit"
                value={townName}
                onChange={(e) => setTownName(e.target.value)}
                disabled={isSearching}
              />
              {isSearching && (
                <p className="text-xs text-muted-foreground">Searching location...</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zoneNumber">Zone Number</Label>
              <Input
                id="zoneNumber"
                value={zoneNumber}
                onChange={(e) => setZoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="mainZone">Is it main Zone?</Label>
              <Switch
                id="mainZone"
                checked={isMainZone}
                onCheckedChange={(checked) => {
                  setIsMainZone(checked);
                  if (checked) {
                    setParentZoneNumber("");
                  }
                }}
              />
            </div>
            {!isMainZone && (
              <div className="space-y-2">
                <Label htmlFor="parentZone">Parent Zone Number</Label>
                <Select
                  value={parentZoneNumber}
                  onValueChange={setParentZoneNumber}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainZones.map((zone) => (
                      <SelectItem key={zone.id} value={zone.number}>
                        {zone.name} ({zone.number})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="openCall">Is it open call?</Label>
            <Switch
              id="openCall"
              checked={isOpenCall}
              onCheckedChange={setIsOpenCall}
            />
          </div>

          <div className="flex items-center space-x-4">
            <ColorPicker
              color={zoneColor}
              onChange={setZoneColor}
            />
            <Button
              variant={isDrawingMode ? "default" : "outline"}
              onClick={() => setIsDrawingMode(!isDrawingMode)}
            >
              {isDrawingMode ? "Drawing Mode Active" : "Start Drawing"}
            </Button>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {parentZone && (
                <Polygon
                  positions={parentZone.coordinates}
                  pathOptions={{
                    color: parentZone.color,
                    fillOpacity: 0.2,
                    weight: 2,
                    dashArray: "5, 10",
                  }}
                />
              )}

              <FeatureGroup>
                <EditControl
                  position="topleft"
                  onCreated={handleCreated}
                  draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    polygon: isDrawingMode ? {
                      allowIntersection: false,
                      drawError: {
                        color: "#e1e4e8",
                        message: "<strong>Oh snap!<strong> you can't draw that!",
                      },
                      shapeOptions: {
                        color: zoneColor,
                      },
                    } : false,
                  }}
                />
              </FeatureGroup>
            </MapContainer>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Zone</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}