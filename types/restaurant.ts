export interface Restaurant {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  cuisine: string[];
  rating: number;
  totalOrders: number;
  status: 'open' | 'closed' | 'busy';
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  preparationTime: number;
}

export interface RestaurantOrder {
  id: string;
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }[];
  status: 'pending' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  totalAmount: number;
  customerDetails: {
    name: string;
    address: string;
    phone: string;
  };
  driverId?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
}