"use client";

import { DispatchInterface } from "@/components/dashboard/dispatch/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompanyStore } from "@/lib/stores/company-store";

export function CompanyDispatchClient() {
  const params = useParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const companyId = params.companyId as string;
  const company = useCompanyStore(state => state.getCompany(companyId));

  useEffect(() => {
    // Check company authorization
    const auth = localStorage.getItem("company_auth");
    if (auth) {
      const { id, role } = JSON.parse(auth);
      setIsAuthorized(id === companyId && role === "company");
    }

    // Check dispatcher authorization
    const dispatcherAuth = localStorage.getItem("dispatcher_auth");
    if (dispatcherAuth) {
      const { companyId: authCompanyId } = JSON.parse(dispatcherAuth);
      setIsAuthorized(authCompanyId === companyId);
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Company Not Found</h1>
          <p className="text-muted-foreground">
            The company you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You are not authorized to access this company's dispatch interface.
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