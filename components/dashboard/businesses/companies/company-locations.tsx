"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, Plus, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  coordinates: [number, number];
  status: 'active' | 'inactive';
  company: string;
}

const LOCATIONS: Location[] = [
  {
    id: "1",
    name: "Northern Enterprises - HQ",
    type: "Headquarters",
    address: "123 Main St, Iqaluit",
    coordinates: [63.7467, -68.5170],
    status: "active",
    company: "Northern Enterprises Ltd"
  },
  {
    id: "2",
    name: "Arctic Solutions - Main Office",
    type: "Office",
    address: "456 Innovation Ave, Iqaluit",
    coordinates: [63.7500, -68.5100],
    status: "active",
    company: "Arctic Solutions Inc"
  }
];

export function CompanyLocations() {
  const [locations] = useState<Location[]>(LOCATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="p-0">
          <div className="h-[600px]">
            <MapContainer
              center={[63.7467, -68.5170]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedLocation(location),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {location.address}
                      </p>
                      <Badge className="mt-2" variant="secondary">
                        {location.type}
                      </Badge>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>

        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-colors ${
                selectedLocation?.id === location.id ? "border-primary" : ""
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{location.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {location.address}
                    </div>
                  </div>
                  <Badge variant={location.status === "active" ? "success" : "secondary"}>
                    {location.status}
                  </Badge>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">{location.type}</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}