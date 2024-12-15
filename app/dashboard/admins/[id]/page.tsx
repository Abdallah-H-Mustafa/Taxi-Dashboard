"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityLog } from "@/components/dashboard/admins/activity-log";
import { PermissionsManager } from "@/components/dashboard/admins/permissions-manager";
import type { Admin, AdminActivity } from "@/types/admin";

// Mock data - replace with actual API calls
const mockAdmin: Admin = {
  id: "1",
  name: "John Admin",
  email: "john@admin.com",
  role: "admin",
  permissions: ["drivers_view", "trips_view"],
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-03-15T10:30:00Z",
  status: "active",
  department: "Operations",
  activityLog: [],
};

const mockActivities: AdminActivity[] = [
  {
    id: "1",
    adminId: "1",
    action: "login",
    details: "Logged in successfully",
    timestamp: new Date().toISOString(),
    ipAddress: "192.168.1.1",
  },
  {
    id: "2",
    adminId: "1",
    action: "update",
    details: "Updated driver #123 status",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    ipAddress: "192.168.1.1",
  },
];

export default function AdminDetailsPage() {
  const params = useParams();
  const adminId = params.id as string;

  const handlePermissionsUpdate = async (permissions: string[]) => {
    // Mock API call - replace with actual implementation
    console.log("Updating permissions:", permissions);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Admin Details: {mockAdmin.name}
        </h2>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <ActivityLog activities={mockActivities} />
        </TabsContent>
        <TabsContent value="permissions" className="space-y-4">
          <PermissionsManager
            adminId={adminId}
            currentPermissions={mockAdmin.permissions}
            onUpdate={handlePermissionsUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}