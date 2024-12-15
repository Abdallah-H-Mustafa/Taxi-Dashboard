"use client";

import { Card } from "@/components/ui/card";
import { BookingCalendar } from "@/components/dashboard/bookings/booking-calendar";
import { BookingList } from "@/components/dashboard/bookings/booking-list";
import { BookingStats } from "@/components/dashboard/bookings/booking-stats";
import type { Booking } from "@/types/booking";

// Mock data - replace with actual API calls
const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "user1",
    driverId: "driver1",
    pickupLocation: {
      address: "123 Main St",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    dropoffLocation: {
      address: "456 Park Ave",
      coordinates: { lat: 40.7580, lng: -73.9855 }
    },
    status: "pending",
    scheduledTime: "2024-03-20T10:00:00Z",
    price: 25.50,
    distance: 3.2,
    duration: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock bookings...
];

export default function BookingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Daily Bookings</h2>
      </div>
      <BookingStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <BookingList bookings={mockBookings} />
        </Card>
        <Card className="col-span-3">
          <BookingCalendar bookings={mockBookings} />
        </Card>
      </div>
    </div>
  );
}