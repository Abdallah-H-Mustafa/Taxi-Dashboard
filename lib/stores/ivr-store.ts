"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IVRConfig } from '@/types/ivr';

interface IVRStore {
  config: IVRConfig | null;
  updateConfig: (config: IVRConfig) => void;
  getConfig: () => IVRConfig | null;
}

export const useIVRStore = create<IVRStore>()(
  persist(
    (set, get) => ({
      config: null,
      updateConfig: (config) => set({ config }),
      getConfig: () => get().config,
    }),
    {
      name: 'ivr-storage',
      version: 1,
    }
  )
);