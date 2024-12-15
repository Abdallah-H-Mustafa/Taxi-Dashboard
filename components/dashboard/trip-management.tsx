"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trip } from "@/types/dashboard";

interface TripManagementProps {
  trips: Trip[];
}

export function TripManagement({ trips }: TripManagementProps) {
  const [filter, setFilter] = useState<Trip["status"]>("pending");

  const filteredTrips = trips.filter((trip) => trip.status === filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Trip Management</CardTitle>
            <CardDescription>Manage and monitor ongoing trips</CardDescription>
          </div>
          <Select value={filter} onValueChange={(value: Trip["status"]) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <div className="font-medium">Trip #{trip.id}</div>
                <div className="text-sm text-muted-foreground">
                  From: {trip.pickup.address}
                </div>
                <div className="text-sm text-muted-foreground">
                  To: {trip.dropoff.address}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={
                    trip.status === "active"
                      ? "warning"
                      : trip.status === "completed"
                      ? "success"
                      : trip.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {trip.status}
                </Badge>
                <div className="text-sm font-medium">${trip.price}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}