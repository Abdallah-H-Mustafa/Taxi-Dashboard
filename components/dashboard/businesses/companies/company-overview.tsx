"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Building2, DollarSign, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Companies"
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
          title="Total Employees"
          value="1,234"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Across all companies"
          trend={{ value: 5, label: "vs last month" }}
        />
        <StatsCard
          title="Locations"
          value="156"
          icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          description="Active locations"
          trend={{ value: 15, label: "vs last month" }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New Company Added",
                  details: "Arctic Solutions Inc joined the network",
                  time: "5 minutes ago",
                },
                {
                  action: "Location Update",
                  details: "Northern Enterprises opened new branch",
                  time: "2 hours ago",
                },
                {
                  action: "Status Change",
                  details: "Polar Tech Ltd status changed to active",
                  time: "4 hours ago",
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

        <Card>
          <CardHeader>
            <CardTitle>Company Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Technology", count: 18, percentage: 37.5 },
                { type: "Retail", count: 12, percentage: 25 },
                { type: "Manufacturing", count: 8, percentage: 16.7 },
                { type: "Services", count: 6, percentage: 12.5 },
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
      </div>
    </div>
  );
}