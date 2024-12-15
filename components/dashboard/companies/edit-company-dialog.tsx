"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CompanyForm } from "./company-form";
import { useCompanyStore } from "@/lib/stores/company-store";
import { toast } from "sonner";
import { Company } from "@/types/company";

interface EditCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
}

export function EditCompanyDialog({ open, onOpenChange, company }: EditCompanyDialogProps) {
  const updateCompany = useCompanyStore((state) => state.updateCompany);

  const handleSubmit = (data: Partial<Company>) => {
    try {
      updateCompany(company.id, {
        name: data.name!,
        status: data.status as 'active' | 'inactive' | 'suspended',
        fleetSize: data.fleetSize!,
        activeDrivers: company.activeDrivers,
        activeTrips: company.activeTrips,
      });
      toast.success("Company updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
        </DialogHeader>
        <CompanyForm
          initialData={company}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}