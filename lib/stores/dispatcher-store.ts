"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Dispatcher {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  username: string;
  status: 'active' | 'inactive';
  permissions: {
    canAssignTrips: boolean;
    canManageDrivers: boolean;
    canViewReports: boolean;
    canModifySettings: boolean;
  };
  lastActive: string;
  createdAt: string;
}

interface DispatcherStore {
  dispatchers: Map<string, Dispatcher>;
  addDispatcher: (dispatcher: Omit<Dispatcher, 'id' | 'lastActive' | 'createdAt'>) => void;
  updateDispatcher: (id: string, updates: Partial<Dispatcher>) => void;
  deleteDispatcher: (id: string) => void;
  getDispatcher: (id: string) => Dispatcher | undefined;
  getDispatchersByCompany: (companyId: string) => Dispatcher[];
}

export const useDispatcherStore = create<DispatcherStore>()(
  persist(
    (set, get) => ({
      dispatchers: new Map(),

      addDispatcher: (dispatcher) => set((state) => {
        const newDispatcher: Dispatcher = {
          ...dispatcher,
          id: crypto.randomUUID(),
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        const newDispatchers = new Map(state.dispatchers);
        newDispatchers.set(newDispatcher.id, newDispatcher);
        return { dispatchers: newDispatchers };
      }),

      updateDispatcher: (id, updates) => set((state) => {
        const dispatcher = state.dispatchers.get(id);
        if (!dispatcher) return state;

        const updatedDispatcher = { ...dispatcher, ...updates };
        const newDispatchers = new Map(state.dispatchers);
        newDispatchers.set(id, updatedDispatcher);
        return { dispatchers: newDispatchers };
      }),

      deleteDispatcher: (id) => set((state) => {
        const newDispatchers = new Map(state.dispatchers);
        newDispatchers.delete(id);
        return { dispatchers: newDispatchers };
      }),

      getDispatcher: (id) => get().dispatchers.get(id),

      getDispatchersByCompany: (companyId) => 
        Array.from(get().dispatchers.values())
          .filter(dispatcher => dispatcher.companyId === companyId),
    }),
    {
      name: 'dispatcher-storage',
      version: 1,
    }
  )
);