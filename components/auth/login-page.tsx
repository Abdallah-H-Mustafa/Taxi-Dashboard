"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, UserCircle } from "lucide-react";
import { loginAdmin, loginCompany, loginDispatcher } from "@/lib/auth";
import { useCompanyStore } from "@/lib/stores/company-store";
import { toast } from "sonner";

export function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'company' | 'dispatcher'>('admin');

  // Admin login state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Company login state
  const [companyId, setCompanyId] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  // Dispatcher login state
  const [dispatcherId, setDispatcherId] = useState("");
  const [dispatcherPassword, setDispatcherPassword] = useState("");
  const [companyForDispatcher, setCompanyForDispatcher] = useState("");

  const companies = useCompanyStore((state) => state.companies);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginAdmin(adminEmail, adminPassword)) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginCompany(companyId, companyPassword)) {
        toast.success("Login successful!");
        router.push(`/dashboard/companies/${companyId}/dispatch/interface`);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDispatcherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginDispatcher(dispatcherId, companyForDispatcher, dispatcherPassword)) {
        toast.success("Login successful!");
        router.push(`/dashboard/companies/${companyForDispatcher}/dispatch/interface`);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred during login");
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
                  <SelectTrigger id="companyId">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Company"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="dispatcher">
            <form onSubmit={handleDispatcherLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyForDispatcher">Company</Label>
                <Select value={companyForDispatcher} onValueChange={setCompanyForDispatcher}>
                  <SelectTrigger id="companyForDispatcher">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Dispatcher"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}