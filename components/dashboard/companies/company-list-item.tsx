"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Company } from "@/types/company";

interface CompanyListItemProps {
  company: Company;
  onView: (companyId: string) => void;
  onEdit: (companyId: string) => void;
}

export function CompanyListItem({ company, onView, onEdit }: CompanyListItemProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <TableRow>
      <TableCell>
        <Link 
          href={`/dashboard/companies/${company.id}/dispatch/interface`}
          className="font-medium hover:underline text-primary cursor-pointer"
        >
          {company.name}
        </Link>
      </TableCell>
      <TableCell>
        <Badge variant={company.status === "active" ? "success" : "secondary"}>
          {company.status}
        </Badge>
      </TableCell>
      <TableCell>{company.fleetSize}</TableCell>
      <TableCell>{company.activeDrivers}</TableCell>
      <TableCell>{company.activeTrips}</TableCell>
      <TableCell>{formatDate(company.createdAt)}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onView(company.id)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onEdit(company.id)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}