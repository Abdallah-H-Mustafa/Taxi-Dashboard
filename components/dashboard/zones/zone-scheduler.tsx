"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import type { Zone } from "@/types/zone-management";

interface ZoneSchedulerProps {
  zone: Zone;
  onScheduleUpdate: (schedule: Zone['schedule']) => void;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export function ZoneScheduler({ zone, onScheduleUpdate }: ZoneSchedulerProps) {
  const [schedule, setSchedule] = useState<Zone['schedule']>(zone.schedule);

  const handleTimeChange = (day: string, index: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => {
      const daySchedule = [...(prev[day as keyof Zone['schedule']] || [])];
      daySchedule[index] = {
        ...daySchedule[index],
        [field]: value
      };
      return {
        ...prev,
        [day]: daySchedule
      };
    });
  };

  const addTimeSlot = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...(prev[day as keyof Zone['schedule']] || []), { start: '09:00', end: '17:00' }]
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: (prev[day as keyof Zone['schedule']] || []).filter((_, i) => i !== index)
    }));
  };

  const saveSchedule = () => {
    onScheduleUpdate(schedule);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Zone Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {DAYS.map(day => (
            <div key={day} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="capitalize">{day}</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addTimeSlot(day)}
                >
                  Add Time Slot
                </Button>
              </div>
              {(schedule[day as keyof Zone['schedule']] || []).map((slot, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={slot.start}
                    onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={slot.end}
                    onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTimeSlot(day, index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ))}
          <Button onClick={saveSchedule} className="w-full">
            Save Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}