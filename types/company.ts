export interface Company {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  fleetSize: number;
  activeDrivers: number;
  activeTrips: number;
  createdAt: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  dispatchSettings?: {
    maxTripsPerDriver: string;
    maxWaitTime: string;
    autoAssign: boolean;
    allowOpenCalls: boolean;
    zoneRestrictions: boolean;
    dispatchMode: 'balanced' | 'nearest' | 'rating';
  };
}