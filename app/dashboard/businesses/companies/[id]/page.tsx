"use client";

import dynamic from 'next/dynamic';
import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Dynamically import heavy components
const BusinessOverview = dynamic(
  () => import("@/components/dashboard/businesses/companies/details/business-overview").then(mod => mod.BusinessOverview),
  { loading: () => <LoadingCard /> }
);

const BusinessMenu = dynamic(
  () => import("@/components/dashboard/businesses/companies/details/business-menu").then(mod => mod.BusinessMenu),
  { loading: () => <LoadingCard /> }
);

const BusinessOrders = dynamic(
  () => import("@/components/dashboard/businesses/companies/details/business-orders").then(mod => mod.BusinessOrders),
  { loading: () => <LoadingCard /> }
);

const BusinessAnalytics = dynamic(
  () => import("@/components/dashboard/businesses/companies/details/business-analytics").then(mod => mod.BusinessAnalytics),
  { loading: () => <LoadingCard /> }
);

const BusinessSettings = dynamic(
  () => import("@/components/dashboard/businesses/companies/details/business-settings").then(mod => mod.BusinessSettings),
  { loading: () => <LoadingCard /> }
);

function LoadingCard() {
  return (
    <Card className="w-full h-[400px] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </Card>
  );
}

export default function BusinessDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Business Details</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="menu">Menu & Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <Suspense fallback={<LoadingCard />}>
          <TabsContent value="overview">
            <BusinessOverview businessId={params.id as string} />
          </TabsContent>

          <TabsContent value="menu">
            <BusinessMenu businessId={params.id as string} />
          </TabsContent>

          <TabsContent value="orders">
            <BusinessOrders businessId={params.id as string} />
          </TabsContent>

          <TabsContent value="analytics">
            <BusinessAnalytics businessId={params.id as string} />
          </TabsContent>

          <TabsContent value="settings">
            <BusinessSettings businessId={params.id as string} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
}