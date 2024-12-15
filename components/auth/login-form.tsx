"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, UserCircle, Users } from "lucide-react";
import { useCompanyStore } from "@/lib/stores/company-store";
import { authService } from "@/lib/auth/auth-service";
import { ROLES, ROLE_LABELS, MOCK_CREDENTIALS } from "@/lib/auth/constants";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'company' | 'dispatcher'>('admin');

  // Admin login state
  const [adminEmail, setAdminEmail] = useState(MOCK_CREDENTIALS.super_admin.email);
  const [adminPassword, setAdminPassword] = useState(MOCK_CREDENTIALS.super_admin.password);
  const [adminRole, setAdminRole] = useState(ROLES.SUPER_ADMIN);

  // Company login state
  const [companyId, setCompanyId] = useState<string | undefined>();
  const [companyPassword, setCompanyPassword] = useState(MOCK_CREDENTIALS.company.password);

  // Dispatcher login state
  const [dispatcherId, setDispatcherId] = useState("");
  const [dispatcherPassword, setDispatcherPassword] = useState(MOCK_CREDENTIALS.dispatcher.password);
  const [dispatcherCompanyId, setDispatcherCompanyId] = useState<string | undefined>();

  const companies = useCompanyStore((state) => state.companies);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);

    try {
      await authService.login({
        email: adminEmail,
        password: adminPassword,
        role: adminRole
      });

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId || !companyPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await authService.login({
        email: `company@${companyId}`,
        password: companyPassword,
        role: ROLES.COMPANY,
        companyId
      });

      toast.success("Login successful!");
      router.push(`/dashboard/companies/${companyId}/dispatch/interface`);
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispatcherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatcherId || !dispatcherPassword || !dispatcherCompanyId) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await authService.login({
        email: dispatcherId,
        password: dispatcherPassword,
        role: ROLES.DISPATCHER,
        companyId: dispatcherCompanyId
      });

      toast.success("Login successful!");
      router.push(`/dashboard/companies/${dispatcherCompanyId}/dispatch/interface`);
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px] mx-4">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={loginType} onValueChange={(value: any) => setLoginType(value)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminRole">Role</Label>
                <Select value={adminRole} onValueChange={setAdminRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ROLES.SUPER_ADMIN}>
                      {ROLE_LABELS[ROLES.SUPER_ADMIN]}
                    </SelectItem>
                    <SelectItem value={ROLES.ADMIN}>
                      {ROLE_LABELS[ROLES.ADMIN]}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@example.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Admin"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="company">
            <form onSubmit={handleCompanyLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyId">Company</Label>
                <Select value={companyId} onValueChange={setCompanyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPassword">Password</Label>
                <Input
                  id="companyPassword"
                  type="password"
                  value={companyPassword}
                  onChange={(e) => setCompanyPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !companyId}>
                {isLoading ? "Logging in..." : "Login as Company"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="dispatcher">
            <form onSubmit={handleDispatcherLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dispatcherCompanyId">Company</Label>
                <Select value={dispatcherCompanyId} onValueChange={setDispatcherCompanyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dispatcherId">Dispatcher ID</Label>
                <Input
                  id="dispatcherId"
                  value={dispatcherId}
                  onChange={(e) => setDispatcherId(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dispatcherPassword">Password</Label>
                <Input
                  id="dispatcherPassword"
                  type="password"
                  value={dispatcherPassword}
                  onChange={(e) => setDispatcherPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !dispatcherCompanyId}>
                {isLoading ? "Logging in..." : "Login as Dispatcher"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}