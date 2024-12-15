"use client";

export interface Zone {
  id: string;
  name: string;
  area: {
    coordinates: [number, number][];
    center: [number, number];
  };
  schedule: {
    monday?: { start: string; end: string; }[];
    tuesday?: { start: string; end: string; }[];
    wednesday?: { start: string; end: string; }[];
    thursday?: { start: string; end: string; }[];
    friday?: { start: string; end: string; }[];
    saturday?: { start: string; end: string; }[];
    sunday?: { start: string; end: string; }[];
  };
  status: 'active' | 'inactive' | 'scheduled';
  type: 'primary' | 'secondary' | 'restricted';
  restrictions?: {
    maxDrivers?: number;
    vehicleTypes?: string[];
    specialPermits?: string[];
  };
  pricing: {
    baseRate: number;
    perKm: number;
    perMinute: number;
    minimumFare: number;
  };
  statistics: {
    activeDrivers: number;
    completedTrips: number;
    averageWaitTime: number;
    revenue: number;
  };
}

export interface Address {
  id: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zoneId: string;
  subZoneId?: string;
  type: 'residential' | 'commercial' | 'point_of_interest';
  metadata?: {
    buildingName?: string;
    accessNotes?: string;
    landmarks?: string[];
  };
}