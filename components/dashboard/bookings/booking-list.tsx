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
import { Eye } from "lucide-react";
import type { Booking } from "@/types/booking";

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings }: BookingListProps) {
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{formatTime(booking.scheduledTime)}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {booking.pickupLocation.address}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {booking.dropoffLocation.address}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "completed"
                      ? "success"
                      : booking.status === "cancelled"
                      ? "destructive"
                      : booking.status === "in_progress"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>${booking.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}