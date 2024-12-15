"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
  totalLocations: number;
  features: string[];
}

const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "1",
    name: "Restaurant",
    description: "Full-service restaurants with dine-in and takeout options",
    icon: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    status: "active",
    totalLocations: 25,
    features: ["Table Service", "Delivery", "Reservations"]
  },
  {
    id: "2",
    name: "Convenience Store",
    description: "Quick-stop shops for everyday essentials",
    icon: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&h=300&fit=crop",
    status: "active",
    totalLocations: 15,
    features: ["24/7", "Groceries", "ATM"]
  },
  {
    id: "3",
    name: "Cafe",
    description: "Coffee shops and light dining establishments",
    icon: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop",
    status: "active",
    totalLocations: 12,
    features: ["Coffee", "Pastries", "WiFi"]
  },
  {
    id: "4",
    name: "Grocery Store",
    description: "Full-service grocery stores with fresh produce",
    icon: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&h=300&fit=crop",
    status: "active",
    totalLocations: 8,
    features: ["Fresh Produce", "Deli", "Bakery"]
  }
];

export function BusinessTypes() {
  const [businessTypes] = useState<BusinessType[]>(BUSINESS_TYPES);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTypes = businessTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Business Types</h3>
          <p className="text-sm text-muted-foreground">
            Manage different types of businesses in your network
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search business types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Type
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTypes.map((type) => (
          <Card key={type.id} className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src={type.icon}
                alt={type.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={type.status === "active" ? "success" : "secondary"}
                  className="shadow-lg"
                >
                  {type.status}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{type.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {type.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {type.totalLocations} locations
                  </span>
                  <div className="flex gap-2">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}