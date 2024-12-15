"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ShoppingBag, DollarSign, Clock, Star, ChefHat, TrendingUp } from "lucide-react";
import { RestaurantOrderTimeline } from "./restaurant-order-timeline";

export function RestaurantOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Today's Orders"
          value="156"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          description="Total orders today"
          trend={{ value: 12, label: "vs yesterday" }}
        />
        <StatsCard
          title="Revenue"
          value="$4,289"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="Total revenue today"
          trend={{ value: 8, label: "vs yesterday" }}
        />
        <StatsCard
          title="Avg. Prep Time"
          value="24 min"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="Average preparation time"
          trend={{ value: -5, label: "vs last week" }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <RestaurantOrderTimeline />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <ChefHat className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Item {item}</p>
                      <p className="text-sm text-muted-foreground">
                        {45 - item * 5} orders today
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{4.9 - item * 0.1}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}