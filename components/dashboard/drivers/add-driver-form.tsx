"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddDriverForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newDriver = {
      id: crypto.randomUUID(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      status: "offline" as const,
      rating: 5.0,
      totalTrips: 0,
      completionRate: 1,
      acceptanceRate: 1,
      onboardingStatus: "pending" as const,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      vehicle: formData.vehicleMake ? {
        make: formData.vehicleMake,
        model: formData.vehicleModel,
        year: parseInt(formData.vehicleYear),
        color: formData.vehicleColor,
        licensePlate: formData.vehiclePlate,
        type: formData.vehicleType as any,
        status: "active",
      } : undefined,
      documents: [],
      earnings: {
        today: 0,
        week: 0,
        month: 0,
        total: 0,
        pendingPayout: 0,
      },
    };

    useDriverStore.getState().drivers.set(newDriver.id, newDriver);
    toast.success("Driver added successfully");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      vehiclePlate: "",
      vehicleType: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Driver Information</h3>
        {/* Single row for name fields */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              placeholder="Enter last name"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="Enter phone number"
            />
          </div>
        </div>
        {/* Second row for email */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Vehicle Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Make</Label>
            <Input
              value={formData.vehicleMake}
              onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
              placeholder="Enter vehicle make"
            />
          </div>
          <div className="space-y-2">
            <Label>Model</Label>
            <Input
              value={formData.vehicleModel}
              onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
              placeholder="Enter vehicle model"
            />
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Input
              type="number"
              value={formData.vehicleYear}
              onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
              placeholder="Enter vehicle year"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <Input
              value={formData.vehicleColor}
              onChange={(e) => setFormData({ ...formData, vehicleColor: e.target.value })}
              placeholder="Enter vehicle color"
            />
          </div>
          <div className="space-y-2">
            <Label>License Plate</Label>
            <Input
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
              placeholder="Enter license plate"
            />
          </div>
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="van">Van</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Add Driver</Button>
      </div>
    </form>
  );
}