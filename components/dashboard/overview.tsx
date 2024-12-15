"use client";

import { Car, DollarSign, Users, CheckCircle } from "lucide-react";
import { StatsCard } from "./stats-card";
import type { DashboardStats } from "@/types/dashboard";
import { motion } from "framer-motion";

interface OverviewProps {
  stats: DashboardStats;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Overview({ stats }: OverviewProps) {
  return (
    <motion.div 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <StatsCard
        title="Active Drivers"
        value={stats.activeDrivers}
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        description="Total drivers currently online"
        trend={{ value: 12, label: "vs last week" }}
      />
      <StatsCard
        title="Pending Trips"
        value={stats.pendingTrips}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Trips waiting for drivers"
        trend={{ value: -5, label: "vs last hour" }}
      />
      <StatsCard
        title="Completed Trips"
        value={stats.completedTrips}
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        description="Total trips completed today"
        trend={{ value: 8, label: "vs yesterday" }}
      />
      <StatsCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="Revenue generated today"
        trend={{ value: 15, label: "vs last week" }}
      />
    </motion.div>
  );
}