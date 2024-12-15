"use client";

import { DispatchInterface } from "@/components/dashboard/dispatch/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompanyStore } from "@/lib/stores/company-store";

export default function CompanyDispatchPage() {
  const params = useParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const companyId = params.companyId as string;
  const company = useCompanyStore(state => state.getCompany(companyId));

  useEffect(() => {
    if (!company) {
      router.push("/dashboard");
      return;
    }

    const auth = localStorage.getItem("company_auth");
    if (auth) {
      const { id, role } = JSON.parse(auth);
      if (id === companyId && role === "company") {
        setIsAuthorized(true);
        return;
      }
    }

    router.push("/login");
  }, [company, companyId, router]);

  if (!company || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
          <p className="text-muted-foreground">
            Please wait while we verify your access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <DispatchInterface />
    </div>
  );
}