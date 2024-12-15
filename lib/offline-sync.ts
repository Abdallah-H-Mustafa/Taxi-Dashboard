"use client";

import localforage from 'localforage';

// Configure offline storage
localforage.config({
  name: 'dispatch-center',
  storeName: 'offline_data'
});

interface SyncItem {
  id: string;
  type: 'trip' | 'driver' | 'order';
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
}

class OfflineSync {
  private syncQueue: SyncItem[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.setupEventListeners();
    this.loadSyncQueue();
    this.startSync();
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.sync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private async loadSyncQueue() {
    try {
      const queue = await localforage.getItem<SyncItem[]>('syncQueue');
      if (queue) {
        this.syncQueue = queue;
      }
    } catch (error) {
      console.error('Error loading sync queue:', error);
    }
  }

  private async saveSyncQueue() {
    try {
      await localforage.setItem('syncQueue', this.syncQueue);
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  }

  async addToQueue(item: Omit<SyncItem, 'timestamp'>) {
    const syncItem: SyncItem = {
      ...item,
      timestamp: Date.now()
    };

    this.syncQueue.push(syncItem);
    await this.saveSyncQueue();

    if (this.isOnline) {
      this.sync();
    }
  }

  private async sync() {
    if (!this.isOnline || this.syncQueue.length === 0) return;

    const items = [...this.syncQueue];
    this.syncQueue = [];
    await this.saveSyncQueue();

    try {
      // Process items in batches to optimize network usage
      const batchSize = 10;
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await this.processBatch(batch);
      }
    } catch (error) {
      console.error('Sync error:', error);
      // Put failed items back in queue
      this.syncQueue = [...this.syncQueue, ...items];
      await this.saveSyncQueue();
    }
  }

  private async processBatch(batch: SyncItem[]) {
    // Implement API calls to sync data with server
    // This is where you'd make the actual network requests
    console.log('Processing batch:', batch);
  }

  startSync() {
    if (this.syncInterval) return;
    
    // Attempt to sync every 5 minutes
    this.syncInterval = setInterval(() => {
      if (this.isOnline) {
        this.sync();
      }
    }, 5 * 60 * 1000);
  }

  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const offlineSync = new OfflineSync();