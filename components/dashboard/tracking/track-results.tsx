"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, Car, User, MapPin } from "lucide-react";

interface TrackResult {
  id: string;
  vehicleNumber: string;
  driverName: string;
  tripId: string;
  pickup: string;
  dropoff: string;
  status: string;
  timestamp: string;
}

interface TrackResultsProps {
  results: TrackResult[];
}

export function TrackResults({ results }: TrackResultsProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-2 px-4 text-left">Time</th>
            <th className="py-2 px-4 text-left">Vehicle/Trip</th>
            <th className="py-2 px-4 text-left">Driver</th>
            <th className="py-2 px-4 text-left">Route</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-b">
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {result.timestamp}
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  {result.vehicleNumber}
                  <span className="text-muted-foreground">
                    ({result.tripId})
                  </span>
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {result.driverName}
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div>{result.pickup}</div>
                    <div className="text-muted-foreground">to</div>
                    <div>{result.dropoff}</div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4">
                <Badge variant={
                  result.status === 'completed' ? 'success' :
                  result.status === 'in_progress' ? 'warning' :
                  'secondary'
                }>
                  {result.status}
                </Badge>
              </td>
            </tr>
          ))}
          {results.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-muted-foreground">
                No results found. Try adjusting your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}