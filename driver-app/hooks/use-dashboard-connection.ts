"use client";

import { useEffect } from 'react';
import { dashboardSocket } from '@/lib/websocket/dashboard-socket';
import { locationTracker } from '@/lib/location-tracker';
import { Trip, DeliveryOrder } from '@/types/trip';

export function useDashboardConnection(driverId: string) {
  useEffect(() => {
    // Connect to dashboard
    dashboardSocket.connect(driverId);

    // Start location tracking
    locationTracker.startTracking();

    // Handle trip assignments
    dashboardSocket.on('tripAssigned', (trip: Trip) => {
      // Handle new trip assignment in your app
      console.log('New trip assigned:', trip);
    });

    // Handle delivery assignments
    dashboardSocket.on('deliveryAssigned', (delivery: DeliveryOrder) => {
      // Handle new delivery assignment in your app
      console.log('New delivery assigned:', delivery);
    });

    return () => {
      // Cleanup on unmount
      dashboardSocket.disconnect();
      locationTracker.stopTracking();
    };
  }, [driverId]);

  return {
    // Methods to interact with dashboard
    updateStatus: (status: 'available' | 'busy' | 'offline') => {
      dashboardSocket.sendStatusUpdate(status);
    },
    updateTripStatus: (tripId: string, status: string) => {
      dashboardSocket.updateTripStatus(tripId, status);
    },
    updateDeliveryStatus: (deliveryId: string, status: string) => {
      dashboardSocket.updateDeliveryStatus(deliveryId, status);
    }
  };
}