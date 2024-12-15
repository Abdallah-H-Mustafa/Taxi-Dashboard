"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface BusScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TimeSlot {
  id: string;
  routeId: string;
  departureTime: string;
  busId: string;
  driverId: string;
  frequency: number;
  status: 'active' | 'inactive';
}

export function BusScheduleDialog({ open, onOpenChange }: BusScheduleDialogProps) {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      routeId: "R1",
      departureTime: "09:00",
      busId: "B1",
      driverId: "D1",
      frequency: 30,
      status: 'active'
    },
    {
      id: "2",
      routeId: "R1",
      departureTime: "09:30",
      busId: "B2",
      driverId: "D2",
      frequency: 30,
      status: 'active'
    }
  ]);

  const handleSave = () => {
    // Save schedule logic here
    toast.success("Schedule saved successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bus Schedule Management</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Select Route</Label>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger>
                <SelectValue placeholder="Select a route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="R1">Downtown Express (R1)</SelectItem>
                <SelectItem value="R2">Airport Shuttle (R2)</SelectItem>
                <SelectItem value="R3">Mall Circuit (R3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Time Slots</Label>
              <Button size="sm">Add Time Slot</Button>
            </div>
            
            <div className="border rounded-lg divide-y">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Departure Time</Label>
                      <Input
                        type="time"
                        value={slot.departureTime}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bus</Label>
                      <Select value={slot.busId}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B1">Bus #001</SelectItem>
                          <SelectItem value="B2">Bus #002</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Driver</Label>
                      <Select value={slot.driverId}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="D1">John Doe</SelectItem>
                          <SelectItem value="D2">Jane Smith</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency (min)</Label>
                      <Input
                        type="number"
                        value={slot.frequency}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Remove</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Schedule</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}