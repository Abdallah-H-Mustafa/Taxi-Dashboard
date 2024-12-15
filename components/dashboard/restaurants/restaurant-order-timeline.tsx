"use client";

import { Badge } from "@/components/ui/badge";

export function RestaurantOrderTimeline() {
  const orders = [
    {
      id: "1",
      time: "10:30 AM",
      status: "preparing",
      items: ["Burger", "Fries", "Drink"],
      customer: "John Doe",
    },
    {
      id: "2",
      time: "10:25 AM",
      status: "ready",
      items: ["Pizza", "Salad"],
      customer: "Jane Smith",
    },
    {
      id: "3",
      time: "10:20 AM",
      status: "delivered",
      items: ["Pasta", "Breadsticks"],
      customer: "Mike Johnson",
    },
  ];

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="flex gap-4">
          <div className="w-24 text-sm text-muted-foreground">
            {order.time}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Order #{order.id}</div>
              <Badge
                variant={
                  order.status === "preparing"
                    ? "default"
                    : order.status === "ready"
                    ? "success"
                    : "secondary"
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {order.items.join(", ")}
            </div>
            <div className="text-sm">Customer: {order.customer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}