"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Search, Filter, MapPin, Phone, Clock, Building2 } from "lucide-react";
import Image from "next/image";

interface Business {
  id: string;
  name: string;
  type: 'restaurant' | 'convenience_store' | 'cafe' | 'bakery' | 'grocery';
  address: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  image: string;
  openingHours: string;
  categories: string[];
  area: string;
  totalOrders: number;
  companyId: string;
}

const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Northern Delights Restaurant",
    type: "restaurant",
    address: "123 Main St, Iqaluit",
    phone: "(867) 555-0101",
    status: "active",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    openingHours: "8:00 AM - 10:00 PM",
    categories: ["Fine Dining", "Local Cuisine"],
    area: "Downtown",
    totalOrders: 1250,
    companyId: "caribou-group"
  },
  {
    id: "2",
    name: "Arctic Convenience",
    type: "convenience_store",
    address: "456 Polar Ave, Iqaluit",
    phone: "(867) 555-0102",
    status: "active",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&h=300&fit=crop",
    openingHours: "24/7",
    categories: ["Convenience", "Groceries"],
    area: "Central",
    totalOrders: 980,
    companyId: "arctic-retail"
  },
  {
    id: "3",
    name: "Tundra Cafe",
    type: "cafe",
    address: "789 Snow Rd, Iqaluit",
    phone: "(867) 555-0103",
    status: "active",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop",
    openingHours: "6:00 AM - 8:00 PM",
    categories: ["Coffee", "Pastries"],
    area: "University District",
    totalOrders: 750,
    companyId: "caribou-group"
  },
  {
    id: "4",
    name: "Northern Grocers",
    type: "grocery",
    address: "321 Market St, Iqaluit",
    phone: "(867) 555-0104",
    status: "active",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&h=300&fit=crop",
    openingHours: "7:00 AM - 11:00 PM",
    categories: ["Grocery", "Fresh Produce"],
    area: "East Side",
    totalOrders: 1500,
    companyId: "arctic-retail"
  }
];

export function RestaurantBusinesses() {
  const [businesses] = useState<Business[]>(BUSINESSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || business.type === typeFilter;
    const matchesStatus = statusFilter === "all" || business.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeLabel = (type: Business['type']) => {
    const labels = {
      restaurant: "Restaurant",
      convenience_store: "Convenience Store",
      cafe: "Café",
      bakery: "Bakery",
      grocery: "Grocery Store"
    };
    return labels[type];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Business Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage all your business locations and franchises
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Building2 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="convenience_store">Convenience Stores</SelectItem>
              <SelectItem value="cafe">Cafés</SelectItem>
              <SelectItem value="bakery">Bakeries</SelectItem>
              <SelectItem value="grocery">Grocery Stores</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBusinesses.map((business) => (
          <Card key={business.id} className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src={business.image}
                alt={business.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    business.status === "active"
                      ? "success"
                      : business.status === "pending"
                      ? "warning"
                      : "secondary"
                  }
                  className="shadow-lg"
                >
                  {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{business.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getTypeLabel(business.type)}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span>{business.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {business.address}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {business.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {business.openingHours}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {business.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Area: {business.area}</span>
                  <span>{business.totalOrders} orders</span>
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