"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminActivity } from "@/types/admin";

interface ActivityLogProps {
  activities: AdminActivity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "login":
        return "bg-green-500";
      case "logout":
        return "bg-yellow-500";
      case "update":
        return "bg-blue-500";
      case "delete":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{formatDate(activity.timestamp)}</TableCell>
                <TableCell>
                  <Badge className={getActionColor(activity.action)}>
                    {activity.action}
                  </Badge>
                </TableCell>
                <TableCell>{activity.details}</TableCell>
                <TableCell>{activity.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}