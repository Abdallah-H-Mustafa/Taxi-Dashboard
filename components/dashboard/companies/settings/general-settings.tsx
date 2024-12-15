"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface GeneralSettings {
  company: {
    name: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    description: string;
    timezone: string;
    language: string;
  };
  dispatch: {
    autoAssign: boolean;
    maxTripsPerDriver: number;
    maxWaitTime: number;
    dispatchRadius: number;
    allowMultipleTrips: boolean;
    requirePhotoVerification: boolean;
    allowOpenCalls: boolean;
    requireDestination: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    sound: boolean;
    newTripAlert: boolean;
    tripUpdates: boolean;
    driverUpdates: boolean;
    systemAlerts: boolean;
  };
  security: {
    requireDriverPhoto: boolean;
    requireVehiclePhoto: boolean;
    requireDocumentVerification: boolean;
    enableGeofencing: boolean;
    trackDriverLocation: boolean;
    recordTripRoute: boolean;
  };
}

export function GeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettings>({
    company: {
      name: "Caribou Cabs",
      phone: "(867) 979-1234",
      email: "dispatch@cariboucabs.com",
      website: "www.cariboucabs.com",
      address: "123 Main St, Iqaluit, NU X0A 0H0",
      description: "Premier taxi service in Iqaluit",
      timezone: "America/Iqaluit",
      language: "en",
    },
    dispatch: {
      autoAssign: true,
      maxTripsPerDriver: 1,
      maxWaitTime: 15,
      dispatchRadius: 5,
      allowMultipleTrips: false,
      requirePhotoVerification: true,
      allowOpenCalls: true,
      requireDestination: true,
    },
    notifications: {
      email: true,
      sms: true,
      push: true,
      sound: true,
      newTripAlert: true,
      tripUpdates: true,
      driverUpdates: true,
      systemAlerts: true,
    },
    security: {
      requireDriverPhoto: true,
      requireVehiclePhoto: true,
      requireDocumentVerification: true,
      enableGeofencing: true,
      trackDriverLocation: true,
      recordTripRoute: true,
    },
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success("General settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={settings.company.name}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, name: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={settings.company.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, phone: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.company.email}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, email: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                value={settings.company.website}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, website: e.target.value }
                })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Address</Label>
              <Input
                value={settings.company.address}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, address: e.target.value }
                })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={settings.company.description}
                onChange={(e) => setSettings({
                  ...settings,
                  company: { ...settings.company, description: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select
                value={settings.company.timezone}
                onValueChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, timezone: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Iqaluit">America/Iqaluit</SelectItem>
                  <SelectItem value="America/Toronto">America/Toronto</SelectItem>
                  <SelectItem value="America/Vancouver">America/Vancouver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={settings.company.language}
                onValueChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, language: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="iu">Inuktitut</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Trips Per Driver</Label>
                <Input
                  type="number"
                  value={settings.dispatch.maxTripsPerDriver}
                  onChange={(e) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, maxTripsPerDriver: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Wait Time (minutes)</Label>
                <Input
                  type="number"
                  value={settings.dispatch.maxWaitTime}
                  onChange={(e) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, maxWaitTime: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Dispatch Radius (km)</Label>
                <Input
                  type="number"
                  value={settings.dispatch.dispatchRadius}
                  onChange={(e) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, dispatchRadius: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.dispatch.autoAssign}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, autoAssign: checked }
                  })}
                />
                <Label>Auto-assign Trips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.dispatch.allowMultipleTrips}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, allowMultipleTrips: checked }
                  })}
                />
                <Label>Allow Multiple Trips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.dispatch.requirePhotoVerification}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, requirePhotoVerification: checked }
                  })}
                />
                <Label>Require Photo Verification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.dispatch.allowOpenCalls}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    dispatch: { ...settings.dispatch, allowOpenCalls: checked }
                  })}
                />
                <Label>Allow Open Calls</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: checked }
                })}
              />
              <Label>Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, sms: checked }
                })}
              />
              <Label>SMS Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: checked }
                })}
              />
              <Label>Push Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.sound}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, sound: checked }
                })}
              />
              <Label>Sound Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.newTripAlert}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, newTripAlert: checked }
                })}
              />
              <Label>New Trip Alerts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.tripUpdates}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, tripUpdates: checked }
                })}
              />
              <Label>Trip Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.driverUpdates}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, driverUpdates: checked }
                })}
              />
              <Label>Driver Updates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.notifications.systemAlerts}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, systemAlerts: checked }
                })}
              />
              <Label>System Alerts</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.requireDriverPhoto}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, requireDriverPhoto: checked }
                })}
              />
              <Label>Require Driver Photo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.requireVehiclePhoto}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, requireVehiclePhoto: checked }
                })}
              />
              <Label>Require Vehicle Photo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.requireDocumentVerification}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, requireDocumentVerification: checked }
                })}
              />
              <Label>Require Document Verification</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.enableGeofencing}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, enableGeofencing: checked }
                })}
              />
              <Label>Enable Geofencing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.trackDriverLocation}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, trackDriverLocation: checked }
                })}
              />
              <Label>Track Driver Location</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.security.recordTripRoute}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, recordTripRoute: checked }
                })}
              />
              <Label>Record Trip Route</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save General Settings</Button>
      </div>
    </div>
  );
}