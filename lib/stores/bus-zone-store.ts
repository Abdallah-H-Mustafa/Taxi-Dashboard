"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BusZone {
  id: string;
  name: string;
  number: string;
  isMainZone: boolean;
  isOpenCall: boolean;
  color: string;
  coordinates: [number, number][];
  routes: string[];
  stops: Array<{
    id: string;
    name: string;
    coordinates: [number, number];
    isActive: boolean;
  }>;
  schedule: {
    weekday: Array<{ arrival: string; departure: string; }>;
    weekend: Array<{ arrival: string; departure: string; }>;
  };
  createdAt: string;
}

interface BusZoneStore {
  zones: BusZone[];
  addZone: (zone: Omit<BusZone, 'id' | 'createdAt'>) => void;
  updateZone: (id: string, zone: Partial<BusZone>) => void;
  deleteZone: (id: string) => void;
  getZone: (id: string) => BusZone | undefined;
}

export const useBusZoneStore = create<BusZoneStore>()(
  persist(
    (set, get) => ({
      zones: [],
      addZone: (zone) => set((state) => ({
        zones: [...state.zones, {
          ...zone,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }],
      })),
      updateZone: (id, updates) => set((state) => ({
        zones: state.zones.map((zone) =>
          zone.id === id ? { ...zone, ...updates } : zone
        ),
      })),
      deleteZone: (id) => set((state) => ({
        zones: state.zones.filter((zone) => zone.id !== id),
      })),
      getZone: (id) => get().zones.find((zone) => zone.id === id),
    }),
    {
      name: 'bus-zone-storage',
      version: 1,
    }
  )
);