"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueReport } from "@/components/dashboard/reports/revenue-report";
import { DriverReport } from "@/components/dashboard/reports/driver-report";
import { TripReport } from "@/components/dashboard/reports/trip-report";
import { PerformanceReport } from "@/components/dashboard/reports/performance-report";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="trips">Trips</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <RevenueReport />
        </TabsContent>

        <TabsContent value="drivers">
          <DriverReport />
        </TabsContent>

        <TabsContent value="trips">
          <TripReport />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceReport />
        </TabsContent>
      </Tabs>
    </div>
  );
}