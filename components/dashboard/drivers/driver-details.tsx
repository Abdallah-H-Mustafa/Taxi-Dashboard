"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Car, 
  DollarSign, 
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  AlertTriangle
} from "lucide-react";
import type { EnhancedDriver } from "@/types/driver-management";

interface DriverDetailsProps {
  driver: EnhancedDriver;
  onStatusChange: (status: EnhancedDriver['status']) => void;
}

export function DriverDetails({ driver, onStatusChange }: DriverDetailsProps) {
  const getStatusColor = (status: EnhancedDriver['status']) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'busy':
        return 'warning';
      case 'suspended':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{driver.name}</h2>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{driver.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{driver.phone}</span>
            </div>
          </div>
        </div>
        <Badge variant={getStatusColor(driver.status)}>
          {driver.status}
        </Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{driver.performance.rating.toFixed(1)}⭐</div>
                <p className="text-xs text-muted-foreground">
                  {driver.performance.totalTrips} total trips
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${driver.earnings.daily}</div>
                <p className="text-xs text-muted-foreground">
                  ${driver.earnings.weekly} this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{driver.onlineHours}h</div>
                <p className="text-xs text-muted-foreground">
                  Last active: {new Date(driver.lastActive).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(driver.performance.completionRate * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {driver.performance.cancelationRate * 100}% cancellation rate
                </p>
              </CardContent>
            </Card>
          </div>

          {driver.location && (
            <Card>
              <CardHeader>
                <CardTitle>Current Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Lat: {driver.location.lat}, Lng: {driver.location.lng}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    (Updated: {new Date(driver.location.lastUpdate).toLocaleTimeString()})
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {driver.documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="capitalize">{doc.type.replace('_', ' ')}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={doc.status === 'approved' ? 'success' : 'warning'}>
                  {doc.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>View Document</span>
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          {driver.vehicle ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vehicle Details</CardTitle>
                  <Badge variant={driver.vehicle.status === 'active' ? 'success' : 'warning'}>
                    {driver.vehicle.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Make & Model</p>
                      <p className="font-medium">
                        {driver.vehicle.make} {driver.vehicle.model} ({driver.vehicle.year})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plate Number</p>
                      <p className="font-medium">{driver.vehicle.plateNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Type</p>
                      <p className="font-medium capitalize">{driver.vehicle.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Inspection</p>
                      <p className="font-medium">
                        {driver.vehicle.lastInspection 
                          ? new Date(driver.vehicle.lastInspection).toLocaleDateString()
                          : 'Not available'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No vehicle information available
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Daily Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${driver.earnings.daily}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${driver.earnings.weekly}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${driver.earnings.monthly}</div>
              </CardContent>
            </Card>
          </div>

          {driver.earnings.lastPayout && (
            <Card>
              <CardHeader>
                <CardTitle>Last Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">
                      ${driver.earnings.lastPayout.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(driver.earnings.lastPayout.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={
                    driver.earnings.lastPayout.status === 'processed' 
                      ? 'success' 
                      : driver.earnings.lastPayout.status === 'pending'
                      ? 'warning'
                      : 'destructive'
                  }>
                    {driver.earnings.lastPayout.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}