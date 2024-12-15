"use client";

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'drivers' | 'trips' | 'zones' | 'reports' | 'settings' | 'system';
}

export interface AdminRole {
  id: string;
  name: string;
  permissions: string[];
  level: number;
}

export interface AdminLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zones: string[];
  activeDrivers: number;
  activeTrips: number;
}

export interface AdminWorkstation {
  id: string;
  name: string;
  location: string;
  operator?: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastActive?: string;
  performance?: {
    responseTime: number;
    handledTrips: number;
    satisfaction: number;
  };
}