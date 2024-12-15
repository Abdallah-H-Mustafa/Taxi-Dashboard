"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function DispatchRules() {
  const [settings, setSettings] = useState({
    autoAssignment: {
      enabled: true,
      mode: 'balanced',
      maxTripsPerDriver: '3',
      maxWaitTime: '10',
      priorityToRegulars: true
    },
    driverPreferences: {
      respectZones: true,
      allowMultipleTrips: true,
      enforceBreaks: true,
      minimumRating: '4.5'
    },
    tripRules: {
      allowCancellations: true,
      cancellationWindow: '5',
      requireDestination: true,
      maxDistance: '50'
    },
    queueSettings: {
      maxQueueSize: '50',
      queueTimeout: '15',
      priorityBooking: true,
      allowScheduled: true
    }
  });

  const handleSave = () => {
    toast.success("Dispatch rules saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto Assignment Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enable Auto Assignment</Label>
                <Switch 
                  checked={settings.autoAssignment.enabled}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    autoAssignment: { ...s.autoAssignment, enabled: checked }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Assignment Mode</Label>
                <Select 
                  value={settings.autoAssignment.mode}
                  onValueChange={(value) => setSettings(s => ({
                    ...s,
                    autoAssignment: { ...s.autoAssignment, mode: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="nearest">Nearest Driver</SelectItem>
                    <SelectItem value="rating">Best Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Max Trips Per Driver</Label>
                <Input 
                  type="number"
                  value={settings.autoAssignment.maxTripsPerDriver}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    autoAssignment: { ...s.autoAssignment, maxTripsPerDriver: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Wait Time (minutes)</Label>
                <Input 
                  type="number"
                  value={settings.autoAssignment.maxWaitTime}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    autoAssignment: { ...s.autoAssignment, maxWaitTime: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Driver Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Respect Zone Restrictions</Label>
                <Switch 
                  checked={settings.driverPreferences.respectZones}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    driverPreferences: { ...s.driverPreferences, respectZones: checked }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Allow Multiple Trips</Label>
                <Switch 
                  checked={settings.driverPreferences.allowMultipleTrips}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    driverPreferences: { ...s.driverPreferences, allowMultipleTrips: checked }
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Enforce Break Times</Label>
                <Switch 
                  checked={settings.driverPreferences.enforceBreaks}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    driverPreferences: { ...s.driverPreferences, enforceBreaks: checked }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum Driver Rating</Label>
                <Input 
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={settings.driverPreferences.minimumRating}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    driverPreferences: { ...s.driverPreferences, minimumRating: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Dispatch Rules</Button>
      </div>
    </div>
  );
}