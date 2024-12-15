"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function ZoneSettings() {
  const [settings, setSettings] = useState({
    autoAssignment: true,
    crossZoneBooking: true,
    zoneBasedPricing: true,
    restrictDriverZones: true,
    openCallZones: true,
    zoneOverlap: false,
    defaultZoneSettings: {
      maxDrivers: '10',
      maxWaitTime: '15',
      surgeMultiplier: '1.5',
      minimumDrivers: '2'
    },
    prioritySettings: {
      highDemand: '5',
      normalDemand: '3',
      lowDemand: '1'
    }
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success("Zone settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Zone Behavior Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Zone Assignment</Label>
                <Switch 
                  checked={settings.autoAssignment}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, autoAssignment: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Cross-Zone Booking</Label>
                <Switch 
                  checked={settings.crossZoneBooking}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, crossZoneBooking: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Zone-Based Pricing</Label>
                <Switch 
                  checked={settings.zoneBasedPricing}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, zoneBasedPricing: checked }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Restrict Driver Zones</Label>
                <Switch 
                  checked={settings.restrictDriverZones}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, restrictDriverZones: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Open Call Zones</Label>
                <Switch 
                  checked={settings.openCallZones}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, openCallZones: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Allow Zone Overlap</Label>
                <Switch 
                  checked={settings.zoneOverlap}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, zoneOverlap: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Default Zone Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Maximum Drivers</Label>
                <Input 
                  type="number"
                  value={settings.defaultZoneSettings.maxDrivers}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    defaultZoneSettings: {
                      ...s.defaultZoneSettings,
                      maxDrivers: e.target.value
                    }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Minimum Drivers</Label>
                <Input 
                  type="number"
                  value={settings.defaultZoneSettings.minimumDrivers}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    defaultZoneSettings: {
                      ...s.defaultZoneSettings,
                      minimumDrivers: e.target.value
                    }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Wait Time (minutes)</Label>
                <Input 
                  type="number"
                  value={settings.defaultZoneSettings.maxWaitTime}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    defaultZoneSettings: {
                      ...s.defaultZoneSettings,
                      maxWaitTime: e.target.value
                    }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Surge Price Multiplier</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={settings.defaultZoneSettings.surgeMultiplier}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    defaultZoneSettings: {
                      ...s.defaultZoneSettings,
                      surgeMultiplier: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Priority Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>High Demand Priority</Label>
                <Input 
                  type="number"
                  value={settings.prioritySettings.highDemand}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    prioritySettings: {
                      ...s.prioritySettings,
                      highDemand: e.target.value
                    }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Normal Demand Priority</Label>
                <Input 
                  type="number"
                  value={settings.prioritySettings.normalDemand}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    prioritySettings: {
                      ...s.prioritySettings,
                      normalDemand: e.target.value
                    }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Low Demand Priority</Label>
                <Input 
                  type="number"
                  value={settings.prioritySettings.lowDemand}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    prioritySettings: {
                      ...s.prioritySettings,
                      lowDemand: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Zone Settings</Button>
      </div>
    </div>
  );
}