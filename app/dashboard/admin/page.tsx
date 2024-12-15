"use client";

import { Overview } from "@/components/dashboard/overview";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Building2, Users, Car, FileText } from "lucide-react";
import { useCompanyStore } from "@/lib/stores/company-store";
import { useDriverStore } from "@/lib/stores/driver-store";
import { useDispatcherStore } from "@/lib/stores/dispatcher-store";

export default function AdminDashboardPage() {
  const companies = useCompanyStore((state) => state.companies);
  const drivers = useDriverStore((state) => state.drivers);
  const dispatchers = useDispatcherStore((state) => state.dispatchers);

  const stats = {
    totalCompanies: companies.length,
    totalDrivers: drivers.size,
    totalDispatchers: dispatchers.size,
    activeCompanies: companies.filter(c => c.status === 'active').length
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Companies"
          value={stats.totalCompanies}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          description="Registered companies"
        />
        <StatsCard
          title="Total Drivers"
          value={stats.totalDrivers}
          icon={<Car className="h-4 w-4 text-muted-foreground" />}
          description="Across all companies"
        />
        <StatsCard
          title="Total Dispatchers"
          value={stats.totalDispatchers}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Active dispatchers"
        />
        <StatsCard
          title="Active Companies"
          value={stats.activeCompanies}
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          description="Currently active"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          {/* Add company activity chart */}
        </Card>
        <Card className="col-span-3">
          {/* Add recent activity feed */}
        </Card>
      </div>
    </div>
  );
}