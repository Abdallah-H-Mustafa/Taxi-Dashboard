"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Company } from '@/types/company';

interface CompanyStore {
  companies: Company[];
  addCompany: (company: Omit<Company, 'id' | 'createdAt'>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  getCompany: (id: string) => Company | undefined;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set, get) => ({
      companies: [
        {
          id: "caribou-cabs",
          name: "Caribou Cabs",
          status: "active",
          fleetSize: 45,
          activeDrivers: 32,
          activeTrips: 18,
          createdAt: "2024-01-01T00:00:00Z",
          dispatchSettings: {
            maxTripsPerDriver: "10",
            maxWaitTime: "15",
            autoAssign: true,
            allowOpenCalls: true,
            zoneRestrictions: true,
            dispatchMode: "balanced"
          }
        },
        {
          id: "nunavut-caribou-tuktu-cabs",
          name: "Nunavut Caribou Tuktu Cabs",
          status: "active",
          fleetSize: 38,
          activeDrivers: 25,
          activeTrips: 15,
          createdAt: "2024-02-01T00:00:00Z",
          dispatchSettings: {
            maxTripsPerDriver: "8",
            maxWaitTime: "20",
            autoAssign: true,
            allowOpenCalls: true,
            zoneRestrictions: true,
            dispatchMode: "nearest"
          }
        },
        {
          id: "adam-express",
          name: "Adam Express",
          status: "active",
          fleetSize: 25,
          activeDrivers: 18,
          activeTrips: 10,
          createdAt: "2024-03-01T00:00:00Z",
          dispatchSettings: {
            maxTripsPerDriver: "12",
            maxWaitTime: "10",
            autoAssign: true,
            allowOpenCalls: true,
            zoneRestrictions: true,
            dispatchMode: "balanced"
          }
        }
      ],

      addCompany: (company) => set((state) => ({
        companies: [...state.companies, {
          ...company,
          id: company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          createdAt: new Date().toISOString(),
          activeDrivers: 0,
          activeTrips: 0
        }]
      })),

      updateCompany: (id, updates) => set((state) => ({
        companies: state.companies.map((company) =>
          company.id === id ? { ...company, ...updates } : company
        )
      })),

      deleteCompany: (id) => set((state) => ({
        companies: state.companies.filter((company) => company.id !== id)
      })),

      getCompany: (id) => get().companies.find((company) => company.id === id),
    }),
    {
      name: 'company-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);