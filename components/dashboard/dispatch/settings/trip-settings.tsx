"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function TripSettings() {
  const [settings, setSettings] = useState({
    tripAssignment: {
      autoAssign: true,
      maxTripsPerDriver: "3",
      maxWaitTime: "10",
      priorityToRegulars: true,
      allowMultipleTrips: false
    },
    tripRules: {
      requireDestination: true,
      allowCancellations: true,
      cancellationWindow: "5",
      maxDistance: "50",
      requirePhotoVerification: true
    },
    queueSettings: {
      maxQueueSize: "50",
      queueTimeout: "15",
      priorityBooking: true,
      allowScheduled: true
    }
  });

  const handleSave = () => {
    toast.success("Trip settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trip Assignment Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Max Trips Per Driver</Label>
              <Input
                type="number"
                value={settings.tripAssignment.maxTripsPerDriver}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  tripAssignment: { ...s.tripAssignment, maxTripsPerDriver: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Wait Time (minutes)</Label>
              <Input
                type="number"
                value={settings.tripAssignment.maxWaitTime}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  tripAssignment: { ...s.tripAssignment, maxWaitTime: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Auto Assignment</Label>
              <Switch
                checked={settings.tripAssignment.autoAssign}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  tripAssignment: { ...s.tripAssignment, autoAssign: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Priority to Regular Customers</Label>
              <Switch
                checked={settings.tripAssignment.priorityToRegulars}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  tripAssignment: { ...s.tripAssignment, priorityToRegulars: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trip Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cancellation Window (minutes)</Label>
              <Input
                type="number"
                value={settings.tripRules.cancellationWindow}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  tripRules: { ...s.tripRules, cancellationWindow: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Trip Distance (km)</Label>
              <Input
                type="number"
                value={settings.tripRules.maxDistance}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  tripRules: { ...s.tripRules, maxDistance: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Require Destination</Label>
              <Switch
                checked={settings.tripRules.requireDestination}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  tripRules: { ...s.tripRules, requireDestination: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Cancellations</Label>
              <Switch
                checked={settings.tripRules.allowCancellations}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  tripRules: { ...s.tripRules, allowCancellations: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Trip Settings</Button>
      </div>
    </div>
  );
}