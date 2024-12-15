export const snackRestaurant = {
  id: "the-snack",
  name: "The Snack",
  type: "restaurant",
  description: "Serving Iqaluit's favorite comfort food since the 1980s",
  logo: "/images/restaurants/the-snack-logo.png",
  coverImage: "/images/restaurants/the-snack-cover.jpg",
  status: "active",
  rating: 4.8,
  address: "979 Federal Road, Iqaluit, NU",
  phone: "(867) 979-6767",
  hours: {
    monday: { open: "11:00", close: "23:00" },
    tuesday: { open: "11:00", close: "23:00" },
    wednesday: { open: "07:00", close: "01:00" },
    thursday: { open: "11:00", close: "23:00" },
    friday: { open: "11:00", close: "23:00" },
    saturday: { open: "11:00", close: "23:00" },
    sunday: { open: "11:00", close: "23:00" }
  },
  menu: {
    categories: [
      {
        name: "Starters",
        items: [
          {
            id: "mix-starter-platter",
            name: "Mix Starter Platter",
            description: "4 cheese sticks, 6 chicken wings, onion rings, crispy fries",
            price: 29.95,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop"
          },
          {
            id: "soup-of-the-day",
            name: "Soup of the Day",
            description: "Small or large",
            price: 8.95,
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop"
          },
          {
            id: "coleslaw",
            name: "Coleslaw",
            description: "Fresh and crispy",
            price: 4.45,
            image: "https://images.unsplash.com/photo-1625938145744-e380515399b7?w=800&h=600&fit=crop"
          }
        ]
      },
      {
        name: "Fries, Poutine and More",
        items: [
          {
            id: "regular-fries",
            name: "Regular Fries",
            price: 10.45,
            image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&h=600&fit=crop"
          },
          {
            id: "regular-poutine",
            name: "Regular Poutine",
            price: 15.95,
            image: "https://images.unsplash.com/photo-1586805608485-add336722759?w=800&h=600&fit=crop"
          },
          {
            id: "italian-poutine",
            name: "Italian Poutine",
            price: 16.95,
            image: "https://images.unsplash.com/photo-1586805608485-add336722759?w=800&h=600&fit=crop"
          }
        ]
      },
      {
        name: "Burgers and Hot Dogs",
        items: [
          {
            id: "hamburger",
            name: "Hamburger",
            price: 12.45,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
          },
          {
            id: "cheeseburger",
            name: "Cheeseburger",
            price: 13.45,
            image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&h=600&fit=crop"
          },
          {
            id: "snackburger",
            name: "Snackburger",
            description: "lettuce, tomatoes, onion, cheese, pickles, ketchup and mayonnaise",
            price: 14.45,
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop"
          }
        ]
      },
      {
        name: "Chicken",
        items: [
          {
            id: "chicken-nuggets-6pc",
            name: "Chicken Nuggets - 6 pieces",
            description: "with gravy or dips",
            price: 14.95,
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&h=600&fit=crop"
          },
          {
            id: "chicken-nuggets-10pc",
            name: "Chicken Nuggets - 10 pieces",
            description: "with gravy or dips",
            price: 18.95,
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&h=600&fit=crop"
          }
        ]
      },
      {
        name: "Pizzas",
        items: [
          {
            id: "cheese-pizza",
            name: "Cheese Pizza",
            price: 21.95,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop"
          },
          {
            id: "pepperoni-pizza",
            name: "Pepperoni Pizza",
            price: 24.95,
            image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&h=600&fit=crop"
          }
        ]
      },
      {
        name: "Breakfast",
        items: [
          {
            id: "western-omelette",
            name: "Western Omelette",
            description: "with home fries, toast, jam and coffee",
            price: 21.95,
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop"
          },
          {
            id: "cheese-omelette",
            name: "Cheese Omelette",
            description: "with home fries, toast, jam and coffee",
            price: 21.95,
            image: "https://images.unsplash.com/photo-1612940960267-4549a58fb257?w=800&h=600&fit=crop"
          }
        ]
      }
    ]
  },
  features: [
    "Dine-in",
    "Takeout",
    "Delivery",
    "Late Night",
    "Breakfast",
    "Comfort Food"
  ],
  coordinates: {
    lat: 63.7467,
    lng: -68.5170
  }
};