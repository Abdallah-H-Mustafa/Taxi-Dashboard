"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverList } from "@/components/dashboard/drivers/driver-list";
import { AddDriverDialog } from "@/components/dashboard/drivers/add-driver-dialog";
import { EditDriverDialog } from "@/components/dashboard/drivers/edit-driver-dialog";
import { ViewDriverDialog } from "@/components/dashboard/drivers/view-driver-dialog";
import { useDriverStore } from "@/lib/stores/driver-store";

export default function DriversPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { drivers } = useDriverStore();

  const handleView = (driverId: string) => {
    setSelectedDriver(driverId);
    setShowViewDialog(true);
  };

  const handleEdit = (driverId: string) => {
    setSelectedDriver(driverId);
    setShowEditDialog(true);
  };

  const selectedDriverData = selectedDriver ? drivers.get(selectedDriver) : null;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Driver Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="add" onClick={() => setShowAddDialog(true)}>Add</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <DriverList
              onView={handleView}
              onEdit={handleEdit}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <AddDriverDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {selectedDriverData && (
        <>
          <ViewDriverDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            driver={selectedDriverData}
          />
          <EditDriverDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            driver={selectedDriverData}
          />
        </>
      )}
    </div>
  );
}