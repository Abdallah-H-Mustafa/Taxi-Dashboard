"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import type { TaxiRequest } from "@/types/taxi-service";

// Mock data - replace with actual API calls
const mockRequests: TaxiRequest[] = [
  {
    id: "r1",
    pickupLocation: {
      address: "123 Main St",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    dropoffLocation: {
      address: "456 Park Ave",
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    status: "pending",
    requestTime: new Date().toISOString(),
    estimatedPrice: 25.50,
    vehicleType: "standard",
    passengerCount: 2
  },
];

export function TaxiQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col space-y-3 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline">Request #{request.id}</Badge>
                <Badge variant="secondary">{request.status}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-green-500" />
                  <span>{request.pickupLocation.address}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-red-500" />
                  <span>{request.dropoffLocation.address}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min ago</span>
                  <Users className="h-4 w-4 ml-2" />
                  <span>{request.passengerCount} passengers</span>
                </div>
                <span className="font-medium">${request.estimatedPrice}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Details
                </Button>
                <Button size="sm" className="flex-1">
                  Assign Driver
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}