"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BusVehicle {
  id: string;
  fleetNumber: string;
  make: string;
  model: string;
  year: number;
  capacity: number;
  status: 'active' | 'maintenance' | 'out_of_service';
  currentRoute?: string;
  currentDriver?: string;
  mileage: number;
  fuelType: 'diesel' | 'electric' | 'hybrid';
  lastMaintenance?: string;
  nextMaintenance?: string;
  features: string[];
  accessibility: {
    wheelchairAccess: boolean;
    lowFloor: boolean;
    bikeRack: boolean;
  };
  createdAt: string;
}

interface BusVehicleStore {
  vehicles: Map<string, BusVehicle>;
  addVehicle: (vehicle: Omit<BusVehicle, 'id' | 'createdAt'>) => void;
  updateVehicle: (id: string, updates: Partial<BusVehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicle: (id: string) => BusVehicle | undefined;
  getActiveVehicles: () => BusVehicle[];
}

export const useBusVehicleStore = create<BusVehicleStore>()(
  persist(
    (set, get) => ({
      vehicles: new Map(),
      
      addVehicle: (vehicle) => set((state) => {
        const newVehicle: BusVehicle = {
          ...vehicle,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        const newVehicles = new Map(state.vehicles);
        newVehicles.set(newVehicle.id, newVehicle);
        return { vehicles: newVehicles };
      }),

      updateVehicle: (id, updates) => set((state) => {
        const vehicle = state.vehicles.get(id);
        if (!vehicle) return state;

        const updatedVehicle = { ...vehicle, ...updates };
        const newVehicles = new Map(state.vehicles);
        newVehicles.set(id, updatedVehicle);
        return { vehicles: newVehicles };
      }),

      deleteVehicle: (id) => set((state) => {
        const newVehicles = new Map(state.vehicles);
        newVehicles.delete(id);
        return { vehicles: newVehicles };
      }),

      getVehicle: (id) => get().vehicles.get(id),

      getActiveVehicles: () => {
        const vehicles = Array.from(get().vehicles.values());
        return vehicles.filter(vehicle => vehicle.status === 'active');
      },
    }),
    {
      name: 'bus-vehicle-storage',
      version: 1,
    }
  )
);