"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit2, Ban } from "lucide-react";
import { useDriverStore } from "@/lib/stores/driver-store";
import { DriverProfileDialog } from "../drivers/driver-profile-dialog";

interface DriverListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DriverListDialog({ open, onOpenChange }: DriverListDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const { drivers } = useDriverStore();

  const filteredDrivers = Array.from(drivers.values()).filter(driver => {
    const matchesSearch = 
      `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedDriverData = selectedDriver ? drivers.get(selectedDriver) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Driver Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium">Driver</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Rating</th>
                  <th className="text-left p-3 text-sm font-medium">Total Trips</th>
                  <th className="text-left p-3 text-sm font-medium">Vehicle</th>
                  <th className="text-left p-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{driver.firstName} {driver.lastName}</div>
                        <div className="text-sm text-muted-foreground">{driver.phone}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          driver.status === "available"
                            ? "success"
                            : driver.status === "busy"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {driver.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span>{driver.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="p-3">{driver.totalTrips}</td>
                    <td className="p-3">
                      {driver.vehicle ? (
                        <div>
                          <div className="font-medium">{driver.vehicle.make} {driver.vehicle.model}</div>
                          <div className="text-sm text-muted-foreground">{driver.vehicle.licensePlate}</div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDriver(driver.id)}
                        >
                          <Eye className="h-4 w-4" />
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

      {selectedDriverData && (
        <DriverProfileDialog
          open={!!selectedDriver}
          onOpenChange={(open) => !open && setSelectedDriver(null)}
          driver={selectedDriverData}
        />
      )}
    </Dialog>
  );
}