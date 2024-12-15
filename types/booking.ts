export interface Booking {
  id: string;
  userId: string;
  driverId?: string;
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
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  scheduledTime: string;
  price: number;
  distance: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  averagePrice: number;
  totalRevenue: number;
}