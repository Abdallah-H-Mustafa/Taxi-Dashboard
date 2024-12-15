"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getValidCompanyId } from "@/lib/constants/companies";

export function CompanyDispatchLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const rawCompanyId = params.companyId as string;
    const validCompanyId = getValidCompanyId(rawCompanyId);

    if (!validCompanyId) {
      router.push("/404");
      return;
    }

    // Redirect if the URL is not normalized
    if (validCompanyId !== rawCompanyId) {
      router.replace(window.location.pathname.replace(rawCompanyId, validCompanyId));
      return;
    }

    const auth = localStorage.getItem("company_auth");
    const dispatcherAuth = localStorage.getItem("dispatcher_auth");

    let isAuthorized = false;

    if (auth) {
      const { id, role } = JSON.parse(auth);
      isAuthorized = id === validCompanyId && role === "company";
    }

    if (dispatcherAuth) {
      const { companyId: authCompanyId } = JSON.parse(dispatcherAuth);
      isAuthorized = authCompanyId === validCompanyId;
    }

    if (!isAuthorized && !auth && !dispatcherAuth) {
      router.push("/login");
    }

    setIsChecking(false);
  }, [params.companyId, router]);

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