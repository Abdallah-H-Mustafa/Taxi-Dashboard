"use client";

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  type: 'sedan' | 'suv' | 'van' | 'truck';
  status: 'active' | 'maintenance' | 'inactive';
  assignedDriver?: string;
  lastService?: string;
  nextService?: string;
  mileage: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  insurance: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  documents: {
    id: string;
    type: 'registration' | 'insurance' | 'maintenance' | 'inspection';
    expiryDate: string;
    fileUrl: string;
  }[];
  maintenanceHistory: {
    id: string;
    date: string;
    type: string;
    description: string;
    cost: number;
  }[];
  createdAt: string;
}