"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function ZoneDistanceSettings() {
  const [settings, setSettings] = useState({
    zoneDistances: {
      maxTripDistance: "50",
      minTripDistance: "1",
      crossZoneDistance: "10",
      maxZoneRadius: "25"
    },
    restrictions: {
      enforceMaxDistance: true,
      allowCrossZone: true,
      requireZonePermit: false,
      restrictedZones: []
    },
    optimization: {
      preferSameZone: true,
      optimizeRoutes: true,
      avoidHighTraffic: true,
      considerRoadTypes: true
    },
    specialZones: {
      airportZone: {
        enabled: true,
        maxDistance: "100",
        specialRates: true
      },
      downtownZone: {
        enabled: true,
        maxDistance: "15",
        restrictedHours: true
      }
    }
  });

  const handleSave = () => {
    toast.success("Zone distance settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Zone Distance Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Maximum Trip Distance (km)</Label>
              <Input
                type="number"
                value={settings.zoneDistances.maxTripDistance}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  zoneDistances: { ...s.zoneDistances, maxTripDistance: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Trip Distance (km)</Label>
              <Input
                type="number"
                value={settings.zoneDistances.minTripDistance}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  zoneDistances: { ...s.zoneDistances, minTripDistance: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Cross-Zone Distance (km)</Label>
              <Input
                type="number"
                value={settings.zoneDistances.crossZoneDistance}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  zoneDistances: { ...s.zoneDistances, crossZoneDistance: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Zone Radius (km)</Label>
              <Input
                type="number"
                value={settings.zoneDistances.maxZoneRadius}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  zoneDistances: { ...s.zoneDistances, maxZoneRadius: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zone Restrictions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Enforce Maximum Distance</Label>
              <Switch
                checked={settings.restrictions.enforceMaxDistance}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  restrictions: { ...s.restrictions, enforceMaxDistance: checked }
                }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Cross-Zone Trips</Label>
              <Switch
                checked={settings.restrictions.allowCrossZone}
                onCheckedChange={(checked) => setSettings(s => ({
                  ...s,
                  restrictions: { ...s.restrictions, allowCrossZone: checked }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Zones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Airport Zone</Label>
                <Switch
                  checked={settings.specialZones.airportZone.enabled}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    specialZones: {
                      ...s.specialZones,
                      airportZone: { ...s.specialZones .airportZone, enabled: checked }
                    }
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum Distance (km)</Label>
                  <Input
                    type="number"
                    value={settings.specialZones.airportZone.maxDistance}
                    onChange={(e) => setSettings(s => ({
                      ...s,
                      specialZones: {
                        ...s.specialZones,
                        airportZone: { ...s.specialZones.airportZone, maxDistance: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Special Rates</Label>
                  <Switch
                    checked={settings.specialZones.airportZone.specialRates}
                    onCheckedChange={(checked) => setSettings(s => ({
                      ...s,
                      specialZones: {
                        ...s.specialZones,
                        airportZone: { ...s.specialZones.airportZone, specialRates: checked }
                      }
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <Label>Downtown Zone</Label>
                <Switch
                  checked={settings.specialZones.downtownZone.enabled}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    specialZones: {
                      ...s.specialZones,
                      downtownZone: { ...s.specialZones.downtownZone, enabled: checked }
                    }
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum Distance (km)</Label>
                  <Input
                    type="number"
                    value={settings.specialZones.downtownZone.maxDistance}
                    onChange={(e) => setSettings(s => ({
                      ...s,
                      specialZones: {
                        ...s.specialZones,
                        downtownZone: { ...s.specialZones.downtownZone, maxDistance: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Restricted Hours</Label>
                  <Switch
                    checked={settings.specialZones.downtownZone.restrictedHours}
                    onCheckedChange={(checked) => setSettings(s => ({
                      ...s,
                      specialZones: {
                        ...s.specialZones,
                        downtownZone: { ...s.specialZones.downtownZone, restrictedHours: checked }
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Zone Distance Settings</Button>
      </div>
    </div>
  );
}