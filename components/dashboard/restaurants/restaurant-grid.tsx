"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Restaurant } from "@/types/restaurant";

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{restaurant.name}</CardTitle>
              <Badge
                variant={
                  restaurant.status === "open"
                    ? "success"
                    : restaurant.status === "busy"
                    ? "warning"
                    : "secondary"
                }
              >
                {restaurant.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{restaurant.address}</p>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((type) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm">⭐ {restaurant.rating}</span>
                <span className="text-sm">{restaurant.totalOrders} orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}