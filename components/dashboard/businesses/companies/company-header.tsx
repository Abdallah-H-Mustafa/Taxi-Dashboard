"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CompanyHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight">Business Companies</h2>
      <Button onClick={() => router.push("/dashboard/businesses/companies/add")}>
        <Plus className="h-4 w-4 mr-2" />
        Add Company
      </Button>
    </div>
  );
}