"use client";

import { DriverStatus, DriverLocation } from '@/types/driver';

const DASHBOARD_API = process.env.NEXT_PUBLIC_DASHBOARD_API || 'http://localhost:3000/api';

export async function updateDriverStatus(driverId: string, status: DriverStatus) {
  const response = await fetch(`${DASHBOARD_API}/drivers/${driverId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('driver_token')}`
    },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) throw new Error('Failed to update status');
  return response.json();
}

export async function updateLocation(driverId: string, location: DriverLocation) {
  const response = await fetch(`${DASHBOARD_API}/drivers/${driverId}/location`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('driver_token')}`
    },
    body: JSON.stringify({ location })
  });

  if (!response.ok) throw new Error('Failed to update location');
  return response.json();
}