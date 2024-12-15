export interface TaxiMetrics {
  activeDrivers: number;
  pendingRequests: number;
  completedTrips: number;
  totalRevenue: number;
  averageWaitTime: number;
  busyAreas: string[];
}

export interface TaxiZone {
  id: string;
  name: string;
  area: {
    coordinates: [number, number][];
    center: [number, number];
  };
  status: 'active' | 'inactive';
  assignedDrivers: number;
  activeTrips: number;
  demandLevel: 'low' | 'medium' | 'high';
}

export interface TaxiRequest {
  id: string;
  pickupLocation: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  dropoffLocation: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  requestTime: string;
  estimatedPrice: number;
  assignedDriver?: string;
  vehicleType: 'standard' | 'premium' | 'van';
  passengerCount: number;
  specialRequirements?: string[];
}