"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChromePicker } from "react-color";
import { ZoneMap } from "./zone-map";
import { toast } from "sonner";

interface AddZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onZoneAdd?: (zoneData: any) => void;
}

export function AddZoneDialog({ open, onOpenChange, onZoneAdd }: AddZoneDialogProps) {
  const [zoneName, setZoneName] = useState("");
  const [zoneNumber, setZoneNumber] = useState("");
  const [isMainZone, setIsMainZone] = useState(true);
  const [isOpenCall, setIsOpenCall] = useState(false);
  const [zoneColor, setZoneColor] = useState("#4CAF50");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  const handleSubmit = () => {
    if (!zoneName || !zoneNumber || coordinates.length === 0) {
      toast.error("Please fill in all required fields and draw the zone");
      return;
    }

    const zoneData = {
      name: zoneName,
      number: zoneNumber,
      isMainZone,
      isOpenCall,
      color: zoneColor,
      coordinates
    };

    onZoneAdd?.(zoneData);
    onOpenChange(false);

    // Reset form
    setZoneName("");
    setZoneNumber("");
    setIsMainZone(true);
    setIsOpenCall(false);
    setZoneColor("#4CAF50");
    setCoordinates([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Zone</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zoneName">Zone Name</Label>
              <Input
                id="zoneName"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder="Enter zone name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zoneNumber">Zone Number</Label>
              <Input
                id="zoneNumber"
                value={zoneNumber}
                onChange={(e) => setZoneNumber(e.target.value)}
                placeholder="Enter zone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="mainZone"
                checked={isMainZone}
                onCheckedChange={setIsMainZone}
              />
              <Label htmlFor="mainZone">Main Zone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="openCall"
                checked={isOpenCall}
                onCheckedChange={setIsOpenCall}
              />
              <Label htmlFor="openCall">Open Call Zone</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Zone Color</Label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-between"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <span>Select Color</span>
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: zoneColor }}
                />
              </Button>
              {showColorPicker && (
                <div className="absolute z-10 mt-2">
                  <ChromePicker
                    color={zoneColor}
                    onChange={(color) => setZoneColor(color.hex)}
                  />
                </div>
              )}
            </div>
          </div>

          <ZoneMap
            onZoneDrawn={setCoordinates}
            zoneColor={zoneColor}
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Zone
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}