"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Search, Car, Route } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TrackFiltersProps {
  trackBy: 'vehicle' | 'trip';
  vehicleNumber: string;
  tripId: string;
  fromDate?: Date;
  toDate?: Date;
  status: string;
  isLoading: boolean;
  onTrackByChange: (value: 'vehicle' | 'trip') => void;
  onVehicleNumberChange: (value: string) => void;
  onTripIdChange: (value: string) => void;
  onFromDateChange: (date?: Date) => void;
  onToDateChange: (date?: Date) => void;
  onStatusChange: (value: string) => void;
  onSearch: () => void;
}

export function TrackFilters({
  trackBy,
  vehicleNumber,
  tripId,
  fromDate,
  toDate,
  status,
  isLoading,
  onTrackByChange,
  onVehicleNumberChange,
  onTripIdChange,
  onFromDateChange,
  onToDateChange,
  onStatusChange,
  onSearch,
}: TrackFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant={trackBy === 'vehicle' ? 'default' : 'outline'}
          onClick={() => onTrackByChange('vehicle')}
          className="flex-1"
        >
          <Car className="h-4 w-4 mr-2" />
          By Vehicle Number
        </Button>
        <Button
          variant={trackBy === 'trip' ? 'default' : 'outline'}
          onClick={() => onTrackByChange('trip')}
          className="flex-1"
        >
          <Route className="h-4 w-4 mr-2" />
          By Trip ID
        </Button>
      </div>

      <div className="space-y-2">
        <Label>
          {trackBy === 'vehicle' ? 'Vehicle Number' : 'Trip ID'}
        </Label>
        <Input
          value={trackBy === 'vehicle' ? vehicleNumber : tripId}
          onChange={(e) => {
            if (trackBy === 'vehicle') {
              onVehicleNumberChange(e.target.value);
            } else {
              onTripIdChange(e.target.value);
            }
          }}
          placeholder={trackBy === 'vehicle' ? "Enter vehicle number" : "Enter trip ID"}
        />
      </div>

      <div className="space-y-2">
        <Label>From Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? format(fromDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={onFromDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>To Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={onToDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onSearch} className="w-full" disabled={isLoading}>
        <Search className="h-4 w-4 mr-2" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}