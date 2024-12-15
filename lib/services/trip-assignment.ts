"use client";

import { Trip } from "@/types/trip";
import { Driver } from "@/types/driver";
import { useDriverStore } from "@/lib/stores/driver-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { useTripQueueStore } from "@/lib/stores/trip-queue-store";
import { socketManager } from "@/lib/websocket/socket-manager";

export class TripAssignmentService {
  private static isProcessing = false;

  static async findAvailableDriver(trip: Partial<Trip>): Promise<Driver | null> {
    const drivers = useDriverStore.getState().getAvailableDrivers();
    
    if (!drivers.length) return null;

    const sortedDrivers = drivers.sort((a, b) => {
      const aDistance = this.calculateDistance(
        a.location?.lat || 0,
        a.location?.lng || 0,
        trip.pickup?.location.lat || 0,
        trip.pickup?.location.lng || 0
      );
      
      const bDistance = this.calculateDistance(
        b.location?.lat || 0,
        b.location?.lng || 0,
        trip.pickup?.location.lat || 0,
        trip.pickup?.location.lng || 0
      );

      const aScore = (1 / aDistance) * a.rating;
      const bScore = (1 / bDistance) * b.rating;

      return bScore - aScore;
    });

    return sortedDrivers[0] || null;
  }

  static async assignTrip(tripDetails: Partial<Trip>): Promise<boolean> {
    if (this.isProcessing) return false;
    
    try {
      this.isProcessing = true;

      const driver = await this.findAvailableDriver(tripDetails);
      if (!driver) {
        // Add to queue if no driver available
        useTripQueueStore.getState().addTrip({
          type: tripDetails.scheduledTime ? 'Scheduled' : 'Daily Booking',
          pickupAddress: tripDetails.pickup?.address || '',
          dropoffAddress: tripDetails.dropoff?.address || '',
          customerName: tripDetails.passengerId,
          customerPhone: tripDetails.passengerId,
          zones: ['Z1'], // Default zone
          vehicleType: 'standard',
          vehicleNumber: '',
          status: 'pending',
          scheduledTime: tripDetails.scheduledTime,
        });
        return false;
      }

      const trip: Trip = {
        id: crypto.randomUUID(),
        passengerId: tripDetails.passengerId || 'unknown',
        driverId: driver.id,
        pickup: tripDetails.pickup!,
        dropoff: tripDetails.dropoff!,
        status: 'accepted',
        fare: tripDetails.fare || 0,
        distance: tripDetails.distance || 0,
        duration: tripDetails.duration || 0,
        scheduledTime: tripDetails.scheduledTime,
        acceptedAt: new Date().toISOString(),
        paymentMethod: tripDetails.paymentMethod || 'cash',
        paymentStatus: 'pending'
      };

      useTripStore.getState().addTrip(trip);
      useDriverStore.getState().updateDriverStatus(driver.id, 'busy');
      socketManager.assignTrip(trip.id, driver.id);

      return true;
    } catch (error) {
      console.error('Error assigning trip:', error);
      return false;
    } finally {
      this.isProcessing = false;
    }
  }

  static async holdTrip(tripDetails: Partial<Trip>): Promise<string> {
    if (this.isProcessing) return '';
    
    try {
      this.isProcessing = true;
      const tripId = crypto.randomUUID();
      
      useTripQueueStore.getState().addTrip({
        type: tripDetails.scheduledTime ? 'Scheduled' : 'Daily Booking',
        pickupAddress: tripDetails.pickup?.address || '',
        dropoffAddress: tripDetails.dropoff?.address || '',
        customerName: tripDetails.passengerId,
        customerPhone: tripDetails.passengerId,
        zones: ['Z1'], // Default zone
        vehicleType: 'standard',
        vehicleNumber: '',
        status: 'pending',
        scheduledTime: tripDetails.scheduledTime,
      });

      return tripId;
    } catch (error) {
      console.error('Error holding trip:', error);
      return '';
    } finally {
      this.isProcessing = false;
    }
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}