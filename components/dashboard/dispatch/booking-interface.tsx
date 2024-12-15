"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { TripAssignmentService } from "@/lib/services/trip-assignment";
import { useAddressStore } from "@/lib/stores/address-store";
import { useZoneStore } from "@/lib/stores/zone-store";
import { useTripQueueStore } from "@/lib/stores/trip-queue-store";

export function BookingInterface() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const { addresses } = useAddressStore();
  const { zones } = useZoneStore();
  const { addTrip } = useTripQueueStore();
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    pickupAddress: "",
    dropoffAddress: "",
    vehicleType: "",
    vehicleNumber: "",
    passengerCount: "1",
    tripType: "standard",
    note: "",
    scheduledTime: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPickupAddresses = addresses.filter(addr => 
    addr.streetAddress.toLowerCase().includes(formData.pickupAddress.toLowerCase()) ||
    (addr.commercialName && addr.commercialName.toLowerCase().includes(formData.pickupAddress.toLowerCase()))
  ).slice(0, 5);

  const filteredDropoffAddresses = addresses.filter(addr => 
    addr.streetAddress.toLowerCase().includes(formData.dropoffAddress.toLowerCase()) ||
    (addr.commercialName && addr.commercialName.toLowerCase().includes(formData.dropoffAddress.toLowerCase()))
  ).slice(0, 5);

  const isOpenCall = useCallback((address: string) => {
    const addressObj = addresses.find(addr => addr.streetAddress === address);
    if (!addressObj) return false;

    const addressZones = addressObj.zones.split(" | ");
    return zones.some(zone => 
      addressZones.includes(zone.number) && zone.isOpenCall
    );
  }, [addresses, zones]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!formData.pickupAddress || !formData.dropoffAddress) {
      toast.error("Please enter pickup and dropoff addresses");
      return;
    }

    setIsSubmitting(true);

    try {
      const tripDetails = {
        pickup: {
          address: formData.pickupAddress,
          location: { lat: 63.7467, lng: -68.5170 },
        },
        dropoff: {
          address: formData.dropoffAddress,
          location: { lat: 63.7500, lng: -68.5100 },
        },
        scheduledTime: formData.scheduledTime || undefined,
        passengerId: formData.customerPhone,
        status: 'pending',
      };

      // Check if pickup address is in an open call zone
      const isOpenCallTrip = isOpenCall(formData.pickupAddress);

      if (isOpenCallTrip) {
        // Add to open calls queue
        addTrip({
          id: `T${Math.floor(Math.random() * 10000)}`,
          type: formData.tripType,
          pickupAddress: formData.pickupAddress,
          dropoffAddress: formData.dropoffAddress,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          zones: ['OPEN_CALL'],
          vehicleType: formData.vehicleType,
          vehicleNumber: '',
          status: 'pending',
          scheduledTime: formData.scheduledTime,
          note: formData.note,
          passengerCount: parseInt(formData.passengerCount),
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        toast.success("Trip added to open calls");
      } else {
        const success = await TripAssignmentService.assignTrip(tripDetails);
        
        if (success) {
          toast.success("Trip assigned to nearest available driver");
        } else {
          toast.error("No available drivers found. Trip added to queue.");
          await TripAssignmentService.holdTrip(tripDetails);
        }
      }

      resetForm();
    } catch (error) {
      toast.error("Error processing trip request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHold = async () => {
    if (isSubmitting) return;
    if (!formData.pickupAddress || !formData.dropoffAddress) {
      toast.error("Please enter pickup and dropoff addresses");
      return;
    }

    setIsSubmitting(true);
    try {
      addTrip({
        id: `T${Math.floor(Math.random() * 10000)}`,
        type: formData.tripType,
        pickupAddress: formData.pickupAddress,
        dropoffAddress: formData.dropoffAddress,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        zones: ['PENDING'],
        vehicleType: formData.vehicleType,
        vehicleNumber: '',
        status: 'pending',
        scheduledTime: formData.scheduledTime,
        note: formData.note,
        passengerCount: parseInt(formData.passengerCount),
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      toast.success("Trip added to queue");
      resetForm();
    } catch (error) {
      toast.error("Error holding trip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      pickupAddress: "",
      dropoffAddress: "",
      vehicleType: "",
      vehicleNumber: "",
      passengerCount: "1",
      tripType: "standard",
      note: "",
      scheduledTime: "",
    });
    setIsScheduled(false);
  };

  const selectPickupAddress = (address: string) => {
    setFormData(prev => ({ ...prev, pickupAddress: address }));
    setShowPickupSuggestions(false);
  };

  const selectDropoffAddress = (address: string) => {
    setFormData(prev => ({ ...prev, dropoffAddress: address }));
    setShowDropoffSuggestions(false);
  };

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Booking Interface</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 -mr-2"
            onClick={() => setIsScheduled(!isScheduled)}
          >
            <Calendar className={`h-4 w-4 ${isScheduled ? "text-primary" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 h-[calc(100%-4rem)] overflow-y-auto">
        {isScheduled && (
          <div className="space-y-2">
            <Label htmlFor="scheduledTime" className="text-sm">Schedule Date/Time</Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="h-9 text-sm"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName" className="text-sm">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone" className="text-sm">Customer Phone</Label>
            <Input
              id="customerPhone"
              placeholder="Enter phone"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2" ref={pickupRef}>
          <Label htmlFor="pickupAddress" className="text-sm">Pick Up Address</Label>
          <div className="relative">
            <Input
              id="pickupAddress"
              placeholder="Search address"
              value={formData.pickupAddress}
              onChange={(e) => {
                setFormData({ ...formData, pickupAddress: e.target.value });
                setShowPickupSuggestions(true);
              }}
              onFocus={() => setShowPickupSuggestions(true)}
              className={`h-9 text-sm ${isOpenCall(formData.pickupAddress) ? 'border-yellow-500' : ''}`}
              required
            />
            {showPickupSuggestions && filteredPickupAddresses.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
                {filteredPickupAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-2 hover:bg-accent cursor-pointer text-sm"
                    onClick={() => selectPickupAddress(addr.streetAddress)}
                  >
                    <div className="font-medium">{addr.streetAddress}</div>
                    {addr.commercialName && (
                      <div className="text-xs text-muted-foreground">{addr.commercialName}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2" ref={dropoffRef}>
          <Label htmlFor="dropoffAddress" className="text-sm">Drop Off Address</Label>
          <div className="relative">
            <Input
              id="dropoffAddress"
              placeholder="Search address"
              value={formData.dropoffAddress}
              onChange={(e) => {
                setFormData({ ...formData, dropoffAddress: e.target.value });
                setShowDropoffSuggestions(true);
              }}
              onFocus={() => setShowDropoffSuggestions(true)}
              className="h-9 text-sm"
              required
            />
            {showDropoffSuggestions && filteredDropoffAddresses.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
                {filteredDropoffAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-2 hover:bg-accent cursor-pointer text-sm"
                    onClick={() => selectDropoffAddress(addr.streetAddress)}
                  >
                    <div className="font-medium">{addr.streetAddress}</div>
                    {addr.commercialName && (
                      <div className="text-xs text-muted-foreground">{addr.commercialName}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleType" className="text-sm">Vehicle Type</Label>
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
            >
              <SelectTrigger id="vehicleType" className="h-9">
                <SelectValue placeholder="Select type" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard" className="text-sm">Standard</SelectItem>
                <SelectItem value="premium" className="text-sm">Premium</SelectItem>
                <SelectItem value="van" className="text-sm">Van</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber" className="text-sm">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              placeholder="#"
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="passengerCount" className="text-sm">Passengers</Label>
            <Select
              value={formData.passengerCount}
              onValueChange={(value) => setFormData({ ...formData, passengerCount: value })}
            >
              <SelectTrigger id="passengerCount" className="h-9">
                <SelectValue placeholder="# of passengers" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="text-sm">
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tripType" className="text-sm">Trip Type</Label>
            <Select
              value={formData.tripType}
              onValueChange={(value) => setFormData({ ...formData, tripType: value })}
            >
              <SelectTrigger id="tripType" className="h-9">
                <SelectValue placeholder="Select type" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard" className="text-sm">Standard</SelectItem>
                <SelectItem value="priority" className="text-sm">Priority</SelectItem>
                <SelectItem value="scheduled" className="text-sm">Scheduled</SelectItem>
                <SelectItem value="corporate" className="text-sm">Corporate</SelectItem>
                <SelectItem value="special" className="text-sm">Special</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note" className="text-sm">Note/Message</Label>
          <Textarea
            id="note"
            placeholder="Enter notes"
            className="min-h-[120px] resize-y text-sm"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 h-9 text-sm" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Send"}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 h-9 text-sm"
            onClick={handleHold}
            disabled={isSubmitting}
          >
            Save / Hold
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}