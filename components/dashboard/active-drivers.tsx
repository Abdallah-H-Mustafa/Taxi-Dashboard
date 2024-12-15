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
import type { Driver } from "@/types/dashboard";

interface ActiveDriversProps {
  drivers: Driver[];
}

export function ActiveDrivers({ drivers }: ActiveDriversProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Total Trips</TableHead>
            <TableHead>Acceptance Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-medium">{driver.name}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>{driver.rating.toFixed(1)} ⭐</TableCell>
              <TableCell>{driver.totalTrips}</TableCell>
              <TableCell>{(driver.acceptanceRate * 100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}