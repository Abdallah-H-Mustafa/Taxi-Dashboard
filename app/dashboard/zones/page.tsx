"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { Map, List, Plus, Trash2, Eye, X, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddZoneDialog } from "@/components/dashboard/zones/add-zone-dialog";
import { EditZoneDialog } from "@/components/dashboard/zones/edit-zone-dialog";
import { useZoneStore } from "@/lib/stores/zone-store";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";

export default function ZonesPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingZone, setEditingZone] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();

  const { zones, deleteZone, getZone } = useZoneStore();

  const handleDeleteZone = (id: string) => {
    deleteZone(id);
    toast.success("Zone deleted successfully");
  };

  const handleClose = () => {
    router.back();
  };

  const selectedZone = editingZone ? getZone(editingZone) : null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="font-medium">Zone Management</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Map className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Zone Management</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4 mr-2" />
            All Zones
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            All Map
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Zone
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {zones.map((zone) => (
            <Card key={zone.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="truncate">{zone.name}</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Zone Number: {zone.number}
                  </p>
                  <p className="text-muted-foreground">
                    Type: {zone.isMainZone ? "Main Zone" : "Sub Zone"}
                  </p>
                  {!zone.isMainZone && zone.parentZoneNumber && (
                    <p className="text-muted-foreground">
                      Parent Zone: {zone.parentZoneNumber}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    Open Call: {zone.isOpenCall ? "Yes" : "No"}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setEditingZone(zone.id)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleDeleteZone(zone.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-12rem)]">
              <MapContainer
                center={[63.7467, -68.5170]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingZone(zone.id)}
                        >
                          Edit Zone
                        </Button>
                      </div>
                    </Popup>
                  </Polygon>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <AddZoneDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      {selectedZone && (
        <EditZoneDialog
          open={!!editingZone}
          onOpenChange={(open) => !open && setEditingZone(null)}
          zone={selectedZone}
        />
      )}
    </div>
  );
}