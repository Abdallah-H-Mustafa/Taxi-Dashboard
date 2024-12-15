"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Address } from "@/lib/stores/address-store";
import { Badge } from "@/components/ui/badge";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ViewAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: Address;
}

export function ViewAddressDialog({ open, onOpenChange, address }: ViewAddressDialogProps) {
  const zones = address.zones ? address.zones.split(" | ") : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>View Address Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Street Address</h3>
              <p>{address.streetAddress}</p>
            </div>
            {address.commercialName && (
              <div>
                <h3 className="font-semibold mb-1">Business Name</h3>
                <p>{address.commercialName}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-1">City</h3>
              <p>{address.city}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Region</h3>
              <p>{address.region}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Postal Code</h3>
              <p>{address.postalCode}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Zones</h3>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone, index) => (
                <Badge key={index} variant="secondary">
                  {zone}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <MapContainer
                center={[address.coordinates.lat, address.coordinates.lng]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[address.coordinates.lat, address.coordinates.lng]}
                  icon={icon}
                />
              </MapContainer>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}