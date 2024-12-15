"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useAddressStore, Address } from "@/lib/stores/address-store";
import { useZoneStore } from "@/lib/stores/zone-store";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: Address;
}

export function EditAddressDialog({ open, onOpenChange, address }: EditAddressDialogProps) {
  const [streetAddress, setStreetAddress] = useState(address.streetAddress);
  const [commercialName, setCommercialName] = useState(address.commercialName || "");
  const [city, setCity] = useState(address.city);
  const [region, setRegion] = useState(address.region);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [zones, setZones] = useState(Array(9).fill("none"));
  const [coordinates, setCoordinates] = useState(address.coordinates);

  const updateAddress = useAddressStore((state) => state.updateAddress);
  const allZones = useZoneStore((state) => state.zones);

  // Group zones by main/sub zones
  const mainZones = allZones.filter(z => z.isMainZone);
  const subZones = allZones.filter(z => !z.isMainZone);

  // Update form when address prop changes
  useEffect(() => {
    setStreetAddress(address.streetAddress);
    setCommercialName(address.commercialName || "");
    setCity(address.city);
    setRegion(address.region);
    setPostalCode(address.postalCode);
    
    // Initialize zones from the address
    const addressZones = address.zones ? address.zones.split(" | ") : [];
    const newZones = Array(9).fill("none");
    addressZones.forEach((zone, index) => {
      if (index < 9) {
        newZones[index] = zone;
      }
    });
    setZones(newZones);
    
    setCoordinates(address.coordinates);
  }, [address]);

  const handleZoneChange = (index: number, value: string) => {
    const newZones = [...zones];
    newZones[index] = value;
    setZones(newZones);
  };

  const handleSubmit = () => {
    if (!streetAddress || !city || !region || !postalCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateAddress(address.id, {
      streetAddress,
      commercialName: commercialName || undefined,
      city,
      region,
      postalCode,
      zones: zones.filter(zone => zone !== "none").join(" | "),
      coordinates,
    });

    toast.success("Address updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commercialName">Business Name (Optional)</Label>
              <Input
                id="commercialName"
                value={commercialName}
                onChange={(e) => setCommercialName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Zones</Label>
            <div className="grid grid-cols-9 gap-2">
              {zones.map((zone, index) => (
                <Select
                  key={index}
                  value={zone}
                  onValueChange={(value) => handleZoneChange(index, value)}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder={`Zone ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {mainZones.map((mainZone) => (
                      <SelectItem
                        key={mainZone.id}
                        value={mainZone.number}
                        className="text-sm"
                      >
                        {mainZone.name} ({mainZone.number})
                      </SelectItem>
                    ))}
                    {subZones.map((subZone) => (
                      <SelectItem
                        key={subZone.id}
                        value={subZone.number}
                        className="text-sm pl-6"
                      >
                        {subZone.name} ({subZone.number})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[coordinates.lat, coordinates.lng]}
                  icon={icon}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      const marker = e.target;
                      const position = marker.getLatLng();
                      setCoordinates({
                        lat: position.lat,
                        lng: position.lng,
                      });
                    },
                  }}
                />
              </MapContainer>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}