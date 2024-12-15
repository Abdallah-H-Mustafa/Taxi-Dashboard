"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { time: "09:00", responseTime: 45, activeTrips: 12 },
  { time: "10:00", responseTime: 38, activeTrips: 15 },
  { time: "11:00", responseTime: 42, activeTrips: 18 },
  { time: "12:00", responseTime: 35, activeTrips: 22 },
  { time: "13:00", responseTime: 40, activeTrips: 20 },
];

export function PerformanceMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="responseTime"
                stroke="hsl(var(--primary))"
                name="Response Time (s)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="activeTrips"
                stroke="hsl(var(--destructive))"
                name="Active Trips"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}