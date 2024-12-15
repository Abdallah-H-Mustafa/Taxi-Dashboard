"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const BUSINESS_TYPES = [
  { id: "restaurant", name: "Restaurant", features: ["Menu", "Delivery", "Takeout"] },
  { id: "convenience_store", name: "Convenience Store", features: ["Inventory", "24/7"] },
  { id: "cafe", name: "Cafe", features: ["Coffee", "Pastries", "WiFi"] },
  { id: "grocery", name: "Grocery Store", features: ["Fresh Produce", "Deli"] },
  { id: "bakery", name: "Bakery", features: ["Fresh Bread", "Custom Orders"] },
  { id: "food_truck", name: "Food Truck", features: ["Mobile", "Street Food"] },
  { id: "fast_food", name: "Fast Food", features: ["Drive-thru", "Quick Service"] },
  { id: "deli", name: "Deli", features: ["Fresh Sandwiches", "Catering"] }
];

export default function AddBusinessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    coordinates: { lat: 63.7467, lng: -68.5170 },
    openingHours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "10:00", close: "16:00" },
      sunday: { open: "10:00", close: "16:00" }
    },
    features: {
      delivery: false,
      takeout: false,
      dineIn: false,
      onlineOrdering: false,
      reservations: false,
      wifi: false,
    }
  });

  const selectedType = BUSINESS_TYPES.find(type => type.id === formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add business logic here
      toast.success("Business added successfully");
      router.push("/dashboard/businesses");
    } catch (error) {
      toast.error("Failed to add business");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New Business</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Business Type Selection */}
            <div className="space-y-4">
              <Label>Select Business Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BUSINESS_TYPES.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData.type === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                  >
                    <h3 className="font-medium">{type.name}</h3>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {type.features.map((feature) => (
                        <li key={feature}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {formData.type && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={`Tell us about your ${selectedType?.name.toLowerCase()}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location on Map</Label>
                  <div className="h-[300px] rounded-lg overflow-hidden">
                    <MapContainer
                      center={[formData.coordinates.lat, formData.coordinates.lng]}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[formData.coordinates.lat, formData.coordinates.lng]}
                        icon={icon}
                        draggable={true}
                        eventHandlers={{
                          dragend: (e) => {
                            const marker = e.target;
                            const position = marker.getLatLng();
                            setFormData({
                              ...formData,
                              coordinates: {
                                lat: position.lat,
                                lng: position.lng,
                              },
                            });
                          },
                        }}
                      />
                    </MapContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Features & Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedType?.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Switch
                          id={feature}
                          checked={formData.features[feature.toLowerCase().replace(" ", "_")] || false}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              features: {
                                ...formData.features,
                                [feature.toLowerCase().replace(" ", "_")]: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor={feature}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={!formData.type}>
            Add Business
          </Button>
        </div>
      </form>
    </div>
  );
}