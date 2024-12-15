"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/company";

interface CompanyFormProps {
  initialData?: Partial<Company>;
  onSubmit: (data: Partial<Company>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CompanyForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading 
}: CompanyFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    status: initialData?.status || "active",
    fleetSize: initialData?.fleetSize?.toString() || "",
    email: "",
    phone: "",
    address: "",
    description: "",
    isActive: true,
    hasDispatch: true,
    dispatchSettings: {
      maxTripsPerDriver: "10",
      maxWaitTime: "15",
      autoAssign: true,
      allowOpenCalls: true,
      zoneRestrictions: true,
      dispatchMode: "balanced"
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      fleetSize: parseInt(formData.fleetSize),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fleetSize">Fleet Size</Label>
          <Input
            id="fleetSize"
            type="number"
            value={formData.fleetSize}
            onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dispatch Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxTripsPerDriver">Max Trips Per Driver</Label>
            <Input
              id="maxTripsPerDriver"
              type="number"
              value={formData.dispatchSettings.maxTripsPerDriver}
              onChange={(e) => setFormData({
                ...formData,
                dispatchSettings: {
                  ...formData.dispatchSettings,
                  maxTripsPerDriver: e.target.value
                }
              })}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxWaitTime">Max Wait Time (minutes)</Label>
            <Input
              id="maxWaitTime"
              type="number"
              value={formData.dispatchSettings.maxWaitTime}
              onChange={(e) => setFormData({
                ...formData,
                dispatchSettings: {
                  ...formData.dispatchSettings,
                  maxWaitTime: e.target.value
                }
              })}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dispatchMode">Dispatch Mode</Label>
            <Select
              value={formData.dispatchSettings.dispatchMode}
              onValueChange={(value) => setFormData({
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="autoAssign"
              checked={formData.dispatchSettings.autoAssign}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                dispatchSettings: {
                  ...formData.dispatchSettings,
                  autoAssign: checked
                }
              })}
              disabled={isLoading}
            />
            <Label htmlFor="autoAssign">Auto-assign Trips</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="allowOpenCalls"
              checked={formData.dispatchSettings.allowOpenCalls}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                dispatchSettings: {
                  ...formData.dispatchSettings,
                  allowOpenCalls: checked
                }
              })}
              disabled={isLoading}
            />
            <Label htmlFor="allowOpenCalls">Allow Open Calls</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="zoneRestrictions"
              checked={formData.dispatchSettings.zoneRestrictions}
              onCheckedChange={(checked) => setFormData({
                ...formData,
                dispatchSettings: {
                  ...formData.dispatchSettings,
                  zoneRestrictions: checked
                }
              })}
              disabled={isLoading}
            />
            <Label htmlFor="zoneRestrictions">Enable Zone Restrictions</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Company"}
        </Button>
      </div>
    </form>
  );
}