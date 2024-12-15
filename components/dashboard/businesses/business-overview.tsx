"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Store, DollarSign, Users, Building2, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Businesses"
          value="48"
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          description="Active businesses"
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatsCard
          title="Total Revenue"
          value="$89,240"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="This month"
          trend={{ value: 8.2, label: "vs last month" }}
        />
        <StatsCard
          title="Active Orders"
          value="156"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          description="Across all businesses"
          trend={{ value: 5, label: "vs last hour" }}
        />
        <StatsCard
          title="Total Customers"
          value="2,845"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="This month"
          trend={{ value: 15, label: "vs last month" }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Restaurants", count: 18, percentage: 37.5 },
                { type: "Convenience Stores", count: 12, percentage: 25 },
                { type: "Cafes", count: 8, percentage: 16.7 },
                { type: "Grocery Stores", count: 6, percentage: 12.5 },
                { type: "Others", count: 4, percentage: 8.3 },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.type}</p>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.count}</span>
                    <span className="text-sm text-muted-foreground">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New Business Added",
                  details: "Arctic Cafe joined the network",
                  time: "5 minutes ago",
                },
                {
                  action: "Order Milestone",
                  details: "Northern Delights reached 1000 orders",
                  time: "2 hours ago",
                },
                {
                  action: "Business Updated",
                  details: "Tundra Market updated their menu",
                  time: "4 hours ago",
                },
                {
                  action: "High Performance",
                  details: "5 businesses exceeded targets",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}