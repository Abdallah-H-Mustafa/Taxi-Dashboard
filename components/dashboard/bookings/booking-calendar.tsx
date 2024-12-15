"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import type { Booking } from "@/types/booking";

interface BookingCalendarProps {
  bookings: Booking[];
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getDayBookings = (day: Date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.scheduledTime);
      return (
        bookingDate.getDate() === day.getDate() &&
        bookingDate.getMonth() === day.getMonth() &&
        bookingDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            booked: (date) => getDayBookings(date).length > 0,
          }}
          modifiersStyles={{
            booked: { backgroundColor: "hsl(var(--primary))", color: "white" },
          }}
        />
      </CardContent>
    </Card>
  );
}