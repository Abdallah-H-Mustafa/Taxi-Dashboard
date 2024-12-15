"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessOverview } from "@/components/dashboard/businesses/business-overview";
import { BusinessTypes } from "@/components/dashboard/businesses/business-types";
import { BusinessLocations } from "@/components/dashboard/businesses/business-locations";
import { BusinessOrders } from "@/components/dashboard/businesses/business-orders";
import { BusinessAnalytics } from "@/components/dashboard/businesses/business-analytics";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BusinessesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Business Management</h2>
        <Button onClick={() => router.push("/dashboard/businesses/add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="types">Business Types</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BusinessOverview />
        </TabsContent>

        <TabsContent value="types">
          <Card>
            <BusinessTypes />
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <BusinessLocations />
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <BusinessOrders />
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <BusinessAnalytics />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}