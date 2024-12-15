"use client";

import { Driver, DriverStatus, DriverLocation } from "@/types/driver";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getAllDrivers(): Promise<Driver[]> {
  const response = await fetch(`${API_BASE}/drivers`);
  if (!response.ok) throw new Error('Failed to fetch drivers');
  return response.json();
}

export async function getDriverById(id: string): Promise<Driver> {
  const response = await fetch(`${API_BASE}/drivers/${id}`);
  if (!response.ok) throw new Error('Failed to fetch driver');
  return response.json();
}

export async function updateDriverStatus(id: string, status: DriverStatus): Promise<Driver> {
  const response = await fetch(`${API_BASE}/drivers/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update driver status');
  return response.json();
}

export async function updateDriverLocation(id: string, location: DriverLocation): Promise<Driver> {
  const response = await fetch(`${API_BASE}/drivers/${id}/location`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });
  if (!response.ok) throw new Error('Failed to update driver location');
  return response.json();
}