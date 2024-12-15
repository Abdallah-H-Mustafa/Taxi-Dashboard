"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map, List, Plus, Trash2, Search, X, Minimize2, Filter, Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddAddressDialog } from "@/components/dashboard/addresses/add-address-dialog";
import { EditAddressDialog } from "@/components/dashboard/addresses/edit-address-dialog";
import { ViewAddressDialog } from "@/components/dashboard/addresses/view-address-dialog";
import { useAddressStore } from "@/lib/stores/address-store";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ITEMS_PER_PAGE = 20;

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function AddressesPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"streetAddress" | "commercialName" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<"all" | "residential" | "commercial">("all");
  
  const router = useRouter();
  const { addresses, deleteAddress, getAddress } = useAddressStore();

  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch = 
      address.streetAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (address.commercialName && 
        address.commercialName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" ? true :
      filterType === "commercial" ? !!address.commercialName :
      !address.commercialName;

    return matchesSearch && matchesType;
  });

  const sortedAddresses = [...filteredAddresses].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "createdAt") {
      comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      const aValue = a[sortBy] || "";
      const bValue = b[sortBy] || "";
      comparison = aValue.localeCompare(bValue);
    }
    return sortOrder === "desc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(sortedAddresses.length / ITEMS_PER_PAGE);
  const paginatedAddresses = sortedAddresses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast.success("Address deleted successfully");
  };

  const handleViewAddress = (id: string) => {
    setSelectedAddressId(id);
    setShowViewDialog(true);
  };

  const handleEditAddress = (id: string) => {
    setSelectedAddressId(id);
    setShowEditDialog(true);
  };

  const handleClose = () => {
    router.back();
  };

  const selectedAddress = selectedAddressId ? getAddress(selectedAddressId) : null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="font-medium">Address Management</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(false)}
                >
                  <Map className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Address Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search address or business"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Addresses</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <Card>
          <CardContent className="p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer text-xs py-2"
                    onClick={() => {
                      if (sortBy === "streetAddress") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("streetAddress");
                        setSortOrder("asc");
                      }
                    }}
                  >
                    Address
                    {sortBy === "streetAddress" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-xs py-2"
                    onClick={() => {
                      if (sortBy === "commercialName") {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy("commercialName");
                        setSortOrder("asc");
                      }
                    }}
                  >
                    Business
                    {sortBy === "commercialName" && (
                      <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </TableHead>
                  <TableHead className="text-xs py-2">Location</TableHead>
                  <TableHead className="text-xs py-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAddresses.map((address) => (
                  <TableRow key={address.id} className="h-10">
                    <TableCell className="text-xs py-2 font-medium truncate max-w-[200px]">
                      {address.streetAddress}
                    </TableCell>
                    <TableCell className="text-xs py-2 truncate max-w-[150px]">
                      {address.commercialName || "—"}
                    </TableCell>
                    <TableCell className="text-xs py-2 truncate max-w-[120px]">
                      {address.city}
                    </TableCell>
                    <TableCell className="text-xs py-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => handleViewAddress(address.id)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => handleEditAddress(address.id)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAddresses.length)} of {filteredAddresses.length} addresses
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="h-8 w-8 text-xs"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-12rem)]">
              <MapContainer
                center={[63.7467, -68.5170]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredAddresses.map((address) => (
                  <Marker
                    key={address.id}
                    position={[address.coordinates.lat, address.coordinates.lng]}
                    icon={icon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-medium text-sm">
                          {address.commercialName || "Residential Address"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {address.streetAddress}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {address.city}, {address.region} {address.postalCode}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => handleViewAddress(address.id)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => handleEditAddress(address.id)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <AddAddressDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      {selectedAddress && (
        <>
          <ViewAddressDialog
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            address={selectedAddress}
          />
          <EditAddressDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            address={selectedAddress}
          />
        </>
      )}
    </div>
  );
}