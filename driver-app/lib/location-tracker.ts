"use client";

import { dashboardSocket } from './websocket/dashboard-socket';

class LocationTracker {
  private watchId: number | null = null;
  private readonly updateInterval = 10000; // 10 seconds

  startTracking() {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: new Date().toISOString()
        };

        // Send location update to dashboard
        dashboardSocket.sendLocationUpdate(location);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}

export const locationTracker = new LocationTracker();