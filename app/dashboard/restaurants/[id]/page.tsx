"use client";

import { useParams } from "next/navigation";
import { RestaurantProfile } from "@/components/dashboard/restaurants/restaurant-profile";
import { getRestaurantById } from "@/lib/data/restaurants";

export default function RestaurantPage() {
  const params = useParams();
  const id = params.id as string;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Restaurant Not Found</h1>
          <p className="text-muted-foreground">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return <RestaurantProfile restaurant={restaurant} />;
}