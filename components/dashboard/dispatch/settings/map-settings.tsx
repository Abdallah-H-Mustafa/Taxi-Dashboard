"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function MapSettings() {
  const [settings, setSettings] = useState({
    theme: 'default',
    showTraffic: true,
    showHeatmap: true,
    showZones: true,
    showDrivers: true,
    clusterMarkers: true,
    autoZoom: true,
    refreshInterval: '30',
    defaultCenter: {
      lat: '63.7467',
      lng: '-68.5170'
    },
    defaultZoom: '12'
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success("Map settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Map Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Map Theme</Label>
              <Select 
                value={settings.theme}
                onValueChange={(value) => setSettings(s => ({ ...s, theme: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Refresh Interval (seconds)</Label>
              <Input 
                type="number"
                value={settings.refreshInterval}
                onChange={(e) => setSettings(s => ({ ...s, refreshInterval: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Show Traffic Layer</Label>
                <Switch 
                  checked={settings.showTraffic}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, showTraffic: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Heatmap</Label>
                <Switch 
                  checked={settings.showHeatmap}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, showHeatmap: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Show Zones</Label>
                <Switch 
                  checked={settings.showZones}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, showZones: checked }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Show Drivers</Label>
                <Switch 
                  checked={settings.showDrivers}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, showDrivers: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Cluster Markers</Label>
                <Switch 
                  checked={settings.clusterMarkers}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, clusterMarkers: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto Zoom</Label>
                <Switch 
                  checked={settings.autoZoom}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, autoZoom: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Default Latitude</Label>
              <Input 
                value={settings.defaultCenter.lat}
                onChange={(e) => setSettings(s => ({ 
                  ...s, 
                  defaultCenter: { ...s.defaultCenter, lat: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Default Longitude</Label>
              <Input 
                value={settings.defaultCenter.lng}
                onChange={(e) => setSettings(s => ({ 
                  ...s, 
                  defaultCenter: { ...s.defaultCenter, lng: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Default Zoom Level</Label>
              <Input 
                type="number"
                value={settings.defaultZoom}
                onChange={(e) => setSettings(s => ({ ...s, defaultZoom: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Map Settings</Button>
      </div>
    </div>
  );
}