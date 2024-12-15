"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Zone {
  id: string;
  name: string;
  number: string;
  isMainZone: boolean;
  parentZoneNumber?: string;
  isOpenCall: boolean;
  color: string;
  coordinates: [number, number][];
  createdAt: string;
}

interface ZoneStore {
  zones: Zone[];
  addZone: (zone: Omit<Zone, 'id' | 'createdAt'>) => void;
  updateZone: (id: string, zone: Omit<Zone, 'id' | 'createdAt'>) => void;
  deleteZone: (id: string) => void;
  getZone: (id: string) => Zone | undefined;
}

export const useZoneStore = create<ZoneStore>()(
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
      updateZone: (id, zone) => set((state) => ({
        zones: state.zones.map((z) =>
          z.id === id
            ? { ...z, ...zone, id }
            : z
        ),
      })),
      deleteZone: (id) => set((state) => ({
        zones: state.zones.filter((zone) => zone.id !== id),
      })),
      getZone: (id) => get().zones.find((zone) => zone.id === id),
    }),
    {
      name: 'zone-storage',
    }
  )
);