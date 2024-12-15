"use client";

import { io, Socket } from 'socket.io-client';
import { Trip, DeliveryOrder } from '@/types/trip';

class DashboardSocket {
  private static instance: DashboardSocket;
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  private constructor() {}

  static getInstance(): DashboardSocket {
    if (!DashboardSocket.instance) {
      DashboardSocket.instance = new DashboardSocket();
    }
    return DashboardSocket.instance;
  }

  connect(driverId: string) {
    const SOCKET_URL = process.env.NEXT_PUBLIC_DASHBOARD_WS || 'ws://localhost:3000';
    
    this.socket = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('driver_token'),
        driverId
      },
      transports: ['websocket']
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to dispatch center');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from dispatch center');
      this.attemptReconnect();
    });

    // Listen for new trip assignments
    this.socket.on('trip:assigned', (trip: Trip) => {
      // Handle new trip assignment
      this.emit('tripAssigned', trip);
    });

    // Listen for delivery assignments
    this.socket.on('delivery:assigned', (delivery: DeliveryOrder) => {
      // Handle new delivery assignment
      this.emit('deliveryAssigned', delivery);
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect(this.socket?.auth?.driverId);
    }, 5000 * Math.pow(2, this.reconnectAttempts));
  }

  // Send location update to dashboard
  sendLocationUpdate(location: { lat: number; lng: number }) {
    this.socket?.emit('driver:location:update', location);
  }

  // Send status update to dashboard
  sendStatusUpdate(status: 'available' | 'busy' | 'offline') {
    this.socket?.emit('driver:status:update', status);
  }

  // Update trip status
  updateTripStatus(tripId: string, status: string) {
    this.socket?.emit('trip:status:update', { tripId, status });
  }

  // Update delivery status
  updateDeliveryStatus(deliveryId: string, status: string) {
    this.socket?.emit('delivery:status:update', { deliveryId, status });
  }

  private eventHandlers: { [key: string]: Function[] } = {};

  on(event: string, handler: Function) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  private emit(event: string, data: any) {
    const handlers = this.eventHandlers[event] || [];
    handlers.forEach(handler => handler(data));
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const dashboardSocket = DashboardSocket.getInstance();