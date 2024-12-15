"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Driver } from "@/types/driver";
import { DriverDocuments } from "./driver-documents";
import { DriverBanking } from "./driver-banking";
import { DriverGasExpenses } from "./driver-gas-expenses";
import { DriverEarnings } from "./driver-earnings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";

interface DriverProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver;
}

export function DriverProfileDialog({ open, onOpenChange, driver }: DriverProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [phone, setPhone] = useState(driver.phone);
  const [gpsTracking, setGpsTracking] = useState(driver.location?.gpsEnabled ?? true);

  const handlePhoneUpdate = () => {
    const updatedDriver = {
      ...driver,
      phone,
    };
    useDriverStore.getState().drivers.set(driver.id, updatedDriver);
    toast.success("Phone number updated successfully");
  };

  const handleGpsToggle = (enabled: boolean) => {
    const updatedDriver = {
      ...driver,
      location: {
        ...(driver.location || { lat: 0, lng: 0, timestamp: new Date().toISOString() }),
        gpsEnabled: enabled,
      },
    };
    useDriverStore.getState().drivers.set(driver.id, updatedDriver);
    setGpsTracking(enabled);
    toast.success(enabled ? "GPS tracking enabled" : "GPS tracking disabled");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Driver Profile: {driver.firstName} {driver.lastName}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="gas">Gas Expenses</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Button onClick={handlePhoneUpdate}>Update</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>GPS Tracking</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={gpsTracking}
                    onCheckedChange={handleGpsToggle}
                  />
                  <span className="text-sm text-muted-foreground">
                    {gpsTracking ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <DriverDocuments driver={driver} onUpdate={() => {}} />
          </TabsContent>

          <TabsContent value="banking">
            <DriverBanking driver={driver} onUpdate={() => {}} />
          </TabsContent>

          <TabsContent value="gas">
            <DriverGasExpenses driver={driver} onUpdate={() => {}} />
          </TabsContent>

          <TabsContent value="earnings">
            <DriverEarnings driver={driver} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}