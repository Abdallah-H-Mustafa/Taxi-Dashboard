"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Move data to a separate file or API call in a real application
const salesData = [
  { date: "Mon", sales: 4000, orders: 24 },
  { date: "Tue", sales: 3000, orders: 18 },
  { date: "Wed", sales: 5000, orders: 30 },
  { date: "Thu", sales: 2780, orders: 16 },
  { date: "Fri", sales: 6890, orders: 42 },
  { date: "Sat", sales: 8390, orders: 52 },
  { date: "Sun", sales: 4490, orders: 28 },
];

const popularItems = [
  { name: "Classic Burger", orders: 145, revenue: 1885.50 },
  { name: "Margherita Pizza", orders: 125, revenue: 1874.75 },
  { name: "Caesar Salad", orders: 98, revenue: 881.98 },
  { name: "French Fries", orders: 156, revenue: 780.00 },
  { name: "Chicken Wings", orders: 112, revenue: 1232.00 },
];

// Separate chart components for better organization
function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders by Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function PopularItemsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium">Item</th>
                <th className="text-right py-3 font-medium">Orders</th>
                <th className="text-right py-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {popularItems.map((item, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4">{item.name}</td>
                  <td className="py-4 text-right">{item.orders}</td>
                  <td className="py-4 text-right">
                    ${item.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function RestaurantAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <OrdersChart />
      </div>
      <PopularItemsTable />
    </div>
  );
}