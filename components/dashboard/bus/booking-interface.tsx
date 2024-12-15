"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { useBusTripStore } from "@/lib/stores/bus-trip-store";

export function BusBookingInterface() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTrip } = useBusTripStore();

  const [formData, setFormData] = useState({
    routeId: "",
    startLocation: "",
    endLocation: "",
    passengerCount: "1",
    scheduledTime: "",
    specialRequirements: "",
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!formData.routeId || !formData.startLocation || !formData.endLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      addTrip({
        routeId: formData.routeId,
        vehicleId: "",
        driverId: "",
        status: "scheduled",
        startTime: formData.scheduledTime || new Date().toISOString(),
        currentStop: formData.startLocation,
        nextStop: formData.endLocation,
        passengerCount: parseInt(formData.passengerCount),
      });

      toast.success("Bus trip booked successfully");
      resetForm();
    } catch (error) {
      toast.error("Failed to book bus trip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      routeId: "",
      startLocation: "",
      endLocation: "",
      passengerCount: "1",
      scheduledTime: "",
      specialRequirements: "",
    });
    setIsScheduled(false);
  };

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Bus Booking Interface</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 -mr-2"
            onClick={() => setIsScheduled(!isScheduled)}
          >
            <Calendar className={`h-4 w-4 ${isScheduled ? "text-primary" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 h-[calc(100%-4rem)] overflow-y-auto">
        {isScheduled && (
          <div className="space-y-2">
            <Label htmlFor="scheduledTime" className="text-sm">Schedule Date/Time</Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="h-9 text-sm"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="routeId" className="text-sm">Route</Label>
          <Select
            value={formData.routeId}
            onValueChange={(value) => setFormData({ ...formData, routeId: value })}
          >
            <SelectTrigger id="routeId" className="h-9">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="R1">Downtown Express (R1)</SelectItem>
              <SelectItem value="R2">Airport Shuttle (R2)</SelectItem>
              <SelectItem value="R3">Mall Circuit (R3)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startLocation" className="text-sm">Start Location</Label>
          <Select
            value={formData.startLocation}
            onValueChange={(value) => setFormData({ ...formData, startLocation: value })}
          >
            <SelectTrigger id="startLocation" className="h-9">
              <SelectValue placeholder="Select start location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown Station</SelectItem>
              <SelectItem value="mall">Mall Station</SelectItem>
              <SelectItem value="airport">Airport Terminal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endLocation" className="text-sm">End Location</Label>
          <Select
            value={formData.endLocation}
            onValueChange={(value) => setFormData({ ...formData, endLocation: value })}
          >
            <SelectTrigger id="endLocation" className="h-9">
              <SelectValue placeholder="Select end location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downtown">Downtown Station</SelectItem>
              <SelectItem value="mall">Mall Station</SelectItem>
              <SelectItem value="airport">Airport Terminal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengerCount" className="text-sm">Number of Passengers</Label>
          <Select
            value={formData.passengerCount}
            onValueChange={(value) => setFormData({ ...formData, passengerCount: value })}
          >
            <SelectTrigger id="passengerCount" className="h-9">
              <SelectValue placeholder="Select number of passengers" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 10, 15, 20].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'passenger' : 'passengers'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequirements" className="text-sm">Special Requirements</Label>
          <Input
            id="specialRequirements"
            placeholder="e.g., wheelchair access, luggage space"
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            className="h-9 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 h-9 text-sm" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Book Trip"}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 h-9 text-sm"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}