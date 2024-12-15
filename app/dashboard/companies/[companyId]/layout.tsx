"use client";

import { CompanyGuard } from "@/components/auth/company-guard";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyGuard>{children}</CompanyGuard>;
}