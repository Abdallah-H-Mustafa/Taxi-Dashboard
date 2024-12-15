"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle, Clock, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";

export function BookingStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Bookings"
        value="156"
        icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
        description="All bookings today"
        trend={{ value: 12, label: "vs yesterday" }}
      />
      <StatsCard
        title="Completed"
        value="124"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        description="Completed bookings"
        trend={{ value: 8, label: "vs yesterday" }}
      />
      <StatsCard
        title="Average Time"
        value="18 min"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="Average booking duration"
        trend={{ value: -5, label: "vs last week" }}
      />
      <StatsCard
        title="Revenue"
        value="$2,845"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Total revenue today"
        trend={{ value: 15, label: "vs yesterday" }}
      />
    </div>
  );
}