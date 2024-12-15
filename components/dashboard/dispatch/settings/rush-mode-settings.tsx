"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function RushModeSettings() {
  const [settings, setSettings] = useState({
    autoActivation: true,
    surgeMultiplier: '1.5',
    thresholds: {
      demandRatio: '1.5',
      waitTime: '10',
      queueLength: '15'
    },
    schedules: [
      { day: 'monday', start: '16:00', end: '19:00' },
      { day: 'tuesday', start: '16:00', end: '19:00' },
      { day: 'wednesday', start: '16:00', end: '19:00' },
      { day: 'thursday', start: '16:00', end: '19:00' },
      { day: 'friday', start: '16:00', end: '19:00' }
    ],
    notifications: {
      drivers: true,
      customers: true,
      dispatchers: true
    }
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success("Rush mode settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rush Mode Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Activation</Label>
                <Switch 
                  checked={settings.autoActivation}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, autoActivation: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Surge Price Multiplier</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={settings.surgeMultiplier}
                  onChange={(e) => setSettings(s => ({ ...s, surgeMultiplier: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Demand/Supply Ratio Threshold</Label>
                <Input 
                  type="number"
                  step="0.1"
                  value={settings.thresholds.demandRatio}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    thresholds: { ...s.thresholds, demandRatio: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Wait Time Threshold (minutes)</Label>
                <Input 
                  type="number"
                  value={settings.thresholds.waitTime}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    thresholds: { ...s.thresholds, waitTime: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Queue Length Threshold</Label>
                <Input 
                  type="number"
                  value={settings.thresholds.queueLength}
                  onChange={(e) => setSettings(s => ({
                    ...s,
                    thresholds: { ...s.thresholds, queueLength: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Scheduled Rush Hours</h3>
            <div className="space-y-4">
              {settings.schedules.map((schedule, index) => (
                <div key={schedule.day} className="grid grid-cols-3 gap-4 items-center">
                  <Label className="capitalize">{schedule.day}</Label>
                  <Input 
                    type="time"
                    value={schedule.start}
                    onChange={(e) => {
                      const newSchedules = [...settings.schedules];
                      newSchedules[index] = { ...schedule, start: e.target.value };
                      setSettings(s => ({ ...s, schedules: newSchedules }));
                    }}
                  />
                  <Input 
                    type="time"
                    value={schedule.end}
                    onChange={(e) => {
                      const newSchedules = [...settings.schedules];
                      newSchedules[index] = { ...schedule, end: e.target.value };
                      setSettings(s => ({ ...s, schedules: newSchedules }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Notifications</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <Label>Notify Drivers</Label>
                <Switch 
                  checked={settings.notifications.drivers}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, drivers: checked }
                  }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify Customers</Label>
                <Switch 
                  checked={settings.notifications.customers}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, customers: checked }
                  }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notify Dispatchers</Label>
                <Switch 
                  checked={settings.notifications.dispatchers}
                  onCheckedChange={(checked) => setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, dispatchers: checked }
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Rush Mode Settings</Button>
      </div>
    </div>
  );
}