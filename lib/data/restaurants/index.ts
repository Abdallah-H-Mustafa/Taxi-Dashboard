import { snackRestaurant } from "./the-snack";

export const restaurants = [
  snackRestaurant,
  {
    id: "arctic-cafe",
    name: "Arctic Cafe",
    type: "cafe",
    description: "Cozy cafe serving hot beverages and fresh pastries",
    logo: "/images/restaurants/arctic-cafe-logo.png",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop",
    status: "active",
    rating: 4.7,
    address: "456 Polar Ave, Iqaluit, NU",
    phone: "(867) 979-1234",
    hours: {
      monday: { open: "07:00", close: "20:00" },
      tuesday: { open: "07:00", close: "20:00" },
      wednesday: { open: "07:00", close: "20:00" },
      thursday: { open: "07:00", close: "20:00" },
      friday: { open: "07:00", close: "22:00" },
      saturday: { open: "08:00", close: "22:00" },
      sunday: { open: "08:00", close: "20:00" }
    },
    menu: {
      categories: [
        {
          name: "Hot Beverages",
          items: [
            {
              id: "coffee",
              name: "House Coffee",
              price: 2.95,
              image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&h=300&fit=crop"
            }
          ]
        }
      ]
    },
    features: [
      "Coffee",
      "Pastries",
      "WiFi",
      "Takeout"
    ],
    coordinates: {
      lat: 63.7500,
      lng: -68.5100
    }
  }
];

export const getRestaurantById = (id: string) => {
  return restaurants.find(restaurant => restaurant.id === id);
};