"use client";

import { io, Socket } from 'socket.io-client';
import { Driver, DriverLocation, DriverStatus } from '@/types/driver';
import { Trip, DeliveryOrder } from '@/types/trip';

export class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Function[]> = new Map();

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  connect(url: string, token: string) {
    if (this.socket?.connected) return;

    this.socket = io(url, {
      auth: { token },
      transports: ['websocket'],
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => this.emit('connect', null));
    this.socket.on('disconnect', () => this.emit('disconnect', null));

    // Driver events
    this.socket.on('driver:status', (data: { driverId: string, status: DriverStatus }) => 
      this.emit('driver:status', data));
    this.socket.on('driver:location', (data: { driverId: string, location: DriverLocation }) => 
      this.emit('driver:location', data));

    // Trip events
    this.socket.on('trip:created', (trip: Trip) => this.emit('trip:created', trip));
    this.socket.on('trip:updated', (trip: Trip) => this.emit('trip:updated', trip));
    this.socket.on('trip:completed', (trip: Trip) => this.emit('trip:completed', trip));

    // Delivery events
    this.socket.on('delivery:created', (delivery: DeliveryOrder) => 
      this.emit('delivery:created', delivery));
    this.socket.on('delivery:updated', (delivery: DeliveryOrder) => 
      this.emit('delivery:updated', delivery));
    this.socket.on('delivery:completed', (delivery: DeliveryOrder) => 
      this.emit('delivery:completed', delivery));
  }

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

  sendDriverStatus(driverId: string, status: DriverStatus) {
    this.socket?.emit('driver:status:update', { driverId, status });
  }

  sendDriverLocation(driverId: string, location: DriverLocation) {
    this.socket?.emit('driver:location:update', { driverId, location });
  }

  assignTrip(tripId: string, driverId: string) {
    this.socket?.emit('trip:assign', { tripId, driverId });
  }

  assignDelivery(deliveryId: string, driverId: string) {
    this.socket?.emit('delivery:assign', { deliveryId, driverId });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketManager = SocketManager.getInstance();