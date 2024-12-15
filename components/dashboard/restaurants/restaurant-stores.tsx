"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Search, Filter, MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: 'open' | 'closed' | 'busy';
  rating: number;
  image: string;
  openingHours: string;
  cuisine: string[];
  deliveryArea: string;
  averagePreparationTime: number;
  totalOrders: number;
}

const STORES: Store[] = [
  {
    id: "1",
    name: "Downtown Diner",
    address: "123 Main St, Iqaluit",
    phone: "(867) 555-0101",
    status: "open",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    openingHours: "8:00 AM - 10:00 PM",
    cuisine: ["American", "Breakfast"],
    deliveryArea: "Downtown",
    averagePreparationTime: 20,
    totalOrders: 1250
  },
  {
    id: "2",
    name: "Arctic Flavors",
    address: "456 Polar Ave, Iqaluit",
    phone: "(867) 555-0102",
    status: "busy",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop",
    openingHours: "11:00 AM - 9:00 PM",
    cuisine: ["Local", "Seafood"],
    deliveryArea: "Central",
    averagePreparationTime: 25,
    totalOrders: 980
  },
  {
    id: "3",
    name: "Northern Bites",
    address: "789 Tundra Rd, Iqaluit",
    phone: "(867) 555-0103",
    status: "closed",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop",
    openingHours: "10:00 AM - 8:00 PM",
    cuisine: ["Canadian", "Fusion"],
    deliveryArea: "North Area",
    averagePreparationTime: 15,
    totalOrders: 750
  }
];

export function RestaurantStores() {
  const [stores] = useState<Store[]>(STORES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Store Locations</h3>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant locations and franchises
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores..."
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
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    store.status === "open"
                      ? "success"
                      : store.status === "busy"
                      ? "warning"
                      : "destructive"
                  }
                  className="shadow-lg"
                >
                  {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{store.name}</CardTitle>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span>{store.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {store.address}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {store.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {store.openingHours}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {store.cuisine.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Avg. Prep Time: {store.averagePreparationTime} min</span>
                  <span>{store.totalOrders} orders</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}