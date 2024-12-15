"use client";

import { memo } from 'react';
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, DollarSign, Users, ShoppingBag, Clock, Star } from "lucide-react";

interface BusinessOverviewProps {
  businessId: string;
}

const PopularItems = memo(function PopularItems() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-muted-foreground" />
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
  );
});

const RecentOrders = memo(function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((order) => (
            <div
              key={order}
              className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="space-y-1">
                <p className="font-medium">Order #{order}</p>
                <p className="text-sm text-muted-foreground">
                  {3 + order} items • ${(25 + order * 5).toFixed(2)}
                </p>
              </div>
              <Badge variant="secondary">
                {order === 1 ? "Preparing" : order === 2 ? "Ready" : "Completed"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export function BusinessOverview({ businessId }: BusinessOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          title="Customers"
          value="2,845"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Total customers"
          trend={{ value: 15, label: "vs last month" }}
        />
        <StatsCard
          title="Avg. Prep Time"
          value="24 min"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="Average preparation time"
          trend={{ value: -5, label: "vs last week" }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PopularItems />
        <RecentOrders />
      </div>
    </div>
  );
}

export default memo(BusinessOverview);