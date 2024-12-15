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
import { Eye, Edit2, Ban } from "lucide-react";
import type { Trip } from "@/types/trip";

interface TripListProps {
  trips: Trip[];
}

export function TripList({ trips }: TripListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trip ID</TableHead>
          <TableHead>Passenger</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Pickup</TableHead>
          <TableHead>Dropoff</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Fare</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.id}</TableCell>
            <TableCell>{trip.passengerId}</TableCell>
            <TableCell>{trip.driverId || "—"}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {trip.pickup.address}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {trip.dropoff.address}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  trip.status === "completed"
                    ? "success"
                    : trip.status === "cancelled"
                    ? "destructive"
                    : trip.status === "in_progress"
                    ? "warning"
                    : "secondary"
                }
              >
                {trip.status}
              </Badge>
            </TableCell>
            <TableCell>${trip.fare.toFixed(2)}</TableCell>
            <TableCell>{formatDate(trip.scheduledTime || "")}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Ban className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}