"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Clock, Building2 } from "lucide-react";

interface Order {
  id: string;
  companyName: string;
  orderType: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  date: string;
  items: string[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    companyName: "Northern Enterprises Ltd",
    orderType: "Equipment",
    status: "pending",
    amount: 1250.00,
    date: "2024-03-15T10:30:00Z",
    items: ["Laptop x2", "Monitors x3"]
  },
  {
    id: "ORD-002",
    companyName: "Arctic Solutions Inc",
    orderType: "Supplies",
    status: "processing",
    amount: 450.75,
    date: "2024-03-15T09:15:00Z",
    items: ["Office Supplies", "Printer Paper"]
  }
];

export function CompanyOrders() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    <div>
                      <h3 className="font-medium">{order.companyName}</h3>
                      <p className="text-sm text-muted-foreground">Order {order.id}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "success"
                        : order.status === "cancelled"
                        ? "destructive"
                        : order.status === "processing"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Items:</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${order.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-end text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(order.date).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}