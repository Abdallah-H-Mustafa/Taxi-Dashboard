"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vehicle } from '@/types/vehicle';

interface VehicleStore {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicle: (id: string) => Vehicle | undefined;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      vehicles: [],
      addVehicle: (vehicle) => set((state) => ({
        vehicles: [...state.vehicles, {
          ...vehicle,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }],
      })),
      updateVehicle: (id, updates) => set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, ...updates } : vehicle
        ),
      })),
      deleteVehicle: (id) => set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
      })),
      getVehicle: (id) => get().vehicles.find((vehicle) => vehicle.id === id),
    }),
    {
      name: 'vehicle-storage',
      version: 1,
    }
  )
);