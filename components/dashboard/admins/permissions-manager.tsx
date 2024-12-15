"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Permission } from "@/types/admin";

const AVAILABLE_PERMISSIONS: Permission[] = [
  {
    id: "drivers_view",
    name: "View Drivers",
    description: "Can view driver profiles and status",
    category: "drivers",
  },
  {
    id: "drivers_manage",
    name: "Manage Drivers",
    description: "Can add, edit, and deactivate drivers",
    category: "drivers",
  },
  {
    id: "trips_view",
    name: "View Trips",
    description: "Can view trip details and history",
    category: "trips",
  },
  {
    id: "trips_manage",
    name: "Manage Trips",
    description: "Can manage and assign trips",
    category: "trips",
  },
  {
    id: "reports_view",
    name: "View Reports",
    description: "Can view analytics and reports",
    category: "reports",
  },
  {
    id: "admins_manage",
    name: "Manage Admins",
    description: "Can add and manage other admins",
    category: "admins",
  },
];

interface PermissionsManagerProps {
  adminId: string;
  currentPermissions: string[];
  onUpdate: (permissions: string[]) => void;
}

export function PermissionsManager({
  adminId,
  currentPermissions,
  onUpdate,
}: PermissionsManagerProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    currentPermissions
  );
  const [isLoading, setIsLoading] = useState(false);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onUpdate(selectedPermissions);
      toast.success("Permissions updated successfully");
    } catch (error) {
      toast.error("Failed to update permissions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(
            AVAILABLE_PERMISSIONS.reduce((acc, permission) => {
              if (!acc[permission.category]) {
                acc[permission.category] = [];
              }
              acc[permission.category].push(permission);
              return acc;
            }, {} as Record<string, Permission[]>)
          ).map(([category, permissions]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold capitalize">{category}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() =>
                        handlePermissionToggle(permission.id)
                      }
                      disabled={isLoading}
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={permission.id}>{permission.name}</Label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-6"
          >
            {isLoading ? "Updating..." : "Update Permissions"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}