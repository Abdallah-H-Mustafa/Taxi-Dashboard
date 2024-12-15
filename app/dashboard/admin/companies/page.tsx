"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import { AddCompanyDialog } from "@/components/dashboard/admin/companies/add-company-dialog";
import { EditCompanyDialog } from "@/components/dashboard/admin/companies/edit-company-dialog";
import { ViewCompanyDialog } from "@/components/dashboard/admin/companies/view-company-dialog";
import { DeleteCompanyDialog } from "@/components/dashboard/admin/companies/delete-company-dialog";
import { useCompanyStore } from "@/lib/stores/company-store";

export default function AdminCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { companies } = useCompanyStore();

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (companyId: string) => {
    setSelectedCompany(companyId);
    setShowViewDialog(true);
  };

  const handleEdit = (companyId: string) => {
    setSelectedCompany(companyId);
    setShowEditDialog(true);
  };

  const handleDelete = (companyId: string) => {
    setSelectedCompany(companyId);
    setShowDeleteDialog(true);
  };

  const selectedCompanyData = selectedCompany ? companies.find(c => c.id === selectedCompany) : null;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Company Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Company Name</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Fleet Size</th>
                  <th className="text-left p-4">Active Drivers</th>
                  <th className="text-left p-4">Active Trips</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b">
                    <td className="p-4 font-medium">{company.name}</td>
                    <td className="p-4">
                      <Badge
                        variant={company.status === "active" ? "success" : "secondary"}
                      >
                        {company.status}
                      </Badge>
                    </td>
                    <td className="p-4">{company.fleetSize}</td>
                    <td className="p-4">{company.activeDrivers}</td>
                    <td className="p-4">{company.activeTrips}</td>
                    <td className="p-4">
                      {new Date(company.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(company.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(company.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(company.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddCompanyDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {selectedCompanyData && (
        <>
          <ViewCompanyDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            company={selectedCompanyData}
          />
          <EditCompanyDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            company={selectedCompanyData}
          />
          <DeleteCompanyDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            company={selectedCompanyData}
          />
        </>
      )}
    </div>
  );
}