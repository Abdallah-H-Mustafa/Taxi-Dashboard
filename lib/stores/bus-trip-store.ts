"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BusTrip {
  id: string;
  routeId: string;
  vehicleId: string;
  driverId: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string;
  currentStop?: string;
  nextStop?: string;
  passengerCount?: number;
  delay?: number;
  incidents?: Array<{
    id: string;
    type: string;
    description: string;
    time: string;
  }>;
  createdAt: string;
}

interface BusTripStore {
  trips: Map<string, BusTrip>;
  addTrip: (trip: Omit<BusTrip, 'id' | 'createdAt'>) => void;
  updateTrip: (id: string, updates: Partial<BusTrip>) => void;
  deleteTrip: (id: string) => void;
  getTrip: (id: string) => BusTrip | undefined;
  getActiveTrips: () => BusTrip[];
}

// Initialize store with some mock data
const mockTrips: BusTrip[] = [
  {
    id: "BT1",
    routeId: "R1",
    vehicleId: "V1",
    driverId: "D1",
    status: "scheduled",
    startTime: "09:00",
    currentStop: "Downtown Station",
    nextStop: "Mall Station",
    passengerCount: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: "BT2",
    routeId: "R2",
    vehicleId: "V2",
    driverId: "D2",
    status: "in_progress",
    startTime: "09:30",
    currentStop: "Airport Terminal",
    nextStop: "City Center",
    passengerCount: 22,
    createdAt: new Date().toISOString()
  }
];

export const useBusTripStore = create<BusTripStore>()(
  persist(
    (set, get) => ({
      // Initialize with mock data
      trips: new Map(mockTrips.map(trip => [trip.id, trip])),
      
      addTrip: (trip) => set((state) => {
        const newTrip: BusTrip = {
          ...trip,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        const newTrips = new Map(state.trips);
        newTrips.set(newTrip.id, newTrip);
        return { trips: newTrips };
      }),

      updateTrip: (id, updates) => set((state) => {
        const trip = state.trips.get(id);
        if (!trip) return state;

        const updatedTrip = { ...trip, ...updates };
        const newTrips = new Map(state.trips);
        newTrips.set(id, updatedTrip);
        return { trips: newTrips };
      }),

      deleteTrip: (id) => set((state) => {
        const newTrips = new Map(state.trips);
        newTrips.delete(id);
        return { trips: newTrips };
      }),

      getTrip: (id) => get().trips.get(id),

      getActiveTrips: () => {
        const trips = Array.from(get().trips.values());
        return trips.filter(trip => trip.status === 'in_progress');
      },
    }),
    {
      name: 'bus-trip-storage',
      version: 1,
    }
  )
);