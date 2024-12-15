"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";

interface AddDriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDriverDialog({ open, onOpenChange }: AddDriverDialogProps) {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    landlineNumber: "",
    email: "",
    information: "",
    notes: "",
    address: "",
    personalId: "",
    vehicleNumber: "",
    vehicleOwnerType: "",
    priority: "1",
    documents: {
      driversLicense: "",
      pocketNumber: "",
      criminalRecord: "",
      criminalRecordBack: "",
      businessLicense: "",
      sponsorshipLetter: "",
      taxNumber: "",
    },
    tracking: {
      displayOnMap: false,
      blockGps: false,
    },
    app: {
      username: "",
      password: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: e.target.files![0].name
        }
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        photo: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add driver logic here
      toast.success("Driver added successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add driver");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Driver Photo */}
            <div className="space-y-4">
              <h3 className="font-medium">Driver Photo</h3>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="driver-photo"
                />
                <Label htmlFor="driver-photo" className="cursor-pointer">
                  {formData.photo ? (
                    <span>{formData.photo.name}</span>
                  ) : (
                    <span>Select Photo</span>
                  )}
                </Label>
              </div>
              <Button variant="outline" type="button">Delete</Button>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Personal Details</h3>
              <div className="space-y-2">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <Input
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                <Input
                  placeholder="Landline Number"
                  value={formData.landlineNumber}
                  onChange={(e) => setFormData({ ...formData, landlineNumber: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  placeholder="Information"
                  value={formData.information}
                  onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                />
                <Input
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
                <Input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <Input
                  placeholder="Personal ID"
                  value={formData.personalId}
                  onChange={(e) => setFormData({ ...formData, personalId: e.target.value })}
                />
              </div>
            </div>

            {/* Car Details & License */}
            <div className="space-y-4">
              <h3 className="font-medium">Car Details</h3>
              <div className="space-y-2">
                <Select
                  value={formData.vehicleNumber}
                  onValueChange={(value) => setFormData({ ...formData, vehicleNumber: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vehicle Number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Vehicle 1</SelectItem>
                    <SelectItem value="2">Vehicle 2</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.vehicleOwnerType}
                  onValueChange={(value) => setFormData({ ...formData, vehicleOwnerType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vehicle Owner Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <h3 className="font-medium">Priority for Driver</h3>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Documents</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries({
                "Driver's License": "driversLicense",
                "Driver Pocket Number": "pocketNumber",
                "Criminal Records Check": "criminalRecord",
                "Criminal Records Back": "criminalRecordBack",
                "Business License": "businessLicense",
                "Sponsorship Letter": "sponsorshipLetter",
              }).map(([label, field]) => (
                <div key={field} className="space-y-2">
                  <Label>{label}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(e, field)}
                    />
                    <Input type="date" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking and GPS */}
          <div className="space-y-4">
            <h3 className="font-medium">Tracking and GPS</h3>
            <div className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.tracking.displayOnMap}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    tracking: { ...formData.tracking, displayOnMap: checked }
                  })}
                />
                <Label>Display driver on map</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.tracking.blockGps}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    tracking: { ...formData.tracking, blockGps: checked }
                  })}
                />
                <Label>Block if GPS is disabled</Label>
              </div>
            </div>
          </div>

          {/* Driver App */}
          <div className="space-y-4">
            <h3 className="font-medium">Driver App</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={formData.app.username}
                  onChange={(e) => setFormData({
                    ...formData,
                    app: { ...formData.app, username: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.app.password}
                  onChange={(e) => setFormData({
                    ...formData,
                    app: { ...formData.app, password: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">Add Driver</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}