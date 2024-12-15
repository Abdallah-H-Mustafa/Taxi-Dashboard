export interface DispatchZone {
  id: string;
  name: string;
  area: {
    coordinates: [number, number][];
    center: [number, number];
  };
  status: 'active' | 'inactive';
  assignedDrivers: number;
  activeTrips: number;
  company: string;
}

export interface DispatchCompany {
  id: string;
  name: string;
  zones: string[];
  fleetSize: number;
  activeDrivers: number;
  dispatchRules: {
    maxTripsPerDriver: number;
    maxWaitTime: number;
    priorityAreas: string[];
  };
}

export interface DispatchWorkstation {
  id: string;
  operator: string;
  assignedZones: string[];
  activeTrips: number;
  status: 'active' | 'break' | 'offline';
  performance: {
    avgResponseTime: number;
    tripsHandled: number;
    satisfaction: number;
  };
}

export interface DispatchMetrics {
  totalActiveDrivers: number;
  totalActiveTrips: number;
  averageWaitTime: number;
  averageResponseTime: number;
  busyZones: string[];
  criticalAlerts: number;
}