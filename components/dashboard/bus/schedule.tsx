"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BusSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((bus) => (
            <div
              key={bus}
              className="flex flex-col space-y-2 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Bus #{bus}</span>
                <Badge variant="secondary">On Route</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Route: Downtown Loop
              </div>
              <div className="text-sm text-muted-foreground">
                Next Stop: Central Station (5 min)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}