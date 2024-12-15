"use client";

import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { offlineSync } from './offline-sync';

class SocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;
  private messageQueue: any[] = [];
  private eventHandlers: Map<string, Function[]> = new Map();

  connect(url: string) {
    if (this.socket?.connected) return;

    this.socket = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to dispatch server');
      this.reconnectAttempts = 0;
      this.processMessageQueue();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from dispatch server');
      offlineSync.startSync();
    });

    // Handle real-time updates
    this.socket.on('driver_location', this.handleDriverLocation);
    this.socket.on('trip_status', this.handleTripStatus);
    this.socket.on('zone_update', this.handleZoneUpdate);
    this.socket.on('workstation_status', this.handleWorkstationStatus);
  }

  private handleDriverLocation = (data: any) => {
    this.emit('driver_location', data);
  };

  private handleTripStatus = (data: any) => {
    this.emit('trip_status', data);
  };

  private handleZoneUpdate = (data: any) => {
    this.emit('zone_update', data);
  };

  private handleWorkstationStatus = (data: any) => {
    this.emit('workstation_status', data);
  };

  on(event: string, handler: Function) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(handler);
  }

  off(event: string, handler: Function) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  send(event: string, data: any) {
    if (!this.socket?.connected) {
      this.messageQueue.push({ event, data });
      offlineSync.addToQueue({ type: 'message', action: 'send', data: { event, data } });
      return;
    }

    this.socket.emit(event, data);
  }

  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message && this.socket?.connected) {
        this.socket.emit(message.event, message.data);
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketManager = new SocketManager();