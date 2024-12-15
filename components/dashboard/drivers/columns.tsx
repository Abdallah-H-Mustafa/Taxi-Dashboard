"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Driver } from "@/types/dashboard";

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "available"
              ? "success"
              : status === "busy"
              ? "warning"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return `${rating.toFixed(1)} ⭐`;
    },
  },
  {
    accessorKey: "totalTrips",
    header: "Total Trips",
  },
  {
    accessorKey: "acceptanceRate",
    header: "Acceptance Rate",
    cell: ({ row }) => {
      const rate = row.getValue("acceptanceRate") as number;
      return `${(rate * 100).toFixed(0)}%`;
    },
  },
];