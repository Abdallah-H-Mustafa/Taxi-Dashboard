"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QueuedTrip {
  id: string;
  type: 'Daily Booking' | 'Scheduled';
  createdAt: string;
  pickupAddress: string;
  dropoffAddress: string;
  customerName?: string;
  customerPhone?: string;
  zones: string[];
  vehicleType: string;
  vehicleNumber: string;
  status: 'pending' | 'assigned' | 'cancelled';
  scheduledTime?: string;
  note?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

interface TripQueueStore {
  trips: QueuedTrip[];
  cancelledTrips: QueuedTrip[];
  addTrip: (trip: Omit<QueuedTrip, 'id' | 'createdAt'>) => void;
  updateTrip: (id: string, updates: Partial<QueuedTrip>) => void;
  removeTrip: (id: string) => void;
  assignVehicle: (tripId: string, vehicleNumber: string) => void;
  cancelTrip: (tripId: string, reason?: string) => void;
  getCancelledTrips: () => QueuedTrip[];
}

export const useTripQueueStore = create<TripQueueStore>()(
  persist(
    (set, get) => ({
      trips: [],
      cancelledTrips: [],
      addTrip: (trip) => set((state) => ({
        trips: [...state.trips, {
          ...trip,
          id: `T${Math.floor(Math.random() * 10000)}`,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }],
      })),
      updateTrip: (id, updates) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id ? { ...trip, ...updates } : trip
        ),
      })),
      removeTrip: (id) => set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
      })),
      assignVehicle: (tripId, vehicleNumber) => set((state) => {
        // Check if vehicle number is 999 (cancellation code)
        if (vehicleNumber === '999') {
          const tripToCancel = state.trips.find(t => t.id === tripId);
          if (!tripToCancel) return state;

          const cancelledTrip = {
            ...tripToCancel,
            status: 'cancelled' as const,
            cancelledAt: new Date().toISOString(),
            cancelReason: 'Cancelled via dispatch (code 999)',
          };

          return {
            trips: state.trips.filter(t => t.id !== tripId),
            cancelledTrips: [...state.cancelledTrips, cancelledTrip],
          };
        }

        // Normal vehicle assignment
        return {
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, vehicleNumber, status: 'assigned' }
              : trip
          ),
        };
      }),
      cancelTrip: (tripId, reason) => set((state) => {
        const tripToCancel = state.trips.find(t => t.id === tripId);
        if (!tripToCancel) return state;

        const cancelledTrip = {
          ...tripToCancel,
          status: 'cancelled',
          cancelledAt: new Date().toISOString(),
          cancelReason: reason || 'Cancelled by dispatch',
        };

        return {
          trips: state.trips.filter(t => t.id !== tripId),
          cancelledTrips: [...state.cancelledTrips, cancelledTrip],
        };
      }),
      getCancelledTrips: () => get().cancelledTrips,
    }),
    {
      name: 'trip-queue-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            cancelledTrips: [],
          };
        }
        return persistedState;
      },
    }
  )
);