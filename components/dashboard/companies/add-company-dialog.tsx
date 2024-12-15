"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useCompanyStore } from "@/lib/stores/company-store";
import { useZoneStore } from "@/lib/stores/zone-store";
import { useAddressStore } from "@/lib/stores/address-store";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    fleetSize: "",
    status: "active" as const,
    dispatchSettings: {
      maxTripsPerDriver: "10",
      maxWaitTime: "15",
      autoAssign: true,
      allowOpenCalls: true,
      zoneRestrictions: true,
      dispatchMode: "balanced" as const
    },
    mainZone: {
      name: "",
      coordinates: [] as [number, number][],
      color: "#4CAF50",
      isOpenCall: false
    }
  });

  const addCompany = useCompanyStore((state) => state.addCompany);
  const addZone = useZoneStore((state) => state.addZone);
  const addAddress = useAddressStore((state) => state.addAddress);

  const handleZoneCreated = (e: any) => {
    const layer = e.layer;
    const coordinates = layer.getLatLngs()[0].map((latLng: any) => [
      latLng.lat,
      latLng.lng,
    ]);
    setFormData(prev => ({
      ...prev,
      mainZone: {
        ...prev.mainZone,
        coordinates
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.mainZone.coordinates.length) {
        toast.error("Please draw the company's main service zone on the map");
        return;
      }

      // Create company
      const companyId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const company = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        status: formData.status,
        fleetSize: parseInt(formData.fleetSize),
        dispatchSettings: formData.dispatchSettings
      };

      addCompany(company);

      // Create main zone for the company
      const zoneNumber = `MZ-${companyId}-001`;
      addZone({
        name: `${formData.name} Main Zone`,
        number: zoneNumber,
        isMainZone: true,
        isOpenCall: formData.mainZone.isOpenCall,
        color: formData.mainZone.color,
        coordinates: formData.mainZone.coordinates
      });

      // Add company address
      addAddress({
        streetAddress: formData.address,
        commercialName: formData.name,
        city: "Iqaluit",
        region: "Nunavut",
        postalCode: "X0A 0H0",
        zones: zoneNumber,
        coordinates: {
          lat: formData.mainZone.coordinates[0][0],
          lng: formData.mainZone.coordinates[0][1]
        }
      });

      toast.success("Company created successfully with dispatch interface");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-6 pr-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fleet Size</Label>
                <Input
                  type="number"
                  value={formData.fleetSize}
                  onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Dispatch Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Trips Per Driver</Label>
                  <Input
                    type="number"
                    value={formData.dispatchSettings.maxTripsPerDriver}
                    onChange={(e) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        maxTripsPerDriver: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Wait Time (minutes)</Label>
                  <Input
                    type="number"
                    value={formData.dispatchSettings.maxWaitTime}
                    onChange={(e) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        maxWaitTime: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dispatch Mode</Label>
                  <Select
                    value={formData.dispatchSettings.dispatchMode}
                    onValueChange={(value: any) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        dispatchMode: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="nearest">Nearest Driver</SelectItem>
                      <SelectItem value="rating">Best Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.dispatchSettings.autoAssign}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        autoAssign: checked
                      }
                    })}
                  />
                  <Label>Auto-assign Trips</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.dispatchSettings.allowOpenCalls}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        allowOpenCalls: checked
                      }
                    })}
                  />
                  <Label>Allow Open Calls</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.dispatchSettings.zoneRestrictions}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      dispatchSettings: {
                        ...formData.dispatchSettings,
                        zoneRestrictions: checked
                      }
                    })}
                  />
                  <Label>Enable Zone Restrictions</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Service Zone</h3>
              <p className="text-sm text-muted-foreground">
                Draw the company's main service zone on the map
              </p>
              <div className="h-[300px] rounded-lg overflow-hidden">
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
                      onCreated={handleZoneCreated}
                      draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        polygon: {
                          allowIntersection: false,
                          drawError: {
                            color: "#e1e4e8",
                            message: "Shape intersections not allowed"
                          },
                          shapeOptions: {
                            color: formData.mainZone.color
                          }
                        }
                      }}
                    />
                  </FeatureGroup>
                </MapContainer>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.mainZone.isOpenCall}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    mainZone: {
                      ...formData.mainZone,
                      isOpenCall: checked
                    }
                  })}
                />
                <Label>Enable Open Calls in Main Zone</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Company</Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}