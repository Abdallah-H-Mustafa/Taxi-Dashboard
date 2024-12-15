"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import { AddDispatcherDialog } from "@/components/dashboard/admin/dispatchers/add-dispatcher-dialog";
import { EditDispatcherDialog } from "@/components/dashboard/admin/dispatchers/edit-dispatcher-dialog";
import { ViewDispatcherDialog } from "@/components/dashboard/admin/dispatchers/view-dispatcher-dialog";
import { useDispatcherStore } from "@/lib/stores/dispatcher-store";
import { useCompanyStore } from "@/lib/stores/company-store";

export default function AdminDispatchersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [selectedDispatcher, setSelectedDispatcher] = useState<string | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { dispatchers } = useDispatcherStore();
  const { companies } = useCompanyStore();

  const filteredDispatchers = Array.from(dispatchers.values()).filter(dispatcher => {
    const matchesSearch = 
      dispatcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatcher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter === "all" || dispatcher.companyId === companyFilter;
    return matchesSearch && matchesCompany;
  });

  const handleView = (dispatcherId: string) => {
    setSelectedDispatcher(dispatcherId);
    setShowViewDialog(true);
  };

  const handleEdit = (dispatcherId: string) => {
    setSelectedDispatcher(dispatcherId);
    setShowEditDialog(true);
  };

  const selectedDispatcherData = selectedDispatcher ? dispatchers.get(selectedDispatcher) : null;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dispatcher Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search dispatchers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Dispatcher
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Company</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Last Active</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDispatchers.map((dispatcher) => (
                  <tr key={dispatcher.id} className="border-b">
                    <td className="p-4 font-medium">{dispatcher.name}</td>
                    <td className="p-4">{dispatcher.email}</td>
                    <td className="p-4">
                      {companies.find(c => c.id === dispatcher.companyId)?.name}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={dispatcher.status === "active" ? "success" : "secondary"}
                      >
                        {dispatcher.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {new Date(dispatcher.lastActive).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(dispatcher.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(dispatcher.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddDispatcherDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      {selectedDispatcherData && (
        <>
          <ViewDispatcherDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            dispatcher={selectedDispatcherData}
          />
          <EditDispatcherDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            dispatcher={selectedDispatcherData}
          />
        </>
      )}
    </div>
  );
}