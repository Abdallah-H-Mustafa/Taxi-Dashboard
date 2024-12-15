"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useVehicleStore } from "@/lib/stores/vehicle-store";
import { toast } from "sonner";

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVehicleDialog({ open, onOpenChange }: AddVehicleDialogProps) {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    plateNumber: "",
    name: "",
    year: new Date().getFullYear().toString(),
    color: "",
    type: "sedan" as const,
    ownerType: "owner_operator",
    equipment: {
      hasRadio: false,
      hasDomeLight: false,
      hasTablet: false,
    },
    maintenance: {
      oilCheck: false,
      oilChangeDate: "",
      isFull: false,
      gasFraction: "",
    },
    documents: {
      registration: "",
      insurance: "",
      safetyInspection: "",
      pocketNumber: "",
    },
    fees: {
      dailyRental: "",
      weeklyRental: "",
      rentalDate: "",
    },
    vehiclePhoto: null as File | null,
  });

  const addVehicle = useVehicleStore((state) => state.addVehicle);

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
        vehiclePhoto: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      addVehicle({
        registrationNumber: formData.plateNumber,
        make: formData.name.split(' ')[0],
        model: formData.name.split(' ').slice(1).join(' '),
        year: parseInt(formData.year),
        type: formData.type,
        status: 'active',
        mileage: 0,
        fuelType: 'gasoline',
        insurance: {
          provider: "",
          policyNumber: "",
          expiryDate: "",
        },
        documents: [],
        maintenanceHistory: [],
      });
      
      toast.success("Vehicle added successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add vehicle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Vehicle Photo */}
            <div className="space-y-4">
              <h3 className="font-medium">Vehicle Photo</h3>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="vehicle-photo"
                />
                <Label htmlFor="vehicle-photo" className="cursor-pointer">
                  {formData.vehiclePhoto ? (
                    <span>{formData.vehiclePhoto.name}</span>
                  ) : (
                    <span>Select Photo</span>
                  )}
                </Label>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Car Details</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Vehicle Number"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                />
                <Input
                  placeholder="Plate Number"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                />
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
                <Input
                  placeholder="Color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>

            {/* Vehicle Type & Owner */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Owner Type</Label>
                <Select
                  value={formData.ownerType}
                  onValueChange={(value) => setFormData({ ...formData, ownerType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner_operator">Owner Operator</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Equipment</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.equipment.hasRadio}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    equipment: { ...formData.equipment, hasRadio: checked }
                  })}
                />
                <Label>Radio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.equipment.hasDomeLight}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    equipment: { ...formData.equipment, hasDomeLight: checked }
                  })}
                />
                <Label>Dome Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.equipment.hasTablet}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    equipment: { ...formData.equipment, hasTablet: checked }
                  })}
                />
                <Label>Tablet</Label>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="font-medium">License and Insurance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Car Registration</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'registration')}
                  />
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Car Insurance</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'insurance')}
                  />
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Safety Inspection</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'safetyInspection')}
                  />
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Taxi Pocket Number</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'pocketNumber')}
                  />
                  <Input type="date" />
                </div>
              </div>
            </div>
          </div>

          {/* Fees Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Fees</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Daily Rental Fees</Label>
                <Input
                  type="number"
                  value={formData.fees.dailyRental}
                  onChange={(e) => setFormData({
                    ...formData,
                    fees: { ...formData.fees, dailyRental: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Weekly Rental Fees</Label>
                <Input
                  type="number"
                  value={formData.fees.weeklyRental}
                  onChange={(e) => setFormData({
                    ...formData,
                    fees: { ...formData.fees, weeklyRental: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Rental Date</Label>
                <Input
                  type="date"
                  value={formData.fees.rentalDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    fees: { ...formData.fees, rentalDate: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">Add Vehicle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}