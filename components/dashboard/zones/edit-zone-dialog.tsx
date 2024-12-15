"use client";

import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { ChromePicker } from "react-color";
import { Palette, Pencil } from "lucide-react";
import { useZoneStore, Zone } from "@/lib/stores/zone-store";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface EditZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zone: Zone;
}

export function EditZoneDialog({ open, onOpenChange, zone }: EditZoneDialogProps) {
  const [areaName, setAreaName] = useState(zone.name);
  const [zoneNumber, setZoneNumber] = useState(zone.number);
  const [isMainZone, setIsMainZone] = useState(zone.isMainZone);
  const [parentZoneNumber, setParentZoneNumber] = useState(zone.parentZoneNumber || "");
  const [isOpenCall, setIsOpenCall] = useState(zone.isOpenCall);
  const [zoneColor, setZoneColor] = useState(zone.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number][]>(zone.coordinates);

  const updateZone = useZoneStore((state) => state.updateZone);

  useEffect(() => {
    setAreaName(zone.name);
    setZoneNumber(zone.number);
    setIsMainZone(zone.isMainZone);
    setParentZoneNumber(zone.parentZoneNumber || "");
    setIsOpenCall(zone.isOpenCall);
    setZoneColor(zone.color);
    setCoordinates(zone.coordinates);
  }, [zone]);

  const handleSave = useCallback(() => {
    if (!areaName || !zoneNumber || !coordinates.length) {
      toast.error("Please fill in all required fields and draw the zone");
      return;
    }

    updateZone(zone.id, {
      name: areaName,
      number: zoneNumber,
      isMainZone,
      parentZoneNumber: isMainZone ? undefined : parentZoneNumber,
      isOpenCall,
      color: zoneColor,
      coordinates,
    });

    toast.success("Zone updated successfully");
    onOpenChange(false);
  }, [
    zone.id,
    areaName,
    zoneNumber,
    isMainZone,
    parentZoneNumber,
    isOpenCall,
    zoneColor,
    coordinates,
    updateZone,
    onOpenChange,
  ]);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const coords = layer.getLatLngs()[0].map((latLng: any) => [
      latLng.lat,
      latLng.lng,
    ]);
    setCoordinates(coords);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Zone</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="areaName">Area Name</Label>
              <Input
                id="areaName"
                placeholder="e.g., Iqaluit"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
              />
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
                onCheckedChange={setIsMainZone}
              />
            </div>
            {!isMainZone && (
              <div className="space-y-2">
                <Label htmlFor="parentZone">Parent Zone Number</Label>
                <Input
                  id="parentZone"
                  value={parentZoneNumber}
                  onChange={(e) => setParentZoneNumber(e.target.value)}
                />
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
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <Palette className="h-4 w-4" />
                <span>Zone Color</span>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: zoneColor }}
                />
              </Button>
              {showColorPicker && (
                <div className="absolute top-full mt-2 z-50">
                  <ChromePicker
                    color={zoneColor}
                    onChange={(color) => setZoneColor(color.hex)}
                  />
                </div>
              )}
            </div>
            <Button
              variant={isDrawingMode ? "default" : "outline"}
              className="flex items-center space-x-2"
              onClick={() => setIsDrawingMode(!isDrawingMode)}
            >
              <Pencil className="h-4 w-4" />
              <span>{isDrawingMode ? "Drawing Mode Active" : "Start Drawing"}</span>
            </Button>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              center={[63.7467, -68.5170]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FeatureGroup>
                <EditControl
                  position="topright"
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
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}