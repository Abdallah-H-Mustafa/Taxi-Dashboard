"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Address {
  id: string;
  streetAddress: string;
  commercialName?: string;
  city: string;
  region: string;
  postalCode: string;
  zones: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
}

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'createdAt'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  getAddress: (id: string) => Address | undefined;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, {
          ...address,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }],
      })),
      updateAddress: (id, address) => set((state) => ({
        addresses: state.addresses.map((a) =>
          a.id === id
            ? { ...a, ...address }
            : a
        ),
      })),
      deleteAddress: (id) => set((state) => ({
        addresses: state.addresses.filter((address) => address.id !== id),
      })),
      getAddress: (id) => get().addresses.find((address) => address.id === id),
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            addresses: persistedState.addresses.map((address: Address) => ({
              ...address,
              createdAt: address.createdAt || new Date().toISOString(),
              zones: address.zones || '',
              coordinates: address.coordinates || { lat: 0, lng: 0 }
            }))
          };
        }
        return persistedState;
      },
    }
  )
);