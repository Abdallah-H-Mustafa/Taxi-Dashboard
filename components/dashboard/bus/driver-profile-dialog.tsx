"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BusDriver } from "@/lib/stores/bus-driver-store";
import { Bus, Clock, FileText, Award } from "lucide-react";

interface BusDriverProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: BusDriver;
}

export function BusDriverProfileDialog({
  open,
  onOpenChange,
  driver
}: BusDriverProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Driver Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-12rem)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">ID: {driver.employeeId}</p>
              </div>
              <Badge
                variant={
                  driver.status === "active"
                    ? "success"
                    : driver.status === "on_break"
                    ? "warning"
                    : "secondary"
                }
              >
                {driver.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">License Details</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Number: {driver.licenseNumber}</p>
                  <p>Class: {driver.licenseClass}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Current Shift</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Start: {driver.shiftStart || "Not started"}</p>
                  <p>End: {driver.shiftEnd || "Not ended"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Certifications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {driver.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {driver.currentRoute && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Current Assignment</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Route: {driver.currentRoute}</p>
                  {driver.currentBus && <p>Bus: {driver.currentBus}</p>}
                </div>
              </div>
            )}

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