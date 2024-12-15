export type TripStatus = 
  | 'pending'
  | 'accepted'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type DeliveryStatus = 
  | 'pending'
  | 'accepted'
  | 'picked_up'
  | 'in_progress'
  | 'delivered'
  | 'cancelled';

export interface Location {
  address: string;
  lat: number;
  lng: number;
  instructions?: string;
}

export interface Trip {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  status: TripStatus;
  fare: number;
  distance: number;
  duration: number;
  scheduledTime?: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  rating?: number;
  feedback?: string;
  paymentMethod: 'cash' | 'card' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface DeliveryOrder {
  id: string;
  customerId: string;
  driverId?: string;
  pickup: Location;
  dropoff: Location;
  status: DeliveryStatus;
  items: {
    name: string;
    quantity: number;
    size?: string;
    weight?: number;
  }[];
  fare: number;
  distance: number;
  duration: number;
  scheduledTime?: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  rating?: number;
  feedback?: string;
  paymentMethod: 'cash' | 'card' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed';
}