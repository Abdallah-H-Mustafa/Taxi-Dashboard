"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyOverview } from "@/components/dashboard/businesses/companies/company-overview";
import { CompanyList } from "@/components/dashboard/businesses/companies/company-list";
import { CompanyLocations } from "@/components/dashboard/businesses/companies/company-locations";
import { CompanyAnalytics } from "@/components/dashboard/businesses/companies/company-analytics";
import { CompanyOrders } from "@/components/dashboard/businesses/companies/company-orders";
import { CompanyHeader } from "@/components/dashboard/businesses/companies/company-header";

export default function BusinessCompaniesPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CompanyHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CompanyOverview />
        </TabsContent>

        <TabsContent value="companies">
          <CompanyList />
        </TabsContent>

        <TabsContent value="locations">
          <CompanyLocations />
        </TabsContent>

        <TabsContent value="orders">
          <CompanyOrders />
        </TabsContent>

        <TabsContent value="analytics">
          <CompanyAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}