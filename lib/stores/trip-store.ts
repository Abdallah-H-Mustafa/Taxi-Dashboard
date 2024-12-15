"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip, DeliveryOrder } from '@/types/trip';
import { socketManager } from '@/lib/websocket/socket-manager';

interface TripStore {
  trips: Trip[];
  deliveries: DeliveryOrder[];
  activeTrips: Trip[];
  completedTrips: Trip[];
  setTrips: (trips: Trip[]) => void;
  setDeliveries: (deliveries: DeliveryOrder[]) => void;
  addTrip: (trip: Trip) => void;
  addDelivery: (delivery: DeliveryOrder) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  updateDelivery: (deliveryId: string, updates: Partial<DeliveryOrder>) => void;
  assignTrip: (tripId: string, driverId: string) => void;
  assignDelivery: (deliveryId: string, driverId: string) => void;
  completeTrip: (tripId: string) => void;
  getPendingTrips: () => Trip[];
  getActiveTrips: () => Trip[];
  getCompletedTrips: () => Trip[];
  getPendingDeliveries: () => DeliveryOrder[];
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      deliveries: [],
      activeTrips: [],
      completedTrips: [],

      setTrips: (trips) => {
        set({ trips });
      },

      setDeliveries: (deliveries) => {
        set({ deliveries });
      },

      addTrip: (trip) => {
        set((state) => ({
          trips: [...state.trips, trip],
          activeTrips: trip.status === 'accepted' || trip.status === 'in_progress' 
            ? [...state.activeTrips, trip]
            : state.activeTrips
        }));
      },

      addDelivery: (delivery) => {
        set((state) => ({
          deliveries: [...state.deliveries, delivery]
        }));
      },

      updateTrip: (tripId, updates) => {
        set((state) => {
          const updatedTrips = state.trips.map(trip => 
            trip.id === tripId ? { ...trip, ...updates } : trip
          );

          const updatedActiveTrips = state.activeTrips.filter(trip => trip.id !== tripId);
          const updatedCompletedTrips = state.completedTrips.filter(trip => trip.id !== tripId);

          const updatedTrip = updatedTrips.find(trip => trip.id === tripId);
          if (updatedTrip) {
            if (updatedTrip.status === 'completed') {
              updatedCompletedTrips.push(updatedTrip);
            } else if (updatedTrip.status === 'accepted' || updatedTrip.status === 'in_progress') {
              updatedActiveTrips.push(updatedTrip);
            }
          }

          return {
            trips: updatedTrips,
            activeTrips: updatedActiveTrips,
            completedTrips: updatedCompletedTrips
          };
        });
      },

      updateDelivery: (deliveryId, updates) => {
        set((state) => ({
          deliveries: state.deliveries.map(delivery =>
            delivery.id === deliveryId ? { ...delivery, ...updates } : delivery
          )
        }));
      },

      assignTrip: (tripId, driverId) => {
        set((state) => {
          const updatedTrips = state.trips.map(trip =>
            trip.id === tripId
              ? {
                  ...trip,
                  driverId,
                  status: 'accepted' as const,
                  acceptedAt: new Date().toISOString()
                }
              : trip
          );

          const assignedTrip = updatedTrips.find(trip => trip.id === tripId);
          
          socketManager.assignTrip(tripId, driverId);

          return {
            trips: updatedTrips,
            activeTrips: assignedTrip 
              ? [...state.activeTrips, assignedTrip]
              : state.activeTrips
          };
        });
      },

      assignDelivery: (deliveryId, driverId) => {
        set((state) => ({
          deliveries: state.deliveries.map(delivery =>
            delivery.id === deliveryId
              ? { ...delivery, driverId, status: 'accepted' as const }
              : delivery
          )
        }));

        socketManager.assignDelivery(deliveryId, driverId);
      },

      completeTrip: (tripId) => {
        set((state) => {
          const completedTrip = state.trips.find(trip => trip.id === tripId);
          if (!completedTrip) return state;

          const updatedTrip = {
            ...completedTrip,
            status: 'completed' as const,
            completedAt: new Date().toISOString()
          };

          return {
            trips: state.trips.map(trip =>
              trip.id === tripId ? updatedTrip : trip
            ),
            activeTrips: state.activeTrips.filter(trip => trip.id !== tripId),
            completedTrips: [...state.completedTrips, updatedTrip]
          };
        });
      },

      getPendingTrips: () => {
        return get().trips.filter(trip => trip.status === 'pending');
      },

      getActiveTrips: () => {
        return get().activeTrips;
      },

      getCompletedTrips: () => {
        return get().completedTrips;
      },

      getPendingDeliveries: () => {
        return get().deliveries.filter(delivery => delivery.status === 'pending');
      },
    }),
    {
      name: 'trip-storage',
      version: 1,
    }
  )
);