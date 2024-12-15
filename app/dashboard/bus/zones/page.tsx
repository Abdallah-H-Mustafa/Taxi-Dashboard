"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { Search, Plus, MapPin } from "lucide-react";
import { AddZoneDialog } from "@/components/dashboard/bus/add-zone-dialog";
import { useBusZoneStore } from "@/lib/stores/bus-zone-store";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";

export default function BusZonesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { zones, addZone } = useBusZoneStore();

  const filteredZones = zones.filter(zone =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleZoneAdd = (zoneData: any) => {
    try {
      addZone({
        ...zoneData,
        routes: [],
        stops: [],
        schedule: {
          weekday: [],
          weekend: []
        }
      });
      toast.success("Bus zone added successfully");
    } catch (error) {
      toast.error("Failed to add bus zone");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bus Zones</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search zones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Zone
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
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
              {filteredZones.map((zone) => (
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
                      <p className="text-sm text-muted-foreground">
                        Stops: {zone.stops.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Routes: {zone.routes.length}
                      </p>
                    </div>
                  </Popup>
                </Polygon>
              ))}
            </MapContainer>
          </div>
        </Card>
      </div>

      <AddZoneDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onZoneAdd={handleZoneAdd}
      />
    </div>
  );
}