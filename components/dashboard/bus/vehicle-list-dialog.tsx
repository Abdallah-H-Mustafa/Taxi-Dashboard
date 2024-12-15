"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit2, Ban } from "lucide-react";
import { useBusVehicleStore } from "@/lib/stores/bus-vehicle-store";
import { BusVehicleProfileDialog } from "./vehicle-profile-dialog";

interface VehicleListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusVehicleListDialog({ open, onOpenChange }: VehicleListDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const { vehicles } = useBusVehicleStore();

  const filteredVehicles = Array.from(vehicles.values()).filter(vehicle => {
    const matchesSearch = 
      vehicle.fleetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedVehicleData = selectedVehicle ? vehicles.get(selectedVehicle) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bus Fleet Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fleet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="out_of_service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium">Fleet #</th>
                  <th className="text-left p-3 text-sm font-medium">Vehicle</th>
                  <th className="text-left p-3 text-sm font-medium">Capacity</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Current Route</th>
                  <th className="text-left p-3 text-sm font-medium">Driver</th>
                  <th className="text-left p-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b last:border-0">
                    <td className="p-3 font-mono">{vehicle.fleetNumber}</td>
                    <td className="p-3">
                      <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                      <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                    </td>
                    <td className="p-3">{vehicle.capacity} passengers</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          vehicle.status === "active"
                            ? "success"
                            : vehicle.status === "maintenance"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </td>
                    <td className="p-3">{vehicle.currentRoute || "—"}</td>
                    <td className="p-3">{vehicle.currentDriver || "—"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedVehicle(vehicle.id);
                            setShowProfileDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>

      {selectedVehicleData && (
        <BusVehicleProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          vehicle={selectedVehicleData}
        />
      )}
    </Dialog>
  );
}