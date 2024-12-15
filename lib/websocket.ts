"use client";

import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

class WebSocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;
  private messageQueue: any[] = [];

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
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.processMessageQueue();
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      toast.error('Connection lost. Attempting to reconnect...');
    });

    this.socket.on('reconnect_failed', () => {
      console.log('WebSocket reconnection failed');
      toast.error('Connection failed. Please check your internet connection.');
    });

    // Handle different message types
    this.socket.on('driver_location', (data) => {
      // Update driver location in the UI
      console.log('Driver location update:', data);
    });

    this.socket.on('trip_status', (data) => {
      // Update trip status in the UI
      console.log('Trip status update:', data);
    });

    this.socket.on('new_order', (data) => {
      // Handle new order notification
      console.log('New order received:', data);
      toast.info('New order received!');
    });
  }

  send(event: string, data: any) {
    if (!this.socket?.connected) {
      this.messageQueue.push({ event, data });
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

export const wsManager = new WebSocketManager();