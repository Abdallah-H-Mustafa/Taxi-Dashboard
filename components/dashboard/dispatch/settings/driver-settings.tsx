"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function DriverSettings() {
  const [settings, setSettings] = useState({
    driverAssignment: {
      autoAssign: true,
      maxActiveDrivers: "50",
      maxShiftHours: "12",
      requireBreak: true,
      breakDuration: "30",
      zoneRestrictions: true
    },
    driverRules: {
      minimumRating: "4.5",
      maximumCancellations: "3",
      blockIfGpsDisabled: true,
      requirePhotoVerification: true,
      allowMultipleVehicles: false
    },
    driverPreferences: {
      preferredZones: true,
      allowZoneChange: true,
      allowScheduledTrips: true,
      priorityDispatch: true
    }
  });

  const handleSave = () => {
    toast.success("Driver settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Driver Assignment Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Active Drivers</Label>
              <Input
                type="number"
                value={settings.driverAssignment.maxActiveDrivers}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  driverAssignment: { ...s.driverAssignment, maxActiveDrivers: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Shift Hours</Label>
              <Input
                type="number"
                value={settings.driverAssignment.maxShiftHours}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  driverAssignment: { ...s.driverAssignment, maxShiftHours: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Auto Assignment</Label>
              <Switch
                checked={settings.driverAssignment.autoAssign}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverAssignment: { ...s.driverAssignment, autoAssign: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Zone Restrictions</Label>
              <Switch
                checked={settings.driverAssignment.zoneRestrictions}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverAssignment: { ...s.driverAssignment, zoneRestrictions: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Driver Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={settings.driverRules.minimumRating}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  driverRules: { ...s.driverRules, minimumRating: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Daily Cancellations</Label>
              <Input
                type="number"
                value={settings.driverRules.maximumCancellations}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  driverRules: { ...s.driverRules, maximumCancellations: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Block if GPS Disabled</Label>
              <Switch
                checked={settings.driverRules.blockIfGpsDisabled}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverRules: { ...s.driverRules, blockIfGpsDisabled: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Require Photo Verification</Label>
              <Switch
                checked={settings.driverRules.requirePhotoVerification}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverRules: { ...s.driverRules, requirePhotoVerification: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Driver Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Allow Zone Change</Label>
              <Switch
                checked={settings.driverPreferences.allowZoneChange}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverPreferences: { ...s.driverPreferences, allowZoneChange: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Scheduled Trips</Label>
              <Switch
                checked={settings.driverPreferences.allowScheduledTrips}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  driverPreferences: { ...s.driverPreferences, allowScheduledTrips: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Driver Settings</Button>
      </div>
    </div>
  );
}