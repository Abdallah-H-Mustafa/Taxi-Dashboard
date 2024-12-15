"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BusDriver {
  id: string;
  name: string;
  employeeId: string;
  licenseNumber: string;
  licenseClass: string;
  status: 'active' | 'on_break' | 'off_duty';
  currentRoute?: string;
  currentBus?: string;
  shiftStart?: string;
  shiftEnd?: string;
  certifications: string[];
  trainingComplete: boolean;
  createdAt: string;
}

interface BusDriverStore {
  drivers: Map<string, BusDriver>;
  addDriver: (driver: Omit<BusDriver, 'id' | 'createdAt'>) => void;
  updateDriver: (id: string, updates: Partial<BusDriver>) => void;
  deleteDriver: (id: string) => void;
  getDriver: (id: string) => BusDriver | undefined;
  getActiveDrivers: () => BusDriver[];
}

export const useBusDriverStore = create<BusDriverStore>()(
  persist(
    (set, get) => ({
      drivers: new Map(),
      
      addDriver: (driver) => set((state) => {
        const newDriver: BusDriver = {
          ...driver,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        const newDrivers = new Map(state.drivers);
        newDrivers.set(newDriver.id, newDriver);
        return { drivers: newDrivers };
      }),

      updateDriver: (id, updates) => set((state) => {
        const driver = state.drivers.get(id);
        if (!driver) return state;

        const updatedDriver = { ...driver, ...updates };
        const newDrivers = new Map(state.drivers);
        newDrivers.set(id, updatedDriver);
        return { drivers: newDrivers };
      }),

      deleteDriver: (id) => set((state) => {
        const newDrivers = new Map(state.drivers);
        newDrivers.delete(id);
        return { drivers: newDrivers };
      }),

      getDriver: (id) => get().drivers.get(id),

      getActiveDrivers: () => {
        const drivers = Array.from(get().drivers.values());
        return drivers.filter(driver => driver.status === 'active');
      },
    }),
    {
      name: 'bus-driver-storage',
      version: 1,
    }
  )
);