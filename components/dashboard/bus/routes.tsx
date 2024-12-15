"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BusRoutes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Routes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((route) => (
            <div
              key={route}
              className="flex flex-col space-y-2 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Route #{route}</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Buses on route: 3
              </div>
              <div className="text-sm text-muted-foreground">
                Current passengers: 45
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}