"use client";

import { useParams } from "next/navigation";
import { DriverDetails } from "@/components/dashboard/drivers/driver-details";
import type { EnhancedDriver } from "@/types/driver-management";

// Mock data - replace with actual API call
const mockDriver: EnhancedDriver = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  status: "available",
  location: {
    lat: 40.7128,
    lng: -74.0060,
    lastUpdate: new Date().toISOString(),
  },
  documents: [
    {
      id: "doc1",
      driverId: "1",
      type: "license",
      status: "approved",
      expiryDate: "2024-12-31",
      uploadedAt: "2024-01-15",
      verifiedAt: "2024-01-16",
      fileUrl: "/documents/license.pdf",
    },
    {
      id: "doc2",
      driverId: "1",
      type: "insurance",
      status: "approved",
      expiryDate: "2024-12-31",
      uploadedAt: "2024-01-15",
      fileUrl: "/documents/insurance.pdf",
    },
  ],
  vehicle: {
    id: "v1",
    driverId: "1",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    plateNumber: "ABC123",
    status: "active",
    type: "sedan",
    lastInspection: "2024-01-01",
    documents: [],
  },
  earnings: {
    daily: 145.50,
    weekly: 958.75,
    monthly: 3845.25,
    pending: 145.50,
    lastPayout: {
      amount: 842.25,
      date: "2024-03-01",
      status: "processed",
    },
  },
  performance: {
    rating: 4.85,
    totalTrips: 1250,
    completionRate: 0.98,
    acceptanceRate: 0.95,
    cancelationRate: 0.02,
    averageResponseTime: 45,
    complaints: 2,
    compliments: 28,
  },
  onlineHours: 6.5,
  joinedAt: "2023-01-01",
  lastActive: new Date().toISOString(),
};

export default function DriverDetailsPage() {
  const params = useParams();
  const driverId = params.id as string;

  const handleStatusChange = (status: EnhancedDriver['status']) => {
    // Implement status change logic
    console.log(`Changing status to ${status}`);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DriverDetails driver={mockDriver} onStatusChange={handleStatusChange} />
    </div>
  );
}