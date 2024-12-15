"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Driver, DriverStatus, DriverLocation } from '@/types/driver';

interface DriverStore {
  drivers: Map<string, Driver>;
  setDrivers: (drivers: Driver[]) => void;
  updateDriver: (driverId: string, updates: Partial<Driver>) => void;
  updateDriverStatus: (driverId: string, status: DriverStatus) => void;
  updateDriverLocation: (driverId: string, location: DriverLocation) => void;
  getAvailableDrivers: () => Driver[];
  getNearbyDrivers: (lat: number, lng: number, radiusKm: number) => Driver[];
}

const defaultGasExpenses = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
  weeklyTotal: 0,
  monthlyTotal: 0,
  yearlyTotal: 0,
};

const defaultEarnings = {
  today: 0,
  week: 0,
  month: 0,
  total: 0,
  pendingPayout: 0,
  dispatchFees: {
    daily: 120,
    weekly: 693,
    total: 693,
  },
  trips: {
    daily: { count: 0, amount: 0 },
    weekly: { count: 0, amount: 0 },
    total: { count: 0, amount: 0 },
  },
};

const defaultWallet = {
  balance: 0,
  pendingBalance: 0,
};

export const useDriverStore = create<DriverStore>()(
  persist(
    (set, get) => ({
      drivers: new Map(),

      setDrivers: (drivers) => {
        const driversMap = new Map(drivers.map(driver => [
          driver.id, 
          {
            ...driver,
            gasExpenses: driver.gasExpenses || defaultGasExpenses,
            earnings: { ...defaultEarnings, ...driver.earnings },
            wallet: { ...defaultWallet, ...driver.wallet },
          }
        ]));
        set({ drivers: driversMap });
      },

      updateDriver: (driverId, updates) => {
        set((state) => {
          const driver = state.drivers.get(driverId);
          if (!driver) return state;

          const updatedDriver = { 
            ...driver, 
            ...updates,
            gasExpenses: updates.gasExpenses || driver.gasExpenses || defaultGasExpenses,
            earnings: { ...defaultEarnings, ...(updates.earnings || driver.earnings) },
            wallet: { ...defaultWallet, ...(updates.wallet || driver.wallet) },
          };
          const newDrivers = new Map(state.drivers);
          newDrivers.set(driverId, updatedDriver);

          return { drivers: newDrivers };
        });
      },

      updateDriverStatus: (driverId, status) => {
        set((state) => {
          const driver = state.drivers.get(driverId);
          if (!driver) return state;

          const updatedDriver = { ...driver, status };
          const newDrivers = new Map(state.drivers);
          newDrivers.set(driverId, updatedDriver);

          return { drivers: newDrivers };
        });
      },

      updateDriverLocation: (driverId, location) => {
        set((state) => {
          const driver = state.drivers.get(driverId);
          if (!driver) return state;

          const updatedDriver = { ...driver, location };
          const newDrivers = new Map(state.drivers);
          newDrivers.set(driverId, updatedDriver);

          return { drivers: newDrivers };
        });
      },

      getAvailableDrivers: () => {
        const state = get();
        return Array.from(state.drivers.values())
          .filter(driver => driver.status === 'available');
      },

      getNearbyDrivers: (lat, lng, radiusKm) => {
        const state = get();
        return Array.from(state.drivers.values())
          .filter(driver => {
            if (!driver.location) return false;
            
            const R = 6371;
            const dLat = (driver.location.lat - lat) * Math.PI / 180;
            const dLon = (driver.location.lng - lng) * Math.PI / 180;
            const a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat * Math.PI / 180) * Math.cos(driver.location.lat * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;

            return distance <= radiusKm;
          });
      },
    }),
    {
      name: 'driver-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          const drivers = new Map(Array.from(persistedState.drivers.entries()).map(([id, driver]: [string, any]) => [
            id,
            {
              ...driver,
              gasExpenses: driver.gasExpenses || defaultGasExpenses,
              earnings: { ...defaultEarnings, ...driver.earnings },
              wallet: { ...defaultWallet, ...driver.wallet },
            }
          ]));
          return { ...persistedState, drivers };
        }
        return persistedState;
      },
    }
  )
);