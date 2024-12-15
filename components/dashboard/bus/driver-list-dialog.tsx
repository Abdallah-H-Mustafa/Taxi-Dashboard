"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit2, Ban } from "lucide-react";
import { useBusDriverStore } from "@/lib/stores/bus-driver-store";
import { BusDriverProfileDialog } from "./driver-profile-dialog";

interface DriverListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusDriverListDialog({ open, onOpenChange }: DriverListDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const { drivers } = useBusDriverStore();

  const filteredDrivers = Array.from(drivers.values()).filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedDriverData = selectedDriver ? drivers.get(selectedDriver) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bus Driver Management</DialogTitle>
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_break">On Break</SelectItem>
                <SelectItem value="off_duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium">Driver</th>
                  <th className="text-left p-3 text-sm font-medium">Employee ID</th>
                  <th className="text-left p-3 text-sm font-medium">License</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                  <th className="text-left p-3 text-sm font-medium">Current Route</th>
                  <th className="text-left p-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="font-medium">{driver.name}</div>
                    </td>
                    <td className="p-3">{driver.employeeId}</td>
                    <td className="p-3">{driver.licenseNumber}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          driver.status === "active"
                            ? "success"
                            : driver.status === "on_break"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {driver.status}
                      </Badge>
                    </td>
                    <td className="p-3">{driver.currentRoute || "—"}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDriver(driver.id);
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

      {selectedDriverData && (
        <BusDriverProfileDialog
          open={showProfileDialog}
          onOpenChange={setShowProfileDialog}
          driver={selectedDriverData}
        />
      )}
    </Dialog>
  );
}