"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Driver, BankingInfo } from "@/types/driver";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";

interface DriverBankingProps {
  driver: Driver;
  onUpdate: () => void;
}

export function DriverBanking({ driver, onUpdate }: DriverBankingProps) {
  const [formData, setFormData] = useState<BankingInfo>(driver.bankingInfo || {
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    transitNumber: '',
    institutionNumber: '',
    taxNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedDriver = {
      ...driver,
      bankingInfo: formData,
    };

    useDriverStore.getState().drivers.set(driver.id, updatedDriver);
    onUpdate();
    toast.success("Banking information updated successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Account Holder Name</Label>
          <Input
            value={formData.accountHolder}
            onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Bank Name</Label>
          <Input
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Account Number</Label>
          <Input
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Transit Number</Label>
          <Input
            value={formData.transitNumber}
            onChange={(e) => setFormData({ ...formData, transitNumber: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Institution Number</Label>
          <Input
            value={formData.institutionNumber}
            onChange={(e) => setFormData({ ...formData, institutionNumber: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Tax Number</Label>
          <Input
            value={formData.taxNumber}
            onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Banking Information</Button>
      </div>
    </form>
  );
}