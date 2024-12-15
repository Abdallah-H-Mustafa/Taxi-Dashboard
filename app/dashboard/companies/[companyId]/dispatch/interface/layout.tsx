import { CompanyGuard } from "@/components/auth/company-guard";
import { STATIC_COMPANY_IDS } from "@/lib/constants/companies";

export async function generateStaticParams() {
  return STATIC_COMPANY_IDS.map((companyId) => ({
    companyId,
  }));
}

export default function CompanyDispatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanyGuard>{children}</CompanyGuard>;
}