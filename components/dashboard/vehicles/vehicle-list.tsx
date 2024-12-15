"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Ban } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

interface VehicleListProps {
  vehicles: Vehicle[];
  onView: (vehicleId: string) => void;
  onEdit: (vehicleId: string) => void;
}

export function VehicleList({ vehicles, onView, onEdit }: VehicleListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Registration</TableHead>
          <TableHead>Make & Model</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Last Service</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
            <TableCell>{vehicle.make} {vehicle.model}</TableCell>
            <TableCell>{vehicle.type}</TableCell>
            <TableCell>
              <Badge
                variant={
                  vehicle.status === "active"
                    ? "success"
                    : vehicle.status === "maintenance"
                    ? "warning"
                    : "secondary"
                }
              >
                {vehicle.status}
              </Badge>
            </TableCell>
            <TableCell>{vehicle.assignedDriver || "—"}</TableCell>
            <TableCell>{vehicle.lastService ? formatDate(vehicle.lastService) : "—"}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => onView(vehicle.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onEdit(vehicle.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Ban className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}