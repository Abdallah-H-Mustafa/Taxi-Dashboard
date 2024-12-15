"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialSettings } from "@/components/dashboard/companies/settings/financial-settings";
import { GeneralSettings } from "@/components/dashboard/companies/settings/general-settings";
import { DispatchIconSettings } from "@/components/dashboard/dispatch/dispatch-icon-settings";

export default function CompanySettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Company Settings</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="dispatch">Dispatch Interface</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialSettings />
        </TabsContent>

        <TabsContent value="dispatch">
          <DispatchIconSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}