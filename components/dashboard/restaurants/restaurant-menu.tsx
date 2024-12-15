"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Search, Filter } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  status: 'available' | 'out_of_stock';
  preparationTime: number;
  image: string;
  calories?: number;
  allergens?: string[];
  spicyLevel?: 1 | 2 | 3;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    category: "Burgers",
    price: 12.99,
    description: "Juicy beef patty with fresh lettuce, tomato, and melted cheese on a toasted brioche bun",
    status: "available",
    preparationTime: 15,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop",
    calories: 850,
    allergens: ["dairy", "gluten"],
    spicyLevel: 1
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 14.99,
    description: "Traditional Neapolitan pizza with fresh tomatoes, buffalo mozzarella, and basil leaves",
    status: "available",
    preparationTime: 20,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop",
    calories: 780,
    allergens: ["dairy", "gluten"],
  },
  {
    id: "3",
    name: "Spicy Thai Curry",
    category: "Main Course",
    price: 16.99,
    description: "Aromatic Thai red curry with coconut milk, vegetables, and your choice of protein",
    status: "available",
    preparationTime: 25,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=400&fit=crop",
    calories: 650,
    allergens: ["shellfish", "nuts"],
    spicyLevel: 3
  },
  {
    id: "4",
    name: "Caesar Salad",
    category: "Salads",
    price: 8.99,
    description: "Crisp romaine lettuce, garlic croutons, parmesan cheese, and classic Caesar dressing",
    status: "out_of_stock",
    preparationTime: 10,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=400&fit=crop",
    calories: 380,
    allergens: ["dairy", "eggs"],
  }
];

export function RestaurantMenu() {
  const [menuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderSpicyLevel = (level?: number) => {
    if (!level) return null;
    return "🌶️".repeat(level);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">Menu Items</h3>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant's menu items and categories
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="burgers">Burgers</SelectItem>
              <SelectItem value="pizza">Pizza</SelectItem>
              <SelectItem value="main course">Main Course</SelectItem>
              <SelectItem value="salads">Salads</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={item.status === "available" ? "success" : "destructive"}
                  className="shadow-lg"
                >
                  {item.status === "available" ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {item.name}
                    {item.spicyLevel && (
                      <span className="text-sm" title={`Spicy Level ${item.spicyLevel}`}>
                        {renderSpicyLevel(item.spicyLevel)}
                      </span>
                    )}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {item.category}
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.calories && (
                    <Badge variant="outline">
                      {item.calories} cal
                    </Badge>
                  )}
                  {item.allergens?.map((allergen) => (
                    <Badge key={allergen} variant="secondary">
                      {allergen}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm text-muted-foreground">
                    {item.preparationTime} min prep time
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
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