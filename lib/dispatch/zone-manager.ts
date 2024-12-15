"use client";

import type { DispatchZone } from "@/types/dispatch-center";
import { socketManager } from "./socket-manager";
import { offlineSync } from "./offline-sync";

class ZoneManager {
  private static instance: ZoneManager;
  private zones: Map<string, DispatchZone> = new Map();

  private constructor() {
    this.setupSocketListeners();
  }

  static getInstance(): ZoneManager {
    if (!ZoneManager.instance) {
      ZoneManager.instance = new ZoneManager();
    }
    return ZoneManager.instance;
  }

  private setupSocketListeners() {
    socketManager.on('zone_update', (data: any) => {
      this.updateZone(data);
    });
  }

  updateZone(zone: DispatchZone) {
    this.zones.set(zone.id, zone);
    offlineSync.addToQueue({
      type: 'zone',
      action: 'update',
      data: zone
    });
  }

  getZone(id: string): DispatchZone | undefined {
    return this.zones.get(id);
  }

  getAllZones(): DispatchZone[] {
    return Array.from(this.zones.values());
  }

  getActiveZones(): DispatchZone[] {
    return this.getAllZones().filter(zone => zone.status === 'active');
  }

  assignDriverToZone(zoneId: string, driverId: string) {
    const zone = this.zones.get(zoneId);
    if (zone) {
      socketManager.send('assign_driver', { zoneId, driverId });
    }
  }
}

export const zoneManager = ZoneManager.getInstance();