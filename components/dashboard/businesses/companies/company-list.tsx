"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Store, MapPin, Phone, Mail, Globe, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

interface Company {
  id: string;
  name: string;
  type: 'restaurant' | 'convenience_store' | 'other';
  category?: string;
  status: 'active' | 'pending' | 'inactive';
  address: string;
  phone: string;
  email: string;
  website?: string;
  employeeCount: number;
  registrationDate: string;
  image?: string;
  openingHours?: {
    open: string;
    close: string;
  };
  features?: string[];
  rating?: number;
  totalOrders?: number;
  averageOrderValue?: number;
}

const MOCK_COMPANIES: Company[] = [
  // Restaurants
  {
    id: "1",
    name: "The Snack",
    type: "restaurant",
    category: "Fast Food",
    status: "active",
    address: "979 Federal Road, Iqaluit, NU",
    phone: "(867) 979-6767",
    email: "info@thesnack.com",
    website: "www.thesnack.com",
    employeeCount: 15,
    registrationDate: "2023-01-15",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    openingHours: {
      open: "11:00",
      close: "23:00"
    },
    features: ["Dine-in", "Takeout", "Delivery"],
    rating: 4.8,
    totalOrders: 1250,
    averageOrderValue: 25.50
  },
  {
    id: "2",
    name: "Arctic Cafe",
    type: "restaurant",
    category: "Cafe",
    status: "active",
    address: "456 Polar Ave, Iqaluit, NU",
    phone: "(867) 979-1234",
    email: "info@arcticcafe.com",
    website: "www.arcticcafe.com",
    employeeCount: 10,
    registrationDate: "2023-02-20",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop",
    openingHours: {
      open: "07:00",
      close: "20:00"
    },
    features: ["Coffee", "Pastries", "WiFi"],
    rating: 4.7,
    totalOrders: 980,
    averageOrderValue: 15.75
  },
  
  // Convenience Stores
  {
    id: "3",
    name: "Arctic Convenience",
    type: "convenience_store",
    category: "Convenience Store",
    status: "active",
    address: "789 Tundra Rd, Iqaluit, NU",
    phone: "(867) 979-5555",
    email: "info@arcticconvenience.com",
    website: "www.arcticconvenience.com",
    employeeCount: 8,
    registrationDate: "2023-03-10",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&h=300&fit=crop",
    openingHours: {
      open: "00:00",
      close: "24:00"
    },
    features: ["24/7", "Groceries", "ATM"],
    rating: 4.5,
    totalOrders: 750,
    averageOrderValue: 20.25
  },
  {
    id: "4",
    name: "Polar Market",
    type: "convenience_store",
    category: "Convenience Store",
    status: "active",
    address: "321 Ice St, Iqaluit, NU",
    phone: "(867) 979-4444",
    email: "info@polarmarket.com",
    website: "www.polarmarket.com",
    employeeCount: 6,
    registrationDate: "2023-04-05",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&h=300&fit=crop",
    openingHours: {
      open: "06:00",
      close: "22:00"
    },
    features: ["Fresh Produce", "Hot Food", "Delivery"],
    rating: 4.3,
    totalOrders: 550,
    averageOrderValue: 18.50
  }
];

export function CompanyList() {
  const [companies] = useState<Company[]>(MOCK_COMPANIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || company.type === typeFilter;
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="convenience_store">Convenience Stores</SelectItem>
              <SelectItem value="other">Other Businesses</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              {company.image && (
                <div className="relative h-48">
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        company.status === "active"
                          ? "success"
                          : company.status === "pending"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {company.status}
                    </Badge>
                  </div>
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    <div>
                      <h3 className="font-medium">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.category}</p>
                    </div>
                  </div>
                  {company.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span>{company.rating}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {company.address}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {company.phone}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {company.email}
                  </div>
                  {company.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="h-4 w-4 mr-2" />
                      {company.website}
                    </div>
                  )}
                  {company.openingHours && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {company.openingHours.open} - {company.openingHours.close}
                    </div>
                  )}
                </div>

                {company.features && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {company.totalOrders && (
                    <div className="flex items-center gap-1">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      <span>{company.totalOrders} orders</span>
                    </div>
                  )}
                  {company.averageOrderValue && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${company.averageOrderValue.toFixed(2)} avg</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}