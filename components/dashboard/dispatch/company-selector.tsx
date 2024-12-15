"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DispatchCompany } from "@/types/dispatch-center";

interface CompanySelectorProps {
  companies: DispatchCompany[];
  selectedCompany: string;
  onCompanyChange: (companyId: string) => void;
}

export function CompanySelector({
  companies,
  selectedCompany,
  onCompanyChange,
}: CompanySelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Company</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedCompany} onValueChange={onCompanyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name} ({company.activeDrivers}/{company.fleetSize} active)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}