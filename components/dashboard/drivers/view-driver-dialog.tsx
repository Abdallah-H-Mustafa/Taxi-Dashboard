"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Driver } from "@/types/driver";
import { Car, DollarSign, Star, Clock, Calendar, MapPin } from "lucide-react";

interface ViewDriverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver;
}

export function ViewDriverDialog({ open, onOpenChange, driver }: ViewDriverDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-12rem)]">
          <div className="space-y-6 pr-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{driver.firstName} {driver.lastName}</h3>
                <p className="text-sm text-muted-foreground">{driver.email}</p>
              </div>
              <Badge
                variant={
                  driver.status === "available"
                    ? "success"
                    : driver.status === "busy"
                    ? "warning"
                    : "secondary"
                }
              >
                {driver.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rating</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{driver.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Trips</p>
                <p className="font-medium">{driver.totalTrips}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="font-medium">{(driver.completionRate * 100).toFixed(0)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                <p className="font-medium">{(driver.acceptanceRate * 100).toFixed(0)}%</p>
              </div>
            </div>

            {driver.vehicle && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Vehicle Information</h4>
                <div className="bg-muted p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{driver.vehicle.make} {driver.vehicle.model}</span>
                    </div>
                    <Badge variant="outline">{driver.vehicle.type}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Color: {driver.vehicle.color}</p>
                    <p>Plate: {driver.vehicle.licensePlate}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Earnings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="font-medium">${driver.earnings.today}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="font-medium">${driver.earnings.week}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Documents</h4>
              <div className="space-y-2">
                {driver.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium capitalize">{doc.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        doc.status === "active"
                          ? "success"
                          : doc.status === "expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}