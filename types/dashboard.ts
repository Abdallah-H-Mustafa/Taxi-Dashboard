// Core types for the dashboard
export interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location?: {
    lat: number;
    lng: number;
  };
  rating: number;
  totalTrips: number;
  acceptanceRate: number;
}

export interface Trip {
  id: string;
  driverId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  pickup: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  dropoff: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  createdAt: string;
  completedAt?: string;
}

export interface DashboardStats {
  activeDrivers: number;
  pendingTrips: number;
  completedTrips: number;
  totalRevenue: number;
}