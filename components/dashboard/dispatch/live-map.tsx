"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZoneStore } from "@/lib/stores/zone-store";
import { 
  Clock, 
  Battery, 
  Wifi, 
  Maximize2, 
  ArrowUpRight,
  Search,
  Layers,
  Car,
  X,
  Minimize2
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom vehicle icons
const createVehicleIcon = (color: string) => L.divIcon({
  className: 'custom-vehicle-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background-color: ${color};
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16">
        <path d="M19 12a1 1 0 0 1-1 1h-1.278l-.824 2.062A2.5 2.5 0 0 1 13.5 17h-3a2.5 2.5 0 0 1-2.398-1.938L7.278 13H6a1 1 0 1 1 0-2h1.5l.5-1.5A3 3 0 0 1 10.818 7h2.364A3 3 0 0 1 16 9.5l.5 1.5H18a1 1 0 0 1 1 1zM8.5 14.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const vehicleIcons = {
  available: createVehicleIcon('#10B981'), // green
  busy: createVehicleIcon('#3B82F6'), // blue
  out_of_service: createVehicleIcon('#EF4444'), // red
  online: createVehicleIcon('#FFFFFF'), // white
};

// Mock data - replace with actual API calls
const mockVehicles = [
  { id: "v1", number: "CAB001", driver: "John Doe", status: "available", position: [63.7467, -68.5170] },
  { id: "v2", number: "CAB002", driver: "Jane Smith", status: "busy", position: [63.7500, -68.5100] },
  { id: "v3", number: "CAB003", driver: "Mike Johnson", status: "out_of_service", position: [63.7400, -68.5200] },
  { id: "v4", number: "CAB004", driver: "Sarah Wilson", status: "online", position: [63.7450, -68.5150] },
];

interface LiveMapProps {
  isOpen?: boolean;
  onClose?: () => void;
  isFullPage?: boolean;
}

export function LiveMap({ isOpen = false, onClose, isFullPage = false }: LiveMapProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showZones, setShowZones] = useState(true);
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const zones = useZoneStore((state) => state.zones);

  useEffect(() => {
    const filtered = mockVehicles.filter(
      (vehicle) =>
        vehicle.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-blue-500";
      case "out_of_service":
        return "bg-red-500";
      case "online":
        return "bg-white";
      default:
        return "bg-gray-500";
    }
  };

  const vehicleCounts = mockVehicles.reduce(
    (acc, vehicle) => {
      acc[vehicle.status]++;
      return acc;
    },
    { available: 0, busy: 0, out_of_service: 0, online: 0 }
  );

  if (!isOpen && !isFullPage) return null;

  if (isMinimized && !isFullPage) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span className="font-medium">Live Map</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mapContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Available: {vehicleCounts.available}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            Busy: {vehicleCounts.busy}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            Out of Service: {vehicleCounts.out_of_service}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border" />
            Online: {vehicleCounts.online}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by vehicle # or driver"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowZones(!showZones)}
          >
            <Layers className="h-4 w-4" />
          </Button>
          {!isFullPage && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/dashboard/live-map")}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </>
          )}
          {onClose && (
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className={`rounded-lg overflow-hidden ${isFullPage ? 'h-[calc(100vh-12rem)]' : 'h-[600px]'}`}>
        <MapContainer
          center={[63.7467, -68.5170]} // Iqaluit coordinates
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {showZones && (
            <LayerGroup>
              {zones.map((zone) => (
                <Polygon
                  key={zone.id}
                  positions={zone.coordinates}
                  pathOptions={{
                    color: zone.color,
                    fillOpacity: 0.2,
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{zone.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Zone Number: {zone.number}
                      </p>
                    </div>
                  </Popup>
                </Polygon>
              ))}
            </LayerGroup>
          )}

          <LayerGroup>
            {filteredVehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={vehicle.position}
                icon={vehicleIcons[vehicle.status as keyof typeof vehicleIcons]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium">{vehicle.number}</h3>
                    <p className="text-sm text-muted-foreground">
                      Driver: {vehicle.driver}
                    </p>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </MapContainer>
      </div>
    </>
  );

  if (isFullPage) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Live Map</h2>
        </div>
        {mapContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-4 z-50">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Live Map</CardTitle>
        </CardHeader>
        <CardContent>
          {mapContent}
        </CardContent>
      </Card>
    </div>
  );
}