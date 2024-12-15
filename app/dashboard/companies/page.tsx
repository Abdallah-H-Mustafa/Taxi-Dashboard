"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CompanyList } from "@/components/dashboard/companies/company-list";
import { CompanyHeader } from "@/components/dashboard/companies/company-header";
import { AddCompanyDialog } from "@/components/dashboard/companies/add-company-dialog";
import { EditCompanyDialog } from "@/components/dashboard/companies/edit-company-dialog";
import { ViewCompanyDialog } from "@/components/dashboard/companies/view-company-dialog";
import { DeleteCompanyDialog } from "@/components/dashboard/companies/delete-company-dialog";
import { useCompanyStore } from "@/lib/stores/company-store";

export default function CompaniesPage() {
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
      <CompanyHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddCompany={() => setShowAddDialog(true)}
      />

      <Card className="p-6">
        <CompanyList
          companies={filteredCompanies}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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