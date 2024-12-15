"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/company";
import { useCompanyStore } from "@/lib/stores/company-store";
import { toast } from "sonner";

interface DeleteCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
}

export function DeleteCompanyDialog({ open, onOpenChange, company }: DeleteCompanyDialogProps) {
  const deleteCompany = useCompanyStore((state) => state.deleteCompany);

  const handleDelete = () => {
    try {
      deleteCompany(company.id);
      toast.success("Company deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {company.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}