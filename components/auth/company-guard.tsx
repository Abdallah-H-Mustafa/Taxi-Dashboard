"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCompanyStore } from "@/lib/stores/company-store";

export function CompanyGuard({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const companyId = params.companyId as string;
  const company = useCompanyStore(state => state.getCompany(companyId));

  useEffect(() => {
    if (!company) {
      router.push("/dashboard");
      return;
    }

    const auth = localStorage.getItem("company_auth");
    const dispatcherAuth = localStorage.getItem("dispatcher_auth");

    let isAuthorized = false;

    if (auth) {
      const { id, role } = JSON.parse(auth);
      isAuthorized = id === companyId && role === "company";
    }

    if (dispatcherAuth) {
      const { companyId: authCompanyId } = JSON.parse(dispatcherAuth);
      isAuthorized = authCompanyId === companyId;
    }

    if (!isAuthorized && !auth && !dispatcherAuth) {
      router.push("/login");
      return;
    }

    setIsChecking(false);
  }, [companyId, company, router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}