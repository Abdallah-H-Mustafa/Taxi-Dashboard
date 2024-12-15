"use client";

export interface DriverDocument {
  id: string;
  driverId: string;
  type: 'license' | 'insurance' | 'permit' | 'background_check' | 'vehicle_registration';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  expiryDate: string;
  uploadedAt: string;
  verifiedAt?: string;
  fileUrl: string;
  notes?: string;
}

export interface DriverVehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'active' | 'maintenance' | 'inactive';
  type: 'sedan' | 'suv' | 'van' | 'luxury';
  lastInspection?: string;
  documents: DriverDocument[];
}

export interface DriverEarnings {
  daily: number;
  weekly: number;
  monthly: number;
  pending: number;
  lastPayout?: {
    amount: number;
    date: string;
    status: 'processed' | 'pending' | 'failed';
  };
}

export interface DriverPerformance {
  rating: number;
  totalTrips: number;
  completionRate: number;
  acceptanceRate: number;
  cancelationRate: number;
  averageResponseTime: number;
  complaints: number;
  compliments: number;
}

export interface EnhancedDriver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'busy' | 'offline' | 'suspended';
  location?: {
    lat: number;
    lng: number;
    lastUpdate: string;
  };
  documents: DriverDocument[];
  vehicle?: DriverVehicle;
  earnings: DriverEarnings;
  performance: DriverPerformance;
  assignedZone?: string;
  activeTrip?: string;
  onlineHours: number;
  joinedAt: string;
  lastActive: string;
}