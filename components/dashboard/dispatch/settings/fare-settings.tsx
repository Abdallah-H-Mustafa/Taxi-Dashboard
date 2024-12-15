"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function FareSettings() {
  const [settings, setSettings] = useState({
    baseRates: {
      minimumFare: "10",
      baseRate: "5",
      perKilometer: "2",
      perMinute: "0.5",
      cancellationFee: "5"
    },
    surgeSettings: {
      enabled: true,
      multiplier: "1.5",
      startTime: "16:00",
      endTime: "19:00",
      minimumDemand: "1.5"
    },
    zoneRates: {
      enabled: true,
      crossZoneFee: "5",
      longDistanceFee: "10",
      specialZoneFee: "8"
    },
    additionalFees: {
      waitingTime: "0.5",
      trafficDelay: "0.3",
      luggageFee: "2",
      petFee: "5",
      cleaningFee: "20"
    }
  });

  const handleSave = () => {
    toast.success("Fare settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base Rate Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Fare ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.baseRates.minimumFare}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  baseRates: { ...s.baseRates, minimumFare: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Base Rate ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.baseRates.baseRate}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  baseRates: { ...s.baseRates, baseRate: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Per Kilometer Rate ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.baseRates.perKilometer}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  baseRates: { ...s.baseRates, perKilometer: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Per Minute Rate ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.baseRates.perMinute}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  baseRates: { ...s.baseRates, perMinute: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Surge Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label>Enable Surge Pricing</Label>
            <Switch
              checked={settings.surgeSettings.enabled}
              onCheckedChange={(checked) => setSettings(s => ({
                ...s,
                surgeSettings: { ...s.surgeSettings, enabled: checked }
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Surge Multiplier</Label>
              <Input
                type="number"
                step="0.1"
                value={settings.surgeSettings.multiplier}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  surgeSettings: { ...s.surgeSettings, multiplier: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Demand Ratio</Label>
              <Input
                type="number"
                step="0.1"
                value={settings.surgeSettings.minimumDemand}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  surgeSettings: { ...s.surgeSettings, minimumDemand: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Waiting Time (per minute)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.additionalFees.waitingTime}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  additionalFees: { ...s.additionalFees, waitingTime: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Traffic Delay (per minute)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.additionalFees.trafficDelay}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  additionalFees: { ...s.additionalFees, trafficDelay: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Luggage Fee</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.additionalFees.luggageFee}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  additionalFees: { ...s.additionalFees, luggageFee: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Pet Fee</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.additionalFees.petFee}
                onChange={(e) => setSettings(s => ({
                  ...s,
                  additionalFees: { ...s.additionalFees, petFee: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Fare Settings</Button>
      </div>
    </div>
  );
}