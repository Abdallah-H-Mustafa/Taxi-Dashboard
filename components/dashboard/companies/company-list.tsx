"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, LogIn } from "lucide-react";
import { useState } from "react";
import { CompanyLoginDialog } from "./company-login-dialog";
import type { Company } from "@/types/company";

interface CompanyListProps {
  companies: Company[];
  onView: (companyId: string) => void;
  onEdit: (companyId: string) => void;
  onDelete: (companyId: string) => void;
}

export function CompanyList({ companies, onView, onEdit, onDelete }: CompanyListProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleOpenLogin = (companyId: string) => {
    setSelectedCompany(companyId);
    setShowLoginDialog(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fleet Size</TableHead>
            <TableHead>Active Drivers</TableHead>
            <TableHead>Active Trips</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">
                {company.name}
              </TableCell>
              <TableCell>
                <Badge variant={company.status === "active" ? "success" : "secondary"}>
                  {company.status}
                </Badge>
              </TableCell>
              <TableCell>{company.fleetSize}</TableCell>
              <TableCell>{company.activeDrivers}</TableCell>
              <TableCell>{company.activeTrips}</TableCell>
              <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleOpenLogin(company.id)}
                  >
                    <LogIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onView(company.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onEdit(company.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => onDelete(company.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCompany && (
        <CompanyLoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          companyId={selectedCompany}
        />
      )}
    </>
  );
}