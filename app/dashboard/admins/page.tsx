"use client";

import { Card } from "@/components/ui/card";
import { AdminTable } from "@/components/dashboard/admins/admin-table";
import { AddAdminDialog } from "@/components/dashboard/admins/add-admin-dialog";
import type { Admin } from "@/types/admin";
import { hasPermission } from "@/lib/auth";

// Mock data - replace with actual API calls
const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john@admin.com",
    role: "super_admin",
    permissions: ["all"],
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Moderator",
    email: "jane@admin.com",
    role: "moderator",
    permissions: ["read", "write"],
    createdAt: "2024-02-01T00:00:00Z",
    lastLogin: "2024-03-14T15:45:00Z",
  },
];

export default function AdminsPage() {
  const canAddAdmin = hasPermission("add_admin");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
        {canAddAdmin && <AddAdminDialog />}
      </div>
      <Card className="p-6">
        <AdminTable admins={mockAdmins} />
      </Card>
    </div>
  );
}