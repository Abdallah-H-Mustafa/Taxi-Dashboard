"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleList } from "@/components/dashboard/vehicles/vehicle-list";
import { AddVehicleDialog } from "@/components/dashboard/vehicles/add-vehicle-dialog";
import { EditVehicleDialog } from "@/components/dashboard/vehicles/edit-vehicle-dialog";
import { ViewVehicleDialog } from "@/components/dashboard/vehicles/view-vehicle-dialog";
import { VehicleHeader } from "@/components/dashboard/vehicles/vehicle-header";
import { useVehicleStore } from "@/lib/stores/vehicle-store";
import { Button } from "@/components/ui/button";
import { X, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VehiclesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const { vehicles } = useVehicleStore();
  const router = useRouter();

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setShowViewDialog(true);
  };

  const handleEdit = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setShowEditDialog(true);
  };

  const handleClose = () => {
    router.back();
  };

  const selectedVehicleData = selectedVehicle ? vehicles.find(v => v.id === selectedVehicle) : null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Vehicle Management</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Minimize2 className="h-4 w-4" />
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
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <VehicleHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddVehicle={() => setShowAddDialog(true)}
        />
        <div className="flex items-center gap-2">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="add" onClick={() => setShowAddDialog(true)}>Add</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <div className="p-6">
              <VehicleList
                vehicles={filteredVehicles}
                onView={handleView}
                onEdit={handleEdit}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <AddVehicleDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {selectedVehicleData && (
        <>
          <ViewVehicleDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            vehicle={selectedVehicleData}
          />
          <EditVehicleDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            vehicle={selectedVehicleData}
          />
        </>
      )}
    </div>
  );
}