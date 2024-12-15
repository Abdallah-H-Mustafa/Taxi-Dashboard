"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Filter } from "lucide-react";

interface Order {
  id: string;
  businessName: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  time: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    businessName: "Northern Delights",
    customerName: "John Doe",
    items: ["Arctic Burger", "Ice Tea", "Fries"],
    total: 28.50,
    status: "preparing",
    time: "10:30 AM"
  },
  {
    id: "ORD-002",
    businessName: "Tundra Cafe",
    customerName: "Jane Smith",
    items: ["Hot Chocolate", "Muffin"],
    total: 12.75,
    status: "pending",
    time: "10:25 AM"
  },
  {
    id: "ORD-003",
    businessName: "Arctic Convenience",
    customerName: "Mike Johnson",
    items: ["Groceries", "Snacks"],
    total: 45.20,
    status: "delivered",
    time: "10:15 AM"
  }
];

export function BusinessOrders() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Active Orders</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and manage orders across all businesses
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{order.businessName}</h4>
                    <Badge variant="outline">{order.id}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer: {order.customerName}
                  </p>
                </div>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Items:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{order.time}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}