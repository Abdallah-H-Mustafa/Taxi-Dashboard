"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit2 } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  type: string;
  time: string;
  address: string;
  destination: string;
  customer: string;
  phone: string;
  zones: string[];
  vehicleType: string;
  vehicleNumber: string;
  status: string;
}

export function RestaurantOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      type: "Delivery",
      time: "10:30 AM",
      address: "123 Main St",
      destination: "456 Oak Ave",
      customer: "John Doe",
      phone: "555-0123",
      zones: ["Zone 1", "Zone 2"],
      vehicleType: "Car",
      vehicleNumber: "",
      status: "pending",
    },
    // Add more orders as needed
  ]);

  const handleVehicleNumberChange = (orderId: string, value: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, vehicleNumber: value }
        : order
    ));
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Zones</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>Vehicle #</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                <Badge variant="outline">{order.type}</Badge>
              </TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell className="max-w-[200px] truncate">{order.address}</TableCell>
              <TableCell className="max-w-[200px] truncate">{order.destination}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {order.zones.map((zone) => (
                    <Badge key={zone} variant="secondary" className="text-xs">
                      {zone}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{order.vehicleType}</TableCell>
              <TableCell>
                <Input
                  className="w-20 h-8"
                  placeholder="#"
                  value={order.vehicleNumber}
                  onChange={(e) => handleVehicleNumberChange(order.id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}