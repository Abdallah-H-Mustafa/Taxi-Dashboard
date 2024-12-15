"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCompanyStore } from "@/lib/stores/company-store";
import { toast } from "sonner";

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fleetSize: "",
    username: "",
    password: "",
    dispatchSettings: {
      maxTripsPerDriver: "10",
      maxWaitTime: "15",
      autoAssign: true,
      allowOpenCalls: true,
      zoneRestrictions: true,
      dispatchMode: "balanced" as const
    }
  });

  const addCompany = useCompanyStore((state) => state.addCompany);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      addCompany({
        name: formData.name,
        status: "active",
        fleetSize: parseInt(formData.fleetSize),
        activeDrivers: 0,
        activeTrips: 0,
        dispatchSettings: formData.dispatchSettings
      });

      toast.success("Company added successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Fleet Size</Label>
              <Input
                type="number"
                value={formData.fleetSize}
                onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Login Credentials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Dispatch Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Trips Per Driver</Label>
                <Input
                  type="number"
                  value={formData.dispatchSettings.maxTripsPerDriver}
                  onChange={(e) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      maxTripsPerDriver: e.target.value
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Wait Time (minutes)</Label>
                <Input
                  type="number"
                  value={formData.dispatchSettings.maxWaitTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      maxWaitTime: e.target.value
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Dispatch Mode</Label>
                <Select
                  value={formData.dispatchSettings.dispatchMode}
                  onValueChange={(value: any) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      dispatchMode: value
                    }
                  })}
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

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.dispatchSettings.autoAssign}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      autoAssign: checked
                    }
                  })}
                />
                <Label>Auto-assign Trips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.dispatchSettings.allowOpenCalls}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      allowOpenCalls: checked
                    }
                  })}
                />
                <Label>Allow Open Calls</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.dispatchSettings.zoneRestrictions}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    dispatchSettings: {
                      ...formData.dispatchSettings,
                      zoneRestrictions: checked
                    }
                  })}
                />
                <Label>Enable Zone Restrictions</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}